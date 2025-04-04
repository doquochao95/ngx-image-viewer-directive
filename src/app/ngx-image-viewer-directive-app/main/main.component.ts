import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent {
    imgs: string[] = [
        '/assets/image/example-path.png',
        '/assets/image/preview-detail.png',
        '/assets/image/preview-file.png',
    ]
    constructor() {}
}
