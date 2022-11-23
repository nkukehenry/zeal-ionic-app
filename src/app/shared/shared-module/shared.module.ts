import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Storage } from '@ionic/storage';
import { StatusModalComponent } from 'src/app/components/status-modal/status-modal.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  
  providers:[
    Storage,
    AuthenticationService
  ],
  exports: [
  ]
})
export class SharedModule { }
