import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Contact } from '../types/contact';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCard } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCard, TranslatePipe],
  styleUrl: './contact-item.component.scss',
  templateUrl: './contact-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactItemComponent {
  @Input({ required: true }) contact!: Contact;
  readonly copied = signal(false);

  private resetCopied() {
    this.copied.set(false);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.contact.value).then(() => {
      this.copied.set(true);
      setTimeout(() => this.resetCopied(), 1200);
    });
  }
}
