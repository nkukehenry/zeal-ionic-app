import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForexPageRoutingModule } from './forex-routing.module';
import { ForexPage } from './forex.page';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { CurrencypairComponent } from 'src/app/components/currencypair/currencypair.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ForexPageRoutingModule,
  ],
  declarations: [
    ForexPage
  ]
})
export class ForexPageModule { }
