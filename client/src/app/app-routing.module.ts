import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaunchListComponent } from './launch-list/launch-list.component';

const routes: Routes = [
  { path: '', component: LaunchListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
