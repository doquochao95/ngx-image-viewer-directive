import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageViewerContainerComponent } from './components/image-viewer-container/image-viewer-container.component';
import { ImageViewerDirective } from './directives/image-viewer.directive';

@NgModule({
    imports: [
        CommonModule,
        NgOptimizedImage,
    ],
    declarations: [ImageViewerContainerComponent, ImageViewerDirective],
    exports: [ImageViewerContainerComponent, ImageViewerDirective]
})
export class ImageViewerModule { }
