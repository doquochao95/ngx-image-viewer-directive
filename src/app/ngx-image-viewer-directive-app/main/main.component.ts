import { Component } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

export class MainComponent {
    imgs: string[] = [
        '/assets/img/example-path.png',
        '/assets/img/preview-detail.png',
        '/assets/img/preview-file.png',
    ]
    constructor() {}
}
