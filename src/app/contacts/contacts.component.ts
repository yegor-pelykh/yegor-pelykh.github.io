import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ContactItemComponent } from './contact-item.component';
import { ContentPanelComponent } from '../content-panel/content-panel.component';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    TranslateModule,
    ContactItemComponent,
    ContentPanelComponent
  ],
  styleUrl: './contacts.component.scss',
  templateUrl: './contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  private readonly contactService = inject(ContactService);
  readonly contacts = computed(() => this.contactService.contacts());
}
