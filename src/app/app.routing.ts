import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ngx-image-viewer-directive-app',
        pathMatch: 'full',
    },
    {
        path: 'ngx-image-viewer-directive-app',
        loadChildren: () => import('./ngx-image-viewer-directive-app/ngx-image-viewer-directive-app.module').then(m => m.NgxImageViewerDirectiveAppModule),
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    { path: '**', component: P404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
