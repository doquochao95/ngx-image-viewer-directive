# ngx-explorer-sdteam

## Preview <a></a>

A version inherits from [ngx-explorer](https://github.com/artemnih/ngx-explorer).

-   Image preview
-   Right click context menu
-   Read-only mode
-   Asynchronous upload progress bar
-   One-click treeview
-   Observable callback function
-   File link generation

[DEMO](https://doquochao95.github.io/ngx-explorer)

**Icon View**
![explorer](image/preview-file.png)

**Detail View**
![explorer](image/preview-detail.png)

## Quick Start <a></a>

-   Install package

```
yarn add ngx-explorer-sdteam
```

-   Implement `IDataService` provider interface

```Typescript
import { IDataService } from 'ngx-explorer-sdteam';

export class MainComponent implements IDataService<ExampleNode> {
    ...
}
```

-   Add `NgxExplorerModule` and data provider to `NgModule`

```Typescript
import { MainComponent } from './main/main.component';
import { NgxExplorerModule, DataService } from 'ngx-explorer-sdteam';

@NgModule({
    imports: [
        ...
        NgxExplorerModule
    ],
    exports: [],
    declarations:[MainComponent],
    providers: [
        { provide: DataService, useClass: MainComponent }
    ]
})
export class AppModule { }
```

-   Add Style to `angular.json`

```Json
"styles": [
    "node_modules/ngx-explorer-sdteam/src/assets/icons/css/txt.css"
],
```

-   Add to `.html`

```html
<nxe-explorer></nxe-explorer>
```

### Available attribute

| Attribute          | Type      | Default    | Description                                                      |
| :----------------- | :-------- | :--------- | :--------------------------------------------------------------- |
| `read-only`        | `boolean` | `false`    | Explorer work on read only mode (Open Folder/Download File only) |
| `auto-refresh`     | `boolean` | `false`    | Explorer will be refreshed automatically                         |
| `refresh-interval` | `number`  | `10000`    | Interval between refreshes                                       |
| `offset-top`       | `number`  | `0`        | Right click context menu offset from top                         |
| `offset-right`     | `number`  | `0`        | Right click context menu offset from right                       |
| `offset-bottom`    | `number`  | `0`        | Right click context menu offset from bottom                      |
| `offset-left`      | `number`  | `0`        | Right click context menu offset from left                        |
| `main-node`        | `string`  | `"Files"`  | Root folder name                                                 |
| `view-type`        | `string`  | `"Detail"` | Default explorer view type                                       |

**Example**

```html
<nxe-explorer main-node="home" 
              [read-only]="true" 
              [offset-left]="30" 
              [offset-right]="48" 
              [offset-top]="126" 
              [offset-bottom]="80"> 
</nxe-explorer>
```

### Main function

| Function        | Description                           |
| :-------------- | :------------------------------------ |
| `New Folder`    | Create a new folder on recent path    |
| `Upload File`   | Open a dialog to select uploaded file |
| `Download File` | Download selected files               |
| `Rename`        | Rename selected item                  |
| `Delete`        | Delete selected item                  |
| `Copy Path`     | Copy recent path                      |
| `Generate Link` | Generate a link to selected item      |

**Copy Path**

Path Format : `Home/Music/Classical`

**Generate Link**

Link Format : `.../file-explorer?filter=Home%2FMusic%2FClassical`

```Typescript
import { ExampleNode, IDataService, HelperService } from 'ngx-explorer-sdteam';

export class MainComponent implements IDataService<ExampleNode> {
    filter: string;
    baseUrl: string = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
    constructor(
        private _activatedroute: ActivatedRoute,
        private _router: Router
    ) {
        this.filter = this._activatedroute.snapshot.queryParamMap.get('filter')
        this._router.events
            .pipe(filter((event: Event | RouterEvent) => event instanceof NavigationEnd))
            .subscribe(() => { delete this.filter });
    }
    getFilterString(): Observable<any> {
        return of(this.filter);
    }
    getBaseUrl(): Observable<any> {
        return of(`${this.baseUrl}#/file-explorer?filter=`);
    }
}
```

### SignalR

```Typescript
import { ExampleNode, IDataService, HelperService } from 'ngx-explorer-sdteam';

export class MainComponent implements IDataService<ExampleNode> {
    constructor(
    private service: FileManagerService,
    private helperService: HelperService,
    private signalRService: SignalRService,
  ) {
    this.signalRService.fileChangedEmitter
    .pipe(takeUntilDestroyed())
    .subscribe(() => {
        this.helperService.refreshExplorer()
    });
  }
}
```

## Usage <a></a>

### Database & API

Contact me for more detail (doquochao95@gmail.com)

### SPA

[Example file](https://github.com/doquochao95/ngx-explorer/blob/main/src/app/file-explorer/main/main.component.ts)
