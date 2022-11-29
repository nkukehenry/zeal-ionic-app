import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule, Storage} from '@ionic/storage-angular'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import { Drivers } from '@ionic/storage';
import { StatusModalComponent } from './components/status-modal/status-modal.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AppHttpInterceptor } from './shared/app-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StatusModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    IonicStorageModule.forRoot({
      name: 'zealpesa',
      driverOrder: [Drivers.IndexedDB] // , Drivers.LocalStorage
    })
  ],
  providers: [
    Storage,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
  
})
export class AppModule {}
