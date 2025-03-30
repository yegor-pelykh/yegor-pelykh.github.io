import { Component, OnInit } from '@angular/core';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';

@Component({
  selector: 'app-contacts',
  imports: [
    HeaderedContentComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
