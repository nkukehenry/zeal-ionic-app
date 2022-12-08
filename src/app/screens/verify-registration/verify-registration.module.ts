import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyRegistrationPageRoutingModule } from './verify-registration-routing.module';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { VerifyRegistrationPage } from './verify-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VerifyRegistrationPageRoutingModule
  ],
  declarations: [
    VerifyRegistrationPage,
  ]
})
export class VerifyRegistrationPageModule { }
