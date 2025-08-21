import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Subject, firstValueFrom } from 'rxjs';
import { Buffer } from 'buffer';
import { exportNode, StyleTransferMode } from 'dom-node-export';
import { HelpersUtil } from '../helpers';
import { ContentProjectorComponent } from '../content-projector/content-projector.component';

const ELSEC_SERVER_URL = 'https://elsec.fly.dev';
const EXPORT_DELAY_MS = 500;

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    ContentProjectorComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnDestroy {
  readonly isAuthenticated = signal(false);
  readonly isRequesting = signal(false);
  readonly isForceExpanded = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly cvContent = signal('');
  readonly authForm = new FormGroup({
    authToken: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(32),
    ]),
  });

  private readonly destroy$ = new Subject<void>();
  private readonly http = inject(HttpClient);
  private readonly elRef = inject(ElementRef);

  async submitAuth(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (!this.isAuthFormValid()) return;

    const token = this.authForm.value.authToken!;
    const lang = (event.submitter as HTMLButtonElement)?.value;

    if (!lang) return;
    await this.loadResume(token, lang);
  }

  getAge(birthDay: number, birthMonth: number, birthYear: number): number {
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  async saveToFile(): Promise<void> {
    this.isForceExpanded.set(true);
    this.isSaving.set(true);

    setTimeout(async () => {
      this.isForceExpanded.set(false);
      const node = this.elRef.nativeElement;

      const dataUrl = await this.generateExportData(node);
      if (dataUrl) {
        this.downloadFile(dataUrl, 'Yegor Pelykh - Resume');
      }

      this.isSaving.set(false);
    }, EXPORT_DELAY_MS);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async generateExportData(node: HTMLElement): Promise<string | null> {
    return exportNode(node, {
      docFaviconUrl: HelpersUtil.cvFavicon,
      docTitle: 'Yegor Pelykh - Resume',
      styleTransferMode: StyleTransferMode.declared,
      styles: { body: { padding: '2rem' } },
      filter: (n: HTMLElement) =>
        !n.classList?.contains('cv-save-button') &&
        !n.classList?.contains('cv-auth-form'),
    });
  }

  private async loadResume(token: string, lang: string): Promise<void> {
    this.isRequesting.set(true);
    this.errorMessage.set('');

    try {
      const arrayBuffer = await this.fetchResumeData(lang);
      const dataToDecrypt = Buffer.from(arrayBuffer).toString('base64');
      const response = await this.decryptResumeData(token, dataToDecrypt);
      this.handleResumeResponse(response);
    } catch (error) {
      this.handleResumeError(error);
    } finally {
      this.isRequesting.set(false);
    }
  }

  private async fetchResumeData(lang: string): Promise<ArrayBuffer> {
    return firstValueFrom(
      this.http.get<ArrayBuffer>(`assets/data/cv-${lang}.bin`, {
        responseType: 'arraybuffer' as 'json'
      })
    );
  }

  private async decryptResumeData(token: string, data: string): Promise<{ res?: string; msg?: string }> {
    return firstValueFrom(
      this.http.post<{ res?: string; msg?: string }>(
        `${ELSEC_SERVER_URL}/c/dec`,
        { token, data }
      )
    );
  }

  private handleResumeResponse(response: { res?: string; msg?: string }): void {
    if (response.res) {
      this.isAuthenticated.set(true);
      this.cvContent.set(Buffer.from(response.res, 'base64').toString());
      this.errorMessage.set('');
    } else {
      this.resetState();
      this.errorMessage.set(response.msg ?? 'Unknown error');
    }
  }

  private handleResumeError(error: unknown): void {
    this.resetState();

    if (error instanceof HttpErrorResponse && error.error?.msg) {
      this.errorMessage.set(error.error.msg);
    } else {
      this.errorMessage.set('Error requesting Resume data.');
    }
  }

  private resetState(): void {
    this.isAuthenticated.set(false);
    this.cvContent.set('');
  }

  private downloadFile(dataUrl: string, title: string): void {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private isAuthFormValid(): boolean {
    return this.authForm.valid && !!this.authForm.value.authToken;
  }
}
