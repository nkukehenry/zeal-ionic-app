import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesPageRoutingModule } from './beneficiaries-routing.module';

import { BeneficiariesPage } from './beneficiaries.page';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BeneficiariesPageRoutingModule
  ],
  declarations: [BeneficiariesPage]
})
export class BeneficiariesPageModule {}
