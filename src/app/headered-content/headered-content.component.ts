import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-headered-content',
  standalone: true,
  templateUrl: './headered-content.component.html',
  styleUrls: ['./headered-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderedContentComponent {
  @Input() header: string = '';
}
