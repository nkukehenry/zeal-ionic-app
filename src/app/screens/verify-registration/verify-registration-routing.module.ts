import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyRegistrationPage } from './verify-registration.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyRegistrationPageRoutingModule { }
