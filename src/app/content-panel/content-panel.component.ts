import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-content-panel',
  standalone: true,
  styleUrl: './content-panel.component.scss',
  templateUrl: './content-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPanelComponent { }
