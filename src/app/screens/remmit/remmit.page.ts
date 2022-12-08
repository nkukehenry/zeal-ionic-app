import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem, MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { BankSelectComponent } from 'src/app/components/bank-select/bank-select.component';
import { ChannelSelectComponent } from 'src/app/components/channel-select/channel-select.component';
import { IntroComponent } from 'src/app/components/intro/intro.component';
import { PurposeSelectComponent } from 'src/app/components/purpose-select/purpose-select.component';
import { SourceSelectComponent } from 'src/app/components/source-select/source-select.component';
import { TranferOptionSelectComponent } from 'src/app/components/tranferoption-select/tranferoption-select.component';
import { DataService } from 'src/app/services/data.service';
import { ImageService } from 'src/app/services/image.service';
import { TransactService } from 'src/app/services/transact/transact.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-remmit',
  templateUrl: './remmit.page.html',
  styleUrls: ['./remmit.page.scss'],
})
export class RemmitPage implements OnInit {

  data: any = {splits:[]};
  remmitPair:any  = {};
  accounts:any = [];
  transferOptions:any=[];
  isSelling:Boolean = false;
  filePreview = "../../../assets/images/file_add.webp";
  attachment:any;

  constructor(
    private router: Router,
    private uiService: UiService,
    private dataService: DataService,
    private transactionService: TransactService,
    private modalController:ModalController,
    private imageService: ImageService

  ) { }

  ngOnInit() {
     this.isSelling = this.remmitPair?.isSelling;
  }
  
    async showBankSelectModal(){
  
      const  modal = await this.modalController.create({
        component:IntroComponent
      });
  
      await modal.onWillDismiss();

    }



  calculateEquivalent(){
    return this.data.amount;
  }


  getEquivalentLabel(){
      return "USD";
  }

  getBaseLabel(){
     return "UGX";
  }


  
  //chose Item from Modal list
  async chooseChannel(isDisburse=false){

    if(!this.data.amount){
      this.uiService.showAlert("Please provide amount first");
      return;
    }

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

    console.log(item);
    
     if(!isDisburse){
       this.data.channel =item;
       this.accounts = this.dataService.accounts.filter( (itm:any)=>(itm.account_type_id == item.id && parseInt(itm.can_receive)==1));
       this.transferOptions = this.data.channel.transfer_options;

       if(parseInt(item.requires_pickup_identity)===1){
        this.data.requirePickup;
        this.data.disburseAccount = {account_no:'Pickup'};
       }

     }else{
      this.data.disburseChannel =item;
     }

     
   }

   async choosePurpose(){

    if(!this.data.channel){
      this.uiService.showAlert("Please choose how you want to send funds first!");
      return;
    }



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

    if(!this.data.channel){
      this.uiService.showAlert("Please choose how you want to send funds first!");
      return;
    }


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

    if(!this.data.channel){
      this.uiService.showAlert("Please choose how you want to send funds first!");
      return;
    }

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

    if(!this.data.funds_source){
      this.uiService.showAlert("Please choose source of funds first!");
      return;
    }

    const image  = await this.imageService.getPhoto() as string;

    this.filePreview = image;

    const blob = this.imageService.base64toBlob(image);
    //console.log(blob);
    this.attachment = blob;

   }

   submitOrder(){

    this.uiService.showLoader('Submitting request');


    var proofOfTransfer = document.querySelector('input[type="file"]')

    let order = {
      booked_price:this.data.bookedPrice ,
      transfer_type_id:this.data.tranferOption.id,
      bank_account_id:this.data.account.id,
      funds_source:this.data.funds_source.id,
      amount:this.data.amount
    }


    if(this.data.splits.length === 0){
     
      let split = {
        account_type_id:this.data.disburseChannel.id,
        bank_id:this.data.disburseBank.id,
        account_no:this.data.disburseAccount,
        amount:this.data.amount,
        funds_purpose:this.data.funds_purpose.id
      }

      this.data.splits.push(split);
    }


    if(!this.attachment){
      this.uiService.showAlert("Please attach proof of funds tranfer");
      return;
    }

    if(!this.data.account){
         this.uiService.showAlert("Please Choose a bank where you are sending the money");
        return;
      }


    if(!this.data.tranferOption){
      this.uiService.showAlert("Please Provide a transfer Option");
        return;
      }
    
    if((this.data.splits.length<1)){
        this.uiService.showAlert( "Please provide how you want to receive your funds");
        return;
    }

    let request = {
      order:order,
      attachment:this.filePreview,
      splits:this.data.splits
    }

    this.transactionService.postOrder(request).subscribe(response=>{
      this.uiService.hideLoader();

      if(response.is_error){
        //failure
        this.uiService.showAlert(response.message);
      }else{
        //success
        this.uiService.showAlert(response.message);

        setTimeout(() => {
            this.router.navigate(['tabs/tabs/history']);
          }, 3000);
      }

    },error=>{
      this.uiService.hideLoader();
      this.uiService.statusModal('Error Ocuured, try again',false);
    });

   }

  
}
