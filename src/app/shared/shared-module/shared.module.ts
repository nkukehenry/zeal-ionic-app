import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Storage } from '@ionic/storage';
import { CurrencypairComponent } from 'src/app/components/currencypair/currencypair.component';
import { TransactionComponent } from 'src/app/components/transaction/transaction.component';
import { ForexService } from 'src/app/services/forex/forex.service';
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { ChannelSelectComponent } from 'src/app/components/channel-select/channel-select.component';
import { BankSelectComponent } from 'src/app/components/bank-select/bank-select.component';
import { ImageService } from 'src/app/services/image.service';
import { PurposeSelectComponent } from 'src/app/components/purpose-select/purpose-select.component';
import { SourceSelectComponent } from 'src/app/components/source-select/source-select.component';
import { TranDetailComponent } from 'src/app/components/trandetail/trandetail.component';
import { PricesService } from 'src/app/services/prices.service';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TranferOptionSelectComponent } from 'src/app/components/tranferoption-select/tranferoption-select.component';

@NgModule({
  declarations: [
    CurrencypairComponent,
    TransactionComponent,
    IntroComponent,
    ChannelSelectComponent,
    BankSelectComponent,
    PurposeSelectComponent,
    SourceSelectComponent,
    TranDetailComponent,
    TranferOptionSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  
  providers:[
    Storage,
    AuthenticationService,
    ForexService,
    ImageService,
    PricesService
  ],
  exports: [
    CurrencypairComponent,
    TransactionComponent,
    IntroComponent,
    ChannelSelectComponent,
    BankSelectComponent,
    PurposeSelectComponent,
    SourceSelectComponent,
    TranDetailComponent,
    TranferOptionSelectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class SharedModule { }
