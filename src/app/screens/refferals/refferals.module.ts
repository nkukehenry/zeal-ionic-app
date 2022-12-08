import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefferalsPageRoutingModule } from './refferals-routing.module';

import { RefferalsPage } from './refferals.page';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RefferalsPageRoutingModule
  ],
  declarations: [RefferalsPage]
})
export class RefferalsPageModule {}
