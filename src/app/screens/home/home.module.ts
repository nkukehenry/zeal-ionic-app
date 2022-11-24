import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { CurrencypairComponent } from 'src/app/components/currencypair/currencypair.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule { }
