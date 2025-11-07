import { ChangeDetectionStrategy, Component, HostBinding, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink, Router } from '@angular/router';
import { LANGUAGES, SECTIONS, LanguageCode } from '../utils/constants';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, TranslatePipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly siteTitle = 'Pelykh';
  readonly sectionKeys = SECTIONS;
  readonly languages = LANGUAGES;
  readonly language = signal<LanguageCode>('en');
  readonly isMobile = signal(window.innerWidth <= 700);

  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);

  @HostBinding('class.mobile')
  get mobileClass(): boolean {
    return this.isMobile();
  }

  private getCookie(name: string): string | null {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, null as string | null);
  }

  private setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }

  private isSupportedLanguage(lang: string): boolean {
    return this.languages.some(l => l.code === lang);
  }

  private detectBrowserLanguage(): LanguageCode {
    const navLangs = navigator.languages ? navigator.languages : [navigator.language];
    for (const lang of navLangs) {
      const code = lang.split('-')[0].toLowerCase();
      if (this.isSupportedLanguage(code)) {
        return code as LanguageCode;
      }
    }
    return 'en';
  }

  constructor() {
    const savedLang = this.getCookie('lang');
    if (savedLang && this.isSupportedLanguage(savedLang)) {
      this.language.set(savedLang as LanguageCode);
    } else {
      const browserLang = this.detectBrowserLanguage();
      this.language.set(browserLang);
      this.setCookie('lang', browserLang, 365);
    }
    this.translateService.use(this.language());

    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth <= 700);
    });
  }

  selectLanguage(lang: LanguageCode): void {
    this.language.set(lang);
    this.translateService.use(lang);
    this.setCookie('lang', lang, 365);
  }

  getCurrentLanguage() {
    return this.languages.find(l => l.code === this.language());
  }

  isActive(path: string): boolean {
    if (path === '' || path === '/') {
      return this.router.url === '/' || this.router.url === '';
    }
    return this.router.url.startsWith(path);
  }
}
