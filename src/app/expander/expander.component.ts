import { Component, Input } from '@angular/core';
import { Helpers } from '../helpers';

@Component({
  selector: 'app-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss']
})
export class ExpanderComponent {
  @Input()
  header: String = '';
  inputId: string = Helpers.getUniqueId('expander-id-');

}
