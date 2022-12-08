import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePassPageRoutingModule } from './change-pass-routing.module';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { ChangePassPage } from './change-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChangePassPageRoutingModule
  ],
  declarations: [
    ChangePassPage,
  ]
})
export class ChangePassPageModule { }
