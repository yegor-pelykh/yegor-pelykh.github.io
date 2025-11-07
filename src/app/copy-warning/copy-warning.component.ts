import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-copy-warning',
  standalone: true,
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './copy-warning.component.html',
  styleUrl: './copy-warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyWarningComponent {
  @Input() visible = false;

  @HostBinding('class.visible')
  get isVisible() {
    return this.visible;
  }
}
