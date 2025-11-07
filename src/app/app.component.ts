import { ChangeDetectionStrategy, Component, NgZone, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BackgroundComponent } from './background/background.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CopyWarningComponent } from './copy-warning/copy-warning.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BackgroundComponent, TranslatePipe, CopyWarningComponent],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly copyWarningVisible = signal(false);

  private selectionListener = () => {
    const selection = window.getSelection();
    this.copyWarningVisible.set(
      !!selection && !selection.isCollapsed && selection.toString().trim().length > 0
    );
  };

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('selectionchange', this.handleSelectionChange, false);
    });
  }

  ngOnDestroy() {
    document.removeEventListener('selectionchange', this.handleSelectionChange, false);
  }

  private handleSelectionChange = () => {
    this.zone.run(() => this.selectionListener());
  };
}
