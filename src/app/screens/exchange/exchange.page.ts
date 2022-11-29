import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { BankSelectComponent } from 'src/app/components/bank-select/bank-select.component';
import { ChannelSelectComponent } from 'src/app/components/channel-select/channel-select.component';
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { PurposeSelectComponent } from 'src/app/components/purpose-select/purpose-select.component';
import { SourceSelectComponent } from 'src/app/components/source-select/source-select.component';
import { TranferOptionSelectComponent } from 'src/app/components/tranferoption-select/tranferoption-select.component';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';
import { TransactService } from 'src/app/services/transact/transact.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

  data: any = {splits:[]};
  exchangePair:any  = {};
  accounts:any = [];
  transferOptions:any=[];
  isSelling:Boolean = false;
  filePreview = "../../../assets/images/file_add.webp";
  attachment:any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private uiService: UiService,
    private dataService: DataService,
    private transactionService: TransactService,
    private modalController:ModalController,
    private imageService: ImageService

  ) { }

  ngOnInit() {
     this.exchangePair = this.dataService.exchangePair;
     this.isSelling = this.exchangePair?.isSelling;

     console.log(this.exchangePair);
  }
  
    async showBankSelectModal(){
  
      const  modal = await this.modalController.create({
        component:IntroComponent
      });
  
      await modal.onWillDismiss();

    }



  calculateEquivalent(){

    if(this.exchangePair.isSelling){
      this.data.equivalent  = this.exchangePair.selling_price * this.data.amount;
      this.data.bookedPrice = this.exchangePair.selling_price;
    }
    else{
      this.data.equivalent = this.data.amount/this.exchangePair.buying_price;
      this.data.bookedPrice = this.exchangePair.buying_price;
    }

  }


  getEquivalentLabel(){
      return (this.exchangePair.isSelling)?this.exchangePair.base_currency.code:this.exchangePair.quote_currency.code;
  }

  getBaseLabel(){
     return (this.exchangePair.isSelling)?this.exchangePair.quote_currency.code:this.exchangePair.base_currency.code;
  }


  
  //chose Item from Modal list
  async chooseChannel(isDisburse=false){

    let channels = (isDisburse)?this.dataService.accountTypes.filter( (ch:any)=>parseInt(ch.can_disburse)==1):this.dataService.accountTypes.filter( (ch:any)=>parseInt(ch.can_receive)==1);

    let modal = await this.modalController.create({
      component: ChannelSelectComponent,
      cssClass:'item-select',
      componentProps:{channels:channels }
    });
   
    await modal.present();
    const { data } = await modal.onWillDismiss();
    //console.log(data)

    if(data.data?.id)
     this.onChannelSelected(data.data,isDisburse);

  }


  onChannelSelected(item:any,isDisburse:boolean){
    
     if(!isDisburse){
       this.data.channel =item;
       this.accounts = this.dataService.accounts.filter( (itm:any)=>(itm.account_type_id == item.id && parseInt(itm.can_receive)==1));
       this.transferOptions = this.data.channel.transfer_options;

     }else{
      this.data.disburseChannel =item;
     }
   }

   async choosePurpose(){


    let modal = await this.modalController.create({
      component: PurposeSelectComponent,
      cssClass:'item-select',
      componentProps:{purposes: this.dataService.fundPurposes}
    });
   
    await modal.present();
    const { data } = await modal.onWillDismiss();


    if(data)
     this.data.funds_purpose = data.data;
    
   }

   async chooseFundsSource(){


    let modal = await this.modalController.create({
      component: SourceSelectComponent,
      cssClass:'item-select',
      componentProps:{sources: this.dataService.fundSources}
    });
   
    await modal.present();
    const { data } = await modal.onWillDismiss();


    if(data)
     this.data.funds_source = data.data;
    
   }

  
  //chose Item from Modal list
  async chooseBank(isDisburse=false){

    let banks = (isDisburse)?this.dataService.banks.filter( (item:any)=>parseInt(item.type.can_disburse)==1 && (item.account_type_id==this.data.channel.id)):this.dataService.banks.filter( (item:any)=>parseInt(item.type.can_disburse)==1 && (item.account_type_id==this.data.channel.id));

    let modal = await this.modalController.create({
      component: BankSelectComponent,
      cssClass:'item-select',
      componentProps:{banks: banks}
    });
   
    await modal.present();
    const { data } = await modal.onWillDismiss();
    //console.log(data)

    if(data.data?.id)
     this.onBankSelected(data.data,isDisburse);
    
  }

  onBankSelected(item:any,isDisburse:boolean){
    
    if(!isDisburse){
      this.data.bank =item;
      
      }else{
      this.data.disburseBank = item;
      }

   }

   
   async chooseTransferOption(){

    console.log(this.transferOptions);

    let modal = await this.modalController.create({
      component: TranferOptionSelectComponent,
      cssClass:'item-select',
      componentProps:{tranferoptions:this.transferOptions}
    });
   
    await modal.present();
    const { data } = await modal.onWillDismiss();


    if(data)
     this.data.tranferOption = data.data;
    
   }

  chooseZealAccount(account:any){

    console.log(account);

    this.data.account = account;

    this.accounts.forEach( (elem:any) => {
       
      if(elem.id === account.id){
        elem.selected=true;
       }else{
        elem.selected=false;
       }

    });

    console.log(this.accounts);

   }

   async getImage(){

    const image  = await this.imageService.getPhoto() as string;

    this.filePreview = image;

    const blob = this.imageService.base64toBlob(image);
    //console.log(blob);
    this.attachment = blob;

   }

   submitOrder(){

    this.uiService.showLoader('Submitting request');

    let postData = new FormData();

    let order = {
      type:(this.exchangePair.isSelling)?"sell":"buy",
      currency_pair:(this.exchangePair.isSelling)?this.exchangePair.selling_price:this.exchangePair.buying_price,
      booked_price:this.data.bookedPrice ,
      transfer_type_id:this.data.tranferOption.id,
      bank_account_id:this.data.account.id,
      funds_source:this.data.funds_source.id
    }

    postData.append('attachment', this.attachment);
    postData.append('order', JSON.stringify(order));
    postData.append('splits',JSON.stringify(this.data.splits));

    this.transactionService.postOrder(postData).subscribe(response=>{
      this.uiService.hideLoader();

      console.log(response);

      if(response.is_error){
        this.uiService.statusModal(response.message,false);
      }else{
        this.uiService.statusModal('Order Submitted successfully',false);
      }

    },error=>{
      this.uiService.hideLoader();
      this.uiService.statusModal('Error Ocuured, try again',false);
    });

   }

 

  
}
