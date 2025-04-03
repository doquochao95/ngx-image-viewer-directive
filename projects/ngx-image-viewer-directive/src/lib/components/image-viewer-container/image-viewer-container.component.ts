import { Component, HostBinding, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ComponentRef, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger, animateChild, query, state } from '@angular/animations';

@Component({
  selector: 'image-viewer-container',
  standalone: false,
  templateUrl: './image-viewer-container.component.html',
  styleUrls: ['./image-viewer-container.component.scss'],
  animations: [
    trigger('host', [
      transition(':leave', [
        query('@backdrop', [
          animateChild()
        ])
      ]),
      transition(':enter', [
        query('@backdrop', [
          animateChild()
        ])
      ]),
    ]),
    trigger('reset', [
      state('false', style({ transform: 'scale(1)' })),
      state('true', style({ transform: 'scale(1.05)' })),
      transition('false => true', animate('200ms ease-in')),
      transition('true => false', animate('200ms ease-out'))
    ]),
    trigger('backdrop', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('230ms ease-in', style({
          opacity: 0,
        }))
      ]),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('230ms ease-in', style({
          opacity: 1,
        }))
      ]),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ImageViewerContainerComponent implements AfterViewInit {
  componentRef: ComponentRef<ImageViewerContainerComponent>;
  @HostBinding('@host') host: any;
  @ViewChild("image_wrapper", { static: true }) image_wrapper: ElementRef<HTMLElement>;
  @ViewChild("image_viewer", { static: true }) image_viewer: ElementRef<HTMLImageElement>;
  @ViewChild('image_debug', { static: true }) image_debug: ElementRef<HTMLCanvasElement>;
  resetState: boolean = false;
  zoomFactor: number = 6
  manualZoomDistance: number = 300
  scale: number = 1
  initScale: number = 1
  maxScale: number // = scale * zoomFactor
  minScale: number // = scale / zoomFactor
  accx: number = 0
  initAccx: number = 0
  accy: number = 0
  initAccy: number = 0
  isPanning: boolean = false;
  isDoubleTouch: boolean = false;
  maxScaleReached: boolean = false;
  minScaleReached: boolean = false;
  imageWidth: number = 0
  imageHeight: number = 0
  imageOffset: number = 0.9
  startX: number = 0;
  startY: number = 0;
  image: HTMLImageElement
  screenWidth: number;
  screenHeight: number;
  constructor(private cdr: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.imageWidth = this.image_viewer.nativeElement.width
    this.imageHeight = this.image_viewer.nativeElement.height
    this.cdr.detectChanges();
  }
  close = () => this.componentRef.destroy()
  alignCenterImage() {
    let imageWidth = this.image_viewer.nativeElement.width
    let imageHeight = this.image_viewer.nativeElement.height
    if (imageWidth >= this.screenWidth * this.imageOffset && imageHeight >= this.screenHeight * this.imageOffset) {
      this.scale = Math.min(...[this.screenHeight, this.screenWidth]) * this.imageOffset / imageWidth
      imageWidth = imageWidth * this.scale
      imageHeight = imageHeight * this.scale
    } else {
      if (imageWidth >= this.screenWidth * this.imageOffset) {
        this.scale = this.screenWidth * this.imageOffset / imageWidth
        imageWidth = imageWidth * this.scale
        imageHeight = imageHeight * this.scale
      }
      if (imageHeight >= this.screenHeight * this.imageOffset) {
        this.scale = this.screenHeight * this.imageOffset / imageHeight
        imageWidth = imageWidth * this.scale
        imageHeight = imageHeight * this.scale
      }
    }
    this.accx = -imageWidth / 2
    this.accy = -imageHeight / 2
    this.maxScale = this.scale * this.zoomFactor
    this.minScale = this.scale / this.zoomFactor
    this.initAccx = this.accx
    this.initAccy = this.accy
    this.initScale = this.scale
    this.transformElement(10)
    // this.onDebugMode()
  }
  onDebugMode() {
    this.image_wrapper.nativeElement.style.border = 'red 4px solid'
    var ctx = this.image_debug.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    ctx.strokeStyle = "rgb(0, 128, 0)";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, this.imageWidth, this.imageHeight);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.imageWidth / 2, this.imageHeight / 2 - 20);
    ctx.lineTo(this.imageWidth / 2, this.imageHeight / 2 + 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.imageWidth / 2 - 20, this.imageHeight / 2);
    ctx.lineTo(this.imageWidth / 2 + 20, this.imageHeight / 2);
    ctx.stroke();
  }
  reset() {
    if (this.scale == this.initScale && this.accx == this.initAccx && this.accy == this.initAccy) {
      this.resetState = true
      return
    }
    this.scale = this.initScale;
    this.accx = this.initAccx
    this.accy = this.initAccy
    this.transformElement(200)
  }
  zoomWheel(e: WheelEvent) {
    e.preventDefault()
    this.handleZoom(e.offsetX, e.offsetY, e.deltaY, 50)
  }
  zoomIn() {
    this.handleZoom(this.screenWidth / 2, this.screenHeight / 2, -this.manualZoomDistance, 200, false)
  }
  zoomOut() {
    this.handleZoom(this.screenWidth / 2, this.screenHeight / 2, this.manualZoomDistance, 200, false)
  }
  onMousedown(e: any) {
    if (!this.isPanning) {
      this.isPanning = true;
      this.startX = e.clientX - this.accx;
      this.startY = e.clientY - this.accy;
    }
  }
  onMouseUp(): void {
    if (this.isPanning)
      this.isPanning = false;
  }
  onMouseLeave(): void {
    if (this.isPanning)
      this.isPanning = false;
  }
  onMouseMove(e: MouseEvent): void {
    if (this.isPanning) {
      this.accx = e.clientX - this.startX;
      this.accy = e.clientY - this.startY;
      this.transformElement(10)
    }
  }
  onTouchStart(e: TouchEvent): void {
    if (e.targetTouches.length == 1) {
      if (!this.isPanning) {
        this.isPanning = true;
        var touch = e.targetTouches[0];
        this.startX = touch.clientX - this.accx;
        this.startY = touch.clientY - this.accy;
      }
      if (!this.isDoubleTouch) {
        this.isDoubleTouch = true;
        setTimeout(() => this.isDoubleTouch = false, 300);
      } else {
        this.reset()
      }
    }
  }
  onTouchEnd(): void {
    if (this.isPanning)
      this.isPanning = false;
  }
  onTouchMove(e: TouchEvent): void {
    if (e.targetTouches.length == 1) {
      if (this.isPanning) {
        var touch = e.targetTouches[0];
        this.accx = touch.clientX - this.startX;
        this.accy = touch.clientY - this.startY;
        this.transformElement(10)
      }
    }
  }
  private handleZoom(posX: number, posY: number, distance: number, duration: number, onMouseWheel: boolean = true) {
    const zoomFactors = this.calculateZoomParam(posX, posY, distance, onMouseWheel)
    if (zoomFactors.scale > this.maxScale) {
      this.maxScaleReached = true
      return
    }
    if (zoomFactors.scale < this.minScale) {
      this.minScaleReached = true
      return
    }
    this.maxScaleReached = false
    this.minScaleReached = false
    this.accx = zoomFactors.accx
    this.accy = zoomFactors.accy
    this.scale = zoomFactors.scale
    this.transformElement(duration)
  }
  private calculateZoomParam(posX: number, posY: number, distance: number, onMouseWheel: boolean) {
    const scaleFac = distance / 1000
    const newScale = this.scale - scaleFac;
    const newAccx = onMouseWheel ? this.accx + posX * scaleFac : - this.imageWidth * newScale / 2
    const newAccy = onMouseWheel ? this.accy + posY * scaleFac : - this.imageHeight * newScale / 2
    return { scale: newScale, accx: newAccx, accy: newAccy }
  }
  private transformElement(duration: number) {
    this.image_viewer.nativeElement.style.transition = "all " + duration + "ms";
    this.image_debug.nativeElement.style.transition = "all " + duration + "ms";
    this.image_wrapper.nativeElement.style.transition = "all " + duration + "ms";
    this.image_debug.nativeElement.style.transform = `scale3D(${this.scale}, ${this.scale}, ${this.scale})`
    this.image_viewer.nativeElement.style.transform = `scale3D(${this.scale}, ${this.scale}, ${this.scale})`
    this.image_wrapper.nativeElement.style.transform = `translate(${this.accx}px, ${this.accy}px)`;
  }
}
