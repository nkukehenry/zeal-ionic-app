import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyLoginPage } from './verify-login.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyLoginPageRoutingModule { }
