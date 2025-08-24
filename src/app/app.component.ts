import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { BackgroundComponent } from './background/background.component';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BackgroundComponent,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public presentationMode = true;
  public headerHeight = 0;

  @ViewChild('header', { static: true })
  private readonly headerRef?: ElementRef<HTMLDivElement>;

  @ViewChild('contentArea', { static: true })
  private readonly contentAreaRef?: ElementRef<HTMLDivElement>;

  private readonly destroy$ = new Subject<void>();
  private removeResizeListener?: () => void;

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public ngAfterViewInit(): void {
    this.updateHeaderHeight();
    this.removeResizeListener = this.renderer.listen('window', 'resize', () => {
      this.updateHeaderHeight();
      this.cdr.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.removeResizeListener) {
      this.removeResizeListener();
    }
  }

  @HostListener('window:wheel', ['$event'])
  public onWheel(event: WheelEvent): void {
    if (this.presentationMode && event.deltaY > 0) {
      this.disablePresentationMode();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.presentationMode && event.key === 'ArrowDown') {
      this.disablePresentationMode();
    }
  }

  public togglePresentationMode(): void {
    this.presentationMode = !this.presentationMode;
  }

  public onActivate(): void {
    this.scrollToTop();
  }

  public get copyrightNotice(): string {
    const year = new Date().getFullYear();
    return `© 2023${year === 2023 ? '' : ` - ${year}`}, Yegor Pelykh. All rights reserved. Copying without permission is prohibited.`;
  }

  private updateHeaderHeight(): void {
    this.headerHeight = this.headerRef?.nativeElement.offsetHeight ?? 0;
  }

  private disablePresentationMode(): void {
    this.presentationMode = false;
    this.cdr.markForCheck();
  }

  private scrollToTop(): void {
    if (this.contentAreaRef) {
      this.contentAreaRef.nativeElement.scrollTop = 0;
    }
  }
}
