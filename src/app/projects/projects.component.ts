import { Component, OnInit } from '@angular/core';
import { ExpanderComponent } from '../expander/expander.component';
import { HeaderedContentComponent } from '../headered-content/headered-content.component';

@Component({
  selector: 'app-projects',
  imports: [
    ExpanderComponent,
    HeaderedContentComponent,

  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
