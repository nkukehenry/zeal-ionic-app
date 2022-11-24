import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Storage } from '@ionic/storage';
import { CurrencypairComponent } from 'src/app/components/currencypair/currencypair.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ForexService } from 'src/app/services/forex/forex.service';

@NgModule({
  declarations: [
    CurrencypairComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  
  providers:[
    Storage,
    AuthenticationService,
    ForexService
  ],
  exports: [
    CurrencypairComponent,
    TransactionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class SharedModule { }
