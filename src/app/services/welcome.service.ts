import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WelcomeService {
  private readonly skills = [
    { icon: 'code', label: 'Dart' },
    { icon: 'code', label: 'C#' },
    { icon: 'code', label: 'C++' },
    { icon: 'code', label: 'TypeScript' },
    { icon: 'code', label: 'JavaScript' },
    { icon: 'html', label: 'HTML' },
    { icon: 'css', label: 'CSS' },
    { icon: 'palette', label: 'SCSS' },
    { icon: 'code', label: 'Python' },
    { icon: 'storage', label: 'SQL' },
    { icon: 'code', label: 'Java' },
    { icon: 'memory', label: 'FASM' },
    { icon: 'widgets', label: '.NET' },
    { icon: 'integration_instructions', label: 'Flutter' },
    { icon: 'integration_instructions', label: 'Angular' },
    { icon: 'desktop_windows', label: 'Electron' },
    { icon: 'storage', label: 'Node.js' },
    { icon: 'extension', label: 'WebExtensions API' },
    { icon: 'developer_board', label: 'Qt' },
    { icon: 'web', label: 'WPF' },
    { icon: 'web', label: 'Windows Forms' },
    { icon: 'web', label: 'UWP' },
    { icon: 'web', label: 'MFC' },
    { icon: 'view_list', label: 'STL' },
    { icon: 'settings', label: 'Windows API' },
    { icon: 'android', label: 'Android SDK' },
    { icon: 'security', label: 'Cybersecurity' },
    { icon: 'speed', label: 'Performance' },
    { icon: 'cloud', label: 'Express.js' },
    { icon: 'emoji_objects', label: 'AI' },
    { icon: 'palette', label: 'Material Design' },
    { icon: 'data_object', label: 'RxJS' },
    { icon: 'api', label: 'REST API' },
    { icon: 'vpn_lock', label: 'VPN' },
    { icon: 'vpn_key', label: 'OpenVPN' },
    { icon: 'layers', label: 'Virtualization' },
  ];

  readonly techStack = signal(this.shuffle(this.skills));

  private shuffle<T>(array: T[]): T[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
