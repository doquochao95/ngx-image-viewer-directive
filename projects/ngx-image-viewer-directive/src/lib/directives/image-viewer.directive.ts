import { Directive, ElementRef, HostListener, Renderer2, ViewContainerRef } from '@angular/core';
import { ImageViewerContainerComponent } from '../components/image-viewer-container/image-viewer-container.component';

@Directive({
  standalone: false,
  selector: '[imageViewer]'
})
export class ImageViewerDirective {
  @HostListener('click', ['$event']) async onClick($event: any) {
    const imageUrl = $event.currentTarget.src
    let img = await this.processImage(imageUrl) as HTMLImageElement
    let container = this.viewContainerRef.createComponent(ImageViewerContainerComponent);
    container.instance.image = img;
    container.instance.componentRef = container
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'cursor', 'pointer')
  }
  @HostListener('mouseout') onMouseOut() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'cursor', 'default')
  }
  constructor(
    private elRef: ElementRef,
    private renderer2: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) { }

  private processImage(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }
}
