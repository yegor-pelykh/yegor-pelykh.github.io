import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headered-content',
  templateUrl: './headered-content.component.html',
  styleUrls: ['./headered-content.component.scss']
})
export class HeaderedContentComponent {
  @Input()
  header: String = '';

}
