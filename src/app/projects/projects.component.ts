import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService } from '../services/project.service';
import { ContentPanelComponent } from '../content-panel/content-panel.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    TranslateModule,
    ContentPanelComponent
  ],
  styleUrl: './projects.component.scss',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = computed(() => this.projectService.projects());
}
