import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContentPanelComponent } from '../content-panel/content-panel.component';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatChipsModule, TranslateModule, ContentPanelComponent],
  styleUrl: './welcome.component.scss',
  templateUrl: './welcome.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
  private readonly welcomeService = inject(WelcomeService);
  readonly techStack = this.welcomeService.techStack;
  private readonly router = inject(Router);

  goto(section: string) {
    this.router.navigate([section]);
  }
}
