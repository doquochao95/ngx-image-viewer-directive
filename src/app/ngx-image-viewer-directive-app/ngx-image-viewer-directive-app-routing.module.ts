import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'File Explorer'
        },
        component: MainComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NgxImageViewerDirectiveAppRoutingModule { }
