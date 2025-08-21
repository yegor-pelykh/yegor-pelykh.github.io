import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpanderComponent } from '../expander/expander.component';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';
import { Observable, of } from 'rxjs';

interface Project {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly languages: string[];
  readonly frameworks: string[];
  readonly links: { label: string; url: string }[];
  readonly sourceCodeUrl?: string;
  readonly documentationUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ExpanderComponent,
    HeaderedContentComponent
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  readonly projects$: Observable<Project[]> = this.getProjects();

  private getProjects(): Observable<Project[]> {
    return of([
      {
        id: 'onhand',
        name: 'OnHand',
        description: 'Add-on (extension) for browsers that allows you to bookmark your favorite sites on the "new page" of the browser.',
        languages: ['Dart', 'JavaScript', 'HTML'],
        frameworks: ['Flutter (Web)', 'WebExtensions API'],
        links: [
          { label: 'Chrome Web Store', url: 'https://chrome.google.com/webstore/detail/onhand/ndghfaalceocliigojpcoohpaagomkcf' },
          { label: 'Mozilla Add-ons', url: 'https://addons.mozilla.org/ru/firefox/addon/onhand' },
          { label: 'Microsoft Edge Addons', url: 'https://microsoftedge.microsoft.com/addons/detail/onhand/kcicjmoijnmhooklndppjknpocdafoep' }
        ],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/OnHand'
      },
      {
        id: 'coingecko-api',
        name: 'coingecko_api',
        description: 'A Dart package that provides access to the CoinGecko API (version 3) for getting aggregated data on crypto markets.',
        languages: ['Dart'],
        frameworks: ['CoinGecko API'],
        links: [
          { label: 'Pub.Dev', url: 'https://pub.dev/packages/coingecko_api' }
        ],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/coingecko_api'
      },
      {
        id: 'hostmanager',
        name: 'HostManager',
        description: 'Application for easy management of system mappings of domain names to IP addresses (host entries).',
        languages: ['C#', 'XAML'],
        frameworks: ['.NET 5', 'Prism', 'HandyControl', 'WpfFontAwesome'],
        links: [
          { label: 'HostManagerSetup.msi', url: 'https://github.com/yegor-pelykh/HostManager/releases/latest/download/HostManagerSetup.msi' }
        ],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/HostManager'
      },
      {
        id: 'image-in-browser',
        name: 'image-in-browser',
        description: 'Node.js package providing the ability to load, manipulate and save images of various image file formats.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/image-in-browser' }
        ],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/image-in-browser',
        documentationUrl: 'https://github.com/yegor-pelykh/image-in-browser/wiki'
      },
      {
        id: 'image-in-browser-examples',
        name: 'image-in-browser.examples',
        description: 'A set of examples of using library image-in-browser.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/image-in-browser.examples',
        documentationUrl: 'https://github.com/yegor-pelykh/image-in-browser.examples/wiki'
      },
      {
        id: 'dom-node-export',
        name: 'dom-node-export',
        description: 'Node.js package to export individual DOM nodes from your web application or website into a separate XHTML document, including fonts, styles and images.',
        languages: ['TypeScript'],
        frameworks: ['Node.js'],
        links: [
          { label: 'NPM repository', url: 'https://www.npmjs.com/package/dom-node-export' }
        ],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/dom-node-export'
      },
      {
        id: 'mixed-call-stack-sample',
        name: 'MixedCallStackSample',
        description: 'This research project is a test ground for the idea of obtaining mixed call stack from within hooked process functions.',
        languages: ['C++', 'C#'],
        frameworks: ['.NET Core', '.NET Framework', 'CLR Profiling API', 'Detours API'],
        links: [],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/MixedCallStackSample',
        documentationUrl: 'https://github.com/yegor-pelykh/MixedCallStackSample/blob/main/README.md'
      },
      {
        id: 'personal-site',
        name: 'yegor-pelykh.github.io',
        description: 'My personal web page (this website).',
        languages: ['TypeScript', 'HTML', 'SCSS'],
        frameworks: ['Node.js', 'Angular'],
        links: [],
        sourceCodeUrl: 'https://github.com/yegor-pelykh/yegor-pelykh.github.io'
      }
    ]);
  }

  public trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}
