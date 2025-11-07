import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { fromEvent, Subject, interval } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backgroundCanvas', { static: true })
  public backgroundCanvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly letters: string = 'YEGORPLKHyegorplkh';
  private readonly fontSize: number = 12;
  private readonly backgroundColor: string = 'rgba(255,255,255,0.08)';
  private readonly symbolColor: string = '#003200';

  private canvasContext?: CanvasRenderingContext2D;
  private canvasWidth = 0;
  private canvasHeight = 0;
  private drops: number[] = [];
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.initCanvasContext();
    this.handleResize();
    this.startBackgroundAnimation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initCanvasContext(): void {
    if (this.backgroundCanvasRef) {
      this.canvasContext = this.backgroundCanvasRef.nativeElement.getContext('2d') ?? undefined;
    }
  }

  private handleResize(): void {
    if (!this.backgroundCanvasRef) return;
    fromEvent(window, 'resize')
      .pipe(startWith(null), takeUntil(this.destroy$))
      .subscribe(() => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    if (!this.backgroundCanvasRef) return;
    const { offsetWidth, offsetHeight } = this.backgroundCanvasRef.nativeElement;
    if (offsetWidth === this.canvasWidth && offsetHeight === this.canvasHeight) return;

    this.canvasWidth = offsetWidth;
    this.canvasHeight = offsetHeight;
    this.backgroundCanvasRef.nativeElement.width = this.canvasWidth;
    this.backgroundCanvasRef.nativeElement.height = this.canvasHeight;
    this.initDrops();
  }

  private initDrops(): void {
    const columns = Math.floor(this.canvasWidth / this.fontSize);
    this.drops = Array.from({ length: columns }, () => 1);
  }

  private startBackgroundAnimation(): void {
    interval(50)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.drawBackground());
  }

  private drawBackground(): void {
    if (!this.canvasContext || !this.backgroundCanvasRef) return;
    this.canvasContext.fillStyle = this.backgroundColor;
    this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.letters[Math.floor(Math.random() * this.letters.length)];
      this.canvasContext.fillStyle = this.symbolColor;
      this.canvasContext.fillText(
        text,
        i * this.fontSize,
        this.drops[i] * this.fontSize
      );
      this.drops[i]++;
      if (
        this.drops[i] * this.fontSize > this.canvasHeight &&
        Math.random() > 0.95
      ) {
        this.drops[i] = 0;
      }
    }
  }
}
