import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode } from '../utils/constants';
import { Project } from '../types/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly projectsData: Record<LanguageCode, Project[]> = {
    en: [
      {
        id: 'onhand',
        title: 'OnHand',
        description: 'Add-on (extension) for browsers that allows you to bookmark your favorite sites on the "new page" of the browser.',
        languages: ['Dart', 'JavaScript', 'HTML'],
        frameworks: ['Flutter (Web)', 'WebExtensions API'],
        links: [
          { label: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/detail/onhand/ndghfaalceocliigojpcoohpaagomkcf', icon: 'language' },
          { label: 'Mozilla Add-ons', url: 'https://addons.mozilla.org/ru/firefox/addon/onhand', icon: 'language' },
          { label: 'Microsoft Edge Addons', url: 'https://microsoftedge.microsoft.com/addons/detail/onhand/kcicjmoijnmhooklndppjknpocdafoep', icon: 'language' },
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/OnHand', icon: 'code' }
        ]
      },
      {
        id: 'coingecko-api',
        title: 'coingecko_api',
        description: 'A Dart package that provides access to the CoinGecko API (version 3) for getting aggregated data on crypto markets.',
        languages: ['Dart'],
        frameworks: ['CoinGecko API'],
        links: [
          { label: 'Pub.Dev', url: 'https://pub.dev/packages/coingecko_api', icon: 'cloud_download' },
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/coingecko_api', icon: 'code' }
        ]
      },
      {
        id: 'hostmanager',
        title: 'HostManager',
        description: 'Application for easy management of system mappings of domain names to IP addresses (host entries).',
        languages: ['C#', 'XAML'],
        frameworks: ['.NET 5', 'Prism', 'HandyControl', 'WpfFontAwesome'],
        links: [
          { label: 'HostManagerSetup.msi', url: 'https://github.com/yegor-pelykh/HostManager/releases/latest/download/HostManagerSetup.msi', icon: 'download' },
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/HostManager', icon: 'code' }
        ]
      },
      {
        id: 'image-in-browser',
        title: 'image-in-browser',
        description: 'Node.js package providing the ability to load, manipulate and save images of various image file formats.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/image-in-browser', icon: 'cloud_download' },
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/image-in-browser', icon: 'code' },
          { label: 'Documentation', url: 'https://github.com/yegor-pelykh/image-in-browser/wiki', icon: 'description' }
        ]
      },
      {
        id: 'image-in-browser-examples',
        title: 'image-in-browser.examples',
        description: 'A set of examples of using library image-in-browser.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/image-in-browser.examples', icon: 'code' },
          { label: 'Documentation', url: 'https://github.com/yegor-pelykh/image-in-browser.examples/wiki', icon: 'description' }
        ]
      },
      {
        id: 'echo-route',
        title: 'EchoRoute',
        description: 'A simple application for duplicating audio output.',
        languages: ['C#'],
        frameworks: ['NAudio', 'Windows Forms'],
        links: [
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/EchoRoute', icon: 'code' }
        ]
      },
      {
        id: 'dom-node-export',
        title: 'dom-node-export',
        description: 'Node.js package to export individual DOM nodes from your web application or website into a separate XHTML document, including fonts, styles and images.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/dom-node-export', icon: 'cloud_download' },
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/dom-node-export', icon: 'code' }
        ]
      },
      {
        id: 'mixed-call-stack-sample',
        title: 'MixedCallStackSample',
        description: 'This research project is a test ground for the idea of obtaining mixed call stack from within hooked process functions.',
        languages: ['C++', 'C#'],
        frameworks: ['.NET Core', '.NET Framework', 'CLR Profiling API', 'Detours API'],
        links: [
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/MixedCallStackSample', icon: 'code' },
          { label: 'Documentation', url: 'https://github.com/yegor-pelykh/MixedCallStackSample/blob/main/README.md', icon: 'description' }
        ]
      },
      {
        id: 'geo-chat-hunter',
        title: 'GeoChatHunter',
        description: 'An old research project for discovering Telegram geo-chats nearby (or anywhere else in the world). Abandoned due to violation of Telegram platform agreement. Will not be maintained.',
        languages: ['Dart'],
        frameworks: ['Flutter', 'Telegram API'],
        links: [
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/GeoChatHunter', icon: 'code' }
        ]
      },
      {
        id: 'personal-site',
        title: 'yegor-pelykh.github.io',
        description: 'My personal web page (this website).',
        languages: ['TypeScript', 'HTML', 'SCSS'],
        frameworks: ['Node.js', 'Angular'],
        links: [
          { label: 'Source Code', url: 'https://github.com/yegor-pelykh/yegor-pelykh.github.io', icon: 'code' }
        ]
      }
    ],
    ru: [
      {
        id: 'onhand',
        title: 'OnHand',
        description: 'Расширение для браузеров, позволяющее закреплять избранные сайты на странице "новая вкладка".',
        languages: ['Dart', 'JavaScript', 'HTML'],
        frameworks: ['Flutter (Web)', 'WebExtensions API'],
        links: [
          { label: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/detail/onhand/ndghfaalceocliigojpcoohpaagomkcf', icon: 'language' },
          { label: 'Mozilla Add-ons', url: 'https://addons.mozilla.org/ru/firefox/addon/onhand', icon: 'language' },
          { label: 'Microsoft Edge Addons', url: 'https://microsoftedge.microsoft.com/addons/detail/onhand/kcicjmoijnmhooklndppjknpocdafoep', icon: 'language' },
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/OnHand', icon: 'code' }
        ]
      },
      {
        id: 'coingecko-api',
        title: 'coingecko_api',
        description: 'Пакет Dart для доступа к CoinGecko API (версия 3) для получения агрегированных данных по крипторынкам.',
        languages: ['Dart'],
        frameworks: ['CoinGecko API'],
        links: [
          { label: 'Pub.Dev', url: 'https://pub.dev/packages/coingecko_api', icon: 'cloud_download' },
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/coingecko_api', icon: 'code' }
        ]
      },
      {
        id: 'hostmanager',
        title: 'HostManager',
        description: 'Приложение для удобного управления системными сопоставлениями доменных имен и IP-адресов (host entries).',
        languages: ['C#', 'XAML'],
        frameworks: ['.NET 5', 'Prism', 'HandyControl', 'WpfFontAwesome'],
        links: [
          { label: 'HostManagerSetup.msi', url: 'https://github.com/yegor-pelykh/HostManager/releases/latest/download/HostManagerSetup.msi', icon: 'download' },
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/HostManager', icon: 'code' }
        ]
      },
      {
        id: 'image-in-browser',
        title: 'image-in-browser',
        description: 'Пакет Node.js для загрузки, обработки и сохранения изображений различных форматов.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/image-in-browser', icon: 'cloud_download' },
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/image-in-browser', icon: 'code' },
          { label: 'Документация', url: 'https://github.com/yegor-pelykh/image-in-browser/wiki', icon: 'description' }
        ]
      },
      {
        id: 'image-in-browser-examples',
        title: 'image-in-browser.examples',
        description: 'Набор примеров использования библиотеки image-in-browser.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/image-in-browser.examples', icon: 'code' },
          { label: 'Документация', url: 'https://github.com/yegor-pelykh/image-in-browser.examples/wiki', icon: 'description' }
        ]
      },
      {
        id: 'echo-route',
        title: 'EchoRoute',
        description: 'Простое приложение для дублирования аудиовыхода.',
        languages: ['C#'],
        frameworks: ['NAudio', 'Windows Forms'],
        links: [
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/EchoRoute', icon: 'code' }
        ]
      },
      {
        id: 'dom-node-export',
        title: 'dom-node-export',
        description: 'Пакет Node.js для экспорта отдельных DOM-узлов вашего веб-приложения или сайта в отдельный XHTML-документ с сохранением шрифтов, стилей и изображений.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/dom-node-export', icon: 'cloud_download' },
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/dom-node-export', icon: 'code' }
        ]
      },
      {
        id: 'mixed-call-stack-sample',
        title: 'MixedCallStackSample',
        description: 'Исследовательский проект для тестирования идеи получения смешанного стека вызовов из перехваченных функций процесса.',
        languages: ['C++', 'C#'],
        frameworks: ['.NET Core', '.NET Framework', 'CLR Profiling API', 'Detours API'],
        links: [
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/MixedCallStackSample', icon: 'code' },
          { label: 'Документация', url: 'https://github.com/yegor-pelykh/MixedCallStackSample/blob/main/README.md', icon: 'description' }
        ]
      },
      {
        id: 'geo-chat-hunter',
        title: 'GeoChatHunter',
        description: 'Старый исследовательский проект для поиска Telegram geo-чатов поблизости (или в любой точке мира). Заброшен из-за нарушения соглашения Telegram. Не поддерживается.',
        languages: ['Dart'],
        frameworks: ['Flutter', 'Telegram API'],
        links: [
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/GeoChatHunter', icon: 'code' }
        ]
      },
      {
        id: 'personal-site',
        title: 'yegor-pelykh.github.io',
        description: 'Моя персональная страница (этот сайт).',
        languages: ['TypeScript', 'HTML', 'SCSS'],
        frameworks: ['Node.js', 'Angular'],
        links: [
          { label: 'Исходный код', url: 'https://github.com/yegor-pelykh/yegor-pelykh.github.io', icon: 'code' }
        ]
      }
    ],
    uk: [
      {
        id: 'onhand',
        title: 'OnHand',
        description: 'Розширення для браузерів, що дозволяє закріплювати улюблені сайти на сторінці "нова вкладка".',
        languages: ['Dart', 'JavaScript', 'HTML'],
        frameworks: ['Flutter (Web)', 'WebExtensions API'],
        links: [
          { label: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/detail/onhand/ndghfaalceocliigojpcoohpaagomkcf', icon: 'language' },
          { label: 'Mozilla Add-ons', url: 'https://addons.mozilla.org/ru/firefox/addon/onhand', icon: 'language' },
          { label: 'Microsoft Edge Addons', url: 'https://microsoftedge.microsoft.com/addons/detail/onhand/kcicjmoijnmhooklndppjknpocdafoep', icon: 'language' },
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/OnHand', icon: 'code' }
        ]
      },
      {
        id: 'coingecko-api',
        title: 'coingecko_api',
        description: 'Пакет Dart для доступу до CoinGecko API (версія 3) для отримання агрегованих даних по крипторинках.',
        languages: ['Dart'],
        frameworks: ['CoinGecko API'],
        links: [
          { label: 'Pub.Dev', url: 'https://pub.dev/packages/coingecko_api', icon: 'cloud_download' },
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/coingecko_api', icon: 'code' }
        ]
      },
      {
        id: 'hostmanager',
        title: 'HostManager',
        description: 'Додаток для зручного керування системними відповідностями доменних імен та IP-адрес (host entries).',
        languages: ['C#', 'XAML'],
        frameworks: ['.NET 5', 'Prism', 'HandyControl', 'WpfFontAwesome'],
        links: [
          { label: 'HostManagerSetup.msi', url: 'https://github.com/yegor-pelykh/HostManager/releases/latest/download/HostManagerSetup.msi', icon: 'download' },
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/HostManager', icon: 'code' }
        ]
      },
      {
        id: 'image-in-browser',
        title: 'image-in-browser',
        description: 'Пакет Node.js для завантаження, обробки та збереження зображень різних форматів.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/image-in-browser', icon: 'cloud_download' },
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/image-in-browser', icon: 'code' },
          { label: 'Документація', url: 'https://github.com/yegor-pelykh/image-in-browser/wiki', icon: 'description' }
        ]
      },
      {
        id: 'image-in-browser-examples',
        title: 'image-in-browser.examples',
        description: 'Набір прикладів використання бібліотеки image-in-browser.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/image-in-browser.examples', icon: 'code' },
          { label: 'Документація', url: 'https://github.com/yegor-pelykh/image-in-browser.examples/wiki', icon: 'description' }
        ]
      },
      {
        id: 'echo-route',
        title: 'EchoRoute',
        description: 'Простий додаток для дублювання аудіовиходу.',
        languages: ['C#'],
        frameworks: ['NAudio', 'Windows Forms'],
        links: [
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/EchoRoute', icon: 'code' }
        ]
      },
      {
        id: 'dom-node-export',
        title: 'dom-node-export',
        description: 'Пакет Node.js для експорту окремих DOM-вузлів вашого веб-додатку або сайту в окремий XHTML-документ із збереженням шрифтів, стилів та зображень.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/dom-node-export', icon: 'cloud_download' },
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/dom-node-export', icon: 'code' }
        ]
      },
      {
        id: 'mixed-call-stack-sample',
        title: 'MixedCallStackSample',
        description: 'Дослідницький проект для тестування ідеї отримання змішаного стеку викликів із перехоплених функцій процесу.',
        languages: ['C++', 'C#'],
        frameworks: ['.NET Core', '.NET Framework', 'CLR Profiling API', 'Detours API'],
        links: [
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/MixedCallStackSample', icon: 'code' },
          { label: 'Документація', url: 'https://github.com/yegor-pelykh/MixedCallStackSample/blob/main/README.md', icon: 'description' }
        ]
      },
      {
        id: 'geo-chat-hunter',
        title: 'GeoChatHunter',
        description: 'Старий дослідницький проект для пошуку Telegram geo-чатів поблизу (або будь-де у світі). Залишений через порушення угоди Telegram. Не підтримується.',
        languages: ['Dart'],
        frameworks: ['Flutter', 'Telegram API'],
        links: [
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/GeoChatHunter', icon: 'code' }
        ]
      },
      {
        id: 'personal-site',
        title: 'yegor-pelykh.github.io',
        description: 'Моя персональна сторінка (цей сайт).',
        languages: ['TypeScript', 'HTML', 'SCSS'],
        frameworks: ['Node.js', 'Angular'],
        links: [
          { label: 'Вихідний код', url: 'https://github.com/yegor-pelykh/yegor-pelykh.github.io', icon: 'code' }
        ]
      }
    ]
  };

  private readonly translateService = inject(TranslateService);

  private readonly lang = signal<LanguageCode>(this.translateService.getCurrentLang() as LanguageCode || 'en');
  readonly projects: Signal<Project[]> = computed(() => this.projectsData[this.lang()] ?? this.projectsData['en']);

  constructor() {
    this.translateService.onLangChange.subscribe(event => {
      this.lang.set(event.lang as LanguageCode);
    });
  }
}
