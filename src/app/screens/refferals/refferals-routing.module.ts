import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefferalsPage } from './refferals.page';

const routes: Routes = [
  {
    path: '',
    component: RefferalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefferalsPageRoutingModule {}
