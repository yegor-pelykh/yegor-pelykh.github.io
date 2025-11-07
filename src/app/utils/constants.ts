import { Contact } from '../types/contact';
import { Project } from '../types/project';

export type LanguageCode = 'uk' | 'ru' | 'en';

export const LANGUAGES: Array<{ code: LanguageCode, label: string, flag: string }> = [
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export const SECTIONS = [
  { title: 'nav.welcome', path: '/' },
  { title: 'nav.projects', path: '/projects' },
  { title: 'nav.resume', path: '/resume' },
  { title: 'nav.contacts', path: '/contacts' }
];

export const CONTACTS: Contact[] = [
  {
    type: 'Telegram',
    value: '@yegor_pelykh',
    icon: 'send',
    link: 'https://t.me/yegor_pelykh'
  },
  {
    type: 'E-mail',
    value: 'yegor.dev@gmail.com',
    icon: 'alternate_email',
    link: 'mailto:yegor.dev@gmail.com'
  },
  {
    type: 'LinkedIn',
    value: 'https://linkedin.com/in/ypelykh',
    icon: 'business_center',
    link: 'https://linkedin.com/in/ypelykh'
  },
  {
    type: 'GitHub',
    value: 'https://github.com/yegor-pelykh',
    icon: 'code',
    link: 'https://github.com/yegor-pelykh'
  },
  {
    type: 'GitLab',
    value: 'https://gitlab.com/yegor-pelykh',
    icon: 'code',
    link: 'https://gitlab.com/yegor-pelykh'
  },
  {
    type: 'NPM',
    value: 'https://npmjs.com/~yegor-pelykh',
    icon: 'extension',
    link: 'https://npmjs.com/~yegor-pelykh'
  },
  {
    type: 'NuGet Gallery',
    value: 'https://nuget.org/profiles/yegorpelykh',
    icon: 'widgets',
    link: 'https://nuget.org/profiles/yegorpelykh'
  },
  {
    type: 'Google Developers',
    value: 'https://g.dev/yegor',
    icon: 'developer_mode',
    link: 'https://g.dev/yegor'
  },
  {
    type: 'Mozilla Addons',
    value: 'https://addons.mozilla.org/ru/firefox/user/16984564',
    icon: 'extension',
    link: 'https://addons.mozilla.org/ru/firefox/user/16984564'
  }
];

export const ELSEC_SERVER_URL = 'https://elsec.fly.dev';
