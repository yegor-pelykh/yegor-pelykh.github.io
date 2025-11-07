import { ChangeDetectionStrategy, Component, signal, ViewChild, ElementRef, AfterViewChecked, inject, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ResumeService } from '../services/resume.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContentPanelComponent } from '../content-panel/content-panel.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Base64Service } from '../services/base64.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MarkdownModule } from 'ngx-markdown';
import { exportNode, StyleMode } from 'dom-node-export';
import { ELSEC_SERVER_URL } from '../utils/constants';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    ContentPanelComponent,
    MatProgressSpinnerModule,
    MarkdownModule
  ],
  styleUrl: './resume.component.scss',
  templateUrl: './resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent implements AfterViewChecked {
  private readonly httpService = inject(HttpClient);
  private readonly base64Service = inject(Base64Service);
  private readonly resumeService = inject(ResumeService);
  private readonly translateService = inject(TranslateService);

  readonly authForm = new FormGroup({
    authToken: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(32),
      Validators.pattern(/^[a-zA-Z0-9]{32}$/),
    ]),
  });

  readonly cvContent = signal('');
  readonly loading = signal(false);
  readonly errorMsg = signal<string | null>(null);

  @ViewChild('resumeContentRef')
  resumeContentRef?: ElementRef<HTMLDivElement>;

  private shouldScrollToContent = false;

  private getCSSGaps() {
    const rootStyle = getComputedStyle(document.documentElement);
    const fontSize = parseFloat(rootStyle.getPropertyValue('font-size') || '16');
    return {
      sm: parseFloat(rootStyle.getPropertyValue('--gap-sm') || '0') * fontSize,
      lg: parseFloat(rootStyle.getPropertyValue('--gap-lg') || '0') * fontSize
    };
  }

  private getResumeScrollOffset() {
    const gaps = this.getCSSGaps();
    return window.innerWidth <= 700 ? gaps.sm + 120 + gaps.sm : gaps.lg + 80 + gaps.lg;
  }

  private isAuthFormValid(): boolean {
    return this.authForm.valid && !!this.authForm.value.authToken;
  }

  private async fetchResumeData(lang: string): Promise<ArrayBuffer> {
    return firstValueFrom(
      this.httpService.get<ArrayBuffer>(`data/cv-${lang}.bin`, {
        responseType: 'arraybuffer' as 'json'
      })
    );
  }

  private async decryptResumeData(token: string, data: string): Promise<{ res?: string; msg?: string }> {
    return firstValueFrom(
      this.httpService.post<{ res?: string; msg?: string }>(
        `${ELSEC_SERVER_URL}/c/dec`,
        { token, data }
      )
    );
  }

  private setError(message: string) {
    this.cvContent.set('');
    this.errorMsg.set(message);
  }

  private async loadResume(token: string, lang: string): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set(null);
    try {
      const arrayBuffer = await this.fetchResumeData(lang);
      const dataToDecrypt = this.base64Service.arrayBufferToBase64(arrayBuffer);
      const response = await this.decryptResumeData(token, dataToDecrypt);

      if (response.res) {
        const decodedString = this.base64Service.base64ToString(response.res);
        this.cvContent.set(decodedString);
        this.errorMsg.set(null);
        this.shouldScrollToContent = true;
      } else if (response.msg) {
        this.setError(response.msg);
      } else {
        this.setError(this.translateService.instant('RESUME.TOKEN_ERROR'));
      }
    } catch (error: unknown) {
      let message = this.translateService.instant('RESUME.ERROR_UNEXPECTED');
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          message = this.translateService.instant('RESUME.ERROR_NETWORK');
        } else if (error.error?.msg) {
          message = error.error.msg;
        }
      }
      this.setError(message);
    } finally {
      this.loading.set(false);
    }
  }

  private async generateExportData(node: HTMLElement): Promise<string | null> {
    return exportNode(node, {
      docFaviconUrl: this.resumeService.cvFavicon,
      docTitle: this.resumeService.docTitle,
      styleMode: StyleMode.Declared,
      styles: {
        node: {
          marginTop: '0'
        },
        selectors: {
          'body': {
            backgroundColor: '#e3e2e2',
            padding: '2rem',
          },
        },
      },
    });
  }

  private downloadFile(dataUrl: string, title: string): void {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async submitAuth(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (!this.isAuthFormValid() || this.loading()) return;
    const token = this.authForm.value.authToken!;
    const lang = (event.submitter as HTMLButtonElement)?.value;
    if (!lang) return;
    await this.loadResume(token, lang);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToContent && this.resumeContentRef?.nativeElement) {
      const el = this.resumeContentRef.nativeElement;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = this.getResumeScrollOffset();
      const targetY = rect.top + scrollTop - offset;
      window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });
      this.shouldScrollToContent = false;
    }
  }

  saveResume() {
    setTimeout(async () => {
      const node = this.resumeContentRef?.nativeElement;
      if (node !== undefined) {
        const dataUrl = await this.generateExportData(node);
        if (dataUrl) {
          this.downloadFile(dataUrl, this.resumeService.docTitle);
        }
      }
    }, 0);
  }
}
