import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelpersUtil } from '../helpers';

@Component({
  selector: 'app-expander',
  standalone: true,
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpanderComponent {
  @Input() header: string = '';
  readonly inputId: string = this.generateUniqueId();

  private generateUniqueId(): string {
    return HelpersUtil.getUniqueId('expander-id-');
  }
}
