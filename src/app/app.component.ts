import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public presentationMode: boolean = true;
  public headerHeight: number = 0;
  @ViewChild('header')
  private header?: ElementRef<HTMLDivElement>;
  @ViewChild("contentArea")
  private contentArea?: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.headerHeight = this.header?.nativeElement.offsetHeight ?? 0;
    window.onresize = (ev: UIEvent) => {
      this.headerHeight = this.header?.nativeElement.offsetHeight ?? 0;
    };
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.presentationMode && event.deltaY > 0) {
      this.presentationMode = false;
    }
  }

  togglePresentationMode() {
    this.presentationMode = !this.presentationMode;
  }

  onActivate(_event: any): void {
    if (this.contentArea != null) {
      this.contentArea.nativeElement.scrollTop = 0;
    }
  }

  getCopyrightNotice() {
    let y = new Date().getFullYear();
    return `© 2023${y === 2023 ? '' : ` - ${y}`}, Yegor Pelykh. All rights reserved. Copying without permission is prohibited.`;
  }

}
