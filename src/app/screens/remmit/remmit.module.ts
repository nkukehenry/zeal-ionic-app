import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemmitPageRoutingModule } from './remmit-routing.module';
import { RemmitPage } from './remmit.page';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RemmitPageRoutingModule
  ],
  declarations: [
    RemmitPage,
  ]
})
export class RemmitPageModule { }
