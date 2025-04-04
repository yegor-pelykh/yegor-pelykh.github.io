import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Buffer } from 'buffer';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { exportNode, StyleTransferMode } from 'dom-node-export';
import { Helpers } from '../helpers';
import { NgClass } from '@angular/common';
import { ContentProjectorComponent } from '../content-projector/content-projector.component';

// My server address for processing elementary security tokens.
const elsecServerAddress = 'https://elsec.fly.dev';

@Component({
  selector: 'app-resume',
  imports: [
    ContentProjectorComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  isAuthenticated: boolean = false;
  errorMessage: string = '';
  authForm = new FormGroup({
    authToken: new FormControl('', [
      Validators.required,
      Validators.minLength(32)
    ]),
  });
  isRequesting: boolean = false;
  isForceExpanded: boolean = false;
  cvContent: string = '';
  isSaving: boolean = false;

  constructor(
    private elRef: ElementRef,
    private http: HttpClient
  ) { }

  submitAuth(event: SubmitEvent) {
    const token = this.authForm.value.authToken;
    if (typeof token !== 'string') {
      return;
    }
    const submitter = event.submitter;
    if (submitter === null) {
      return;
    }
    const value = (<any>submitter).value as string;
    this.requestCV(token, value);
  }

  requestCV(token: string, lang: string) {
    this.isRequesting = true;
    this.http.get(`assets/data/cv-${lang}.bin`, { responseType: 'arraybuffer' }).subscribe({
      next: data => {
        const dataToDecrypt = Buffer.from(data).toString('base64');
        this.http.post<any>(`${elsecServerAddress}/c/dec`, {
          token: token,
          data: dataToDecrypt,
        }).subscribe({
          next: data => this.onCVReceived(data),
          error: error => this.onCVRequestError(error),
        });
      },
      error: error => this.onCVRequestError(error),
    });
  }

  onCVReceived(data: any) {
    this.isRequesting = false;
    if ('res' in data) {
      this.isAuthenticated = true;
      this.cvContent = Buffer.from(data.res as string, 'base64').toString();
    } else if ('msg' in data) {
      this.isAuthenticated = false;
      this.cvContent = '';
      this.errorMessage = data.msg;
    }
  }

  onCVRequestError(response: HttpErrorResponse) {
    this.isRequesting = false;
    if (response.status !== 200) {
      this.isAuthenticated = false;
      this.cvContent = '';
      if ('msg' in response.error) {
        this.errorMessage = response.error.msg;
      } else {
        this.errorMessage = 'Error requesting Resume data.';
      }
    }
  }

  getAge(birthDay: number, birthMonth: number, birthYear: number) {
    let birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  downloadFile(dataUrl: string, title: string) {
    const a = document.createElement('a') as HTMLAnchorElement;
    a.href = dataUrl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async saveToFile() {
    this.isForceExpanded = true;
    this.isSaving = true;
    setTimeout(async () => {
      if (this.elRef?.nativeElement != null) {
        const node = this.elRef.nativeElement;
        this.isForceExpanded = false;
        const dataUrl = await exportNode(node, {
          docFaviconUrl: Helpers.cvFavicon,
          docTitle: 'Yegor Pelykh - Resume',
          styleTransferMode: StyleTransferMode.declared,
          styles: {
            body: {
              padding: '2rem'
            }
          },
          filter: node => !node.classList?.contains('cv-save-button') &&
            !node.classList?.contains('cv-auth-form'),
        });
        if (dataUrl != null) {
          this.downloadFile(dataUrl, 'Yegor Pelykh - Resume');
          this.isSaving = false;
        }
      }
    }, 500);
  }

}
