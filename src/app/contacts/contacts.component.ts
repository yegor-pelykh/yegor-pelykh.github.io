import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';
import { NgFor } from '@angular/common';

interface ContactInfo {
  readonly label: string;
  readonly url: string;
  readonly display: string;
  readonly isEmail?: boolean;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [HeaderedContentComponent, NgFor,],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  readonly contactList: readonly ContactInfo[] = [
    {
      label: 'E-mail',
      url: 'mailto:yegor.dev@gmail.com',
      display: 'yegor.dev@gmail.com',
      isEmail: true
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/ypelykh',
      display: 'https://linkedin.com/in/ypelykh'
    },
    {
      label: 'GitHub',
      url: 'https://github.com/yegor-pelykh',
      display: 'https://github.com/yegor-pelykh'
    },
    {
      label: 'GitLab',
      url: 'https://gitlab.com/yegor-pelykh',
      display: 'https://gitlab.com/yegor-pelykh'
    },
    {
      label: 'NPM',
      url: 'https://npmjs.com/~yegor-pelykh',
      display: 'https://npmjs.com/~yegor-pelykh'
    },
    {
      label: 'NuGet Gallery',
      url: 'https://nuget.org/profiles/yegorpelykh',
      display: 'https://nuget.org/profiles/yegorpelykh'
    },
    {
      label: 'Google Developers',
      url: 'https://g.dev/yegor',
      display: 'https://g.dev/yegor'
    },
    {
      label: 'Mozilla Addons',
      url: 'https://addons.mozilla.org/ru/firefox/user/16984564',
      display: 'https://addons.mozilla.org/ru/firefox/user/16984564'
    }
  ];

  trackByLabel(index: number, contact: ContactInfo): string {
    return contact.label;
  }
}
