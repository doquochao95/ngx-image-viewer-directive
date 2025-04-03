import { ImageViewerModule } from './../../../projects/ngx-image-viewer-directive/src/lib/image-viewer.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { NgxImageViewerDirectiveAppRoutingModule } from './ngx-image-viewer-directive-app-routing.module';

@NgModule({
    imports: [
        NgxImageViewerDirectiveAppRoutingModule,
        FormsModule,
        CommonModule,
        ImageViewerModule
    ],
    exports: [],
    declarations: [MainComponent]
})
export class NgxImageViewerDirectiveAppModule { }
