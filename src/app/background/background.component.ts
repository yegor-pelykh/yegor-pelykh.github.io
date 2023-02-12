import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('backgroundCanvas')
  private bgCanvas?: ElementRef<HTMLCanvasElement>;
  private bgCanvasContext?: CanvasRenderingContext2D;
  private bgTimer?: NodeJS.Timer;
  private bgCanvasWidth: number = 0;
  private bgCanvasHeight: number = 0;

  private static letters = 'YEGORPLKHyegorplkh';
  private static fontSize = 12;
  private static backgroundColor = 'rgba(255,255,255,0.08)';
  private static symbolColor = '#003200';

  reloadBackground() {
    if (this.bgCanvas == null || this.bgCanvasContext == null)
      return;
    if (this.bgCanvas.nativeElement.offsetWidth == this.bgCanvasWidth && this.bgCanvas.nativeElement.offsetHeight == this.bgCanvasHeight)
      return;
    this.bgCanvasWidth = this.bgCanvas.nativeElement.offsetWidth;
    this.bgCanvasHeight = this.bgCanvas.nativeElement.offsetHeight;
    this.bgCanvas.nativeElement.width = this.bgCanvasWidth;
    this.bgCanvas.nativeElement.height = this.bgCanvasHeight;
    const columns = this.bgCanvasWidth / BackgroundComponent.fontSize;
    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    if (this.bgTimer != null)
      clearInterval(this.bgTimer);
    this.bgTimer = setInterval(() => {
      if (this.bgCanvasContext == null) return;
      this.bgCanvasContext.fillStyle = BackgroundComponent.backgroundColor;
      this.bgCanvasContext.fillRect(0, 0, this.bgCanvasWidth, this.bgCanvasHeight);
      for (var i = 0; i < drops.length; i++) {
        var text = BackgroundComponent.letters[Math.floor(Math.random() * BackgroundComponent.letters.length)];
        this.bgCanvasContext.fillStyle = BackgroundComponent.symbolColor;
        this.bgCanvasContext.fillText(text, i * BackgroundComponent.fontSize, drops[i] * BackgroundComponent.fontSize);
        drops[i]++;
        if (drops[i] * BackgroundComponent.fontSize > this.bgCanvasHeight && Math.random() > .95) {
          drops[i] = 0;
        }
      }
    }, 50);
  }

  ngAfterViewInit(): void {
    this.bgCanvasContext = this.bgCanvas?.nativeElement.getContext('2d') ?? undefined;
  }

  ngAfterViewChecked(): void {
    this.reloadBackground();
  }

  ngOnDestroy(): void {
    if (this.bgTimer != null) {
      clearInterval(this.bgTimer);
      this.bgTimer = undefined;
    }
  }

}
