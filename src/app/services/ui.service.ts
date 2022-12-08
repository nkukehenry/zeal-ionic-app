import { Inject, Injectable } from '@angular/core';
import { Toast } from '@awesome-cordova-plugins/toast/ngx';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { StatusModalComponent } from '../components/status-modal/status-modal.component';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private toast:Toast,
    private alertController: AlertController,
    private modalController: ModalController,
    public loadingController: LoadingController) { }

  public async showToast(msg:any) {

    this.toast.show(msg, '5000', 'center').subscribe(
      (toast:any) => {/*shown */ }
    );

  }

  showLoader(msg = 'Please wait...') {
    this.loadingController.create({
      message:msg,
      cssClass:'loading',
      showBackdrop: true,
      mode: 'ios',
      keyboardClose: true
    }
    ).then((res) => {
      this.loadingController.getTop().then(
        (v) => v ? res.present() : res.present());
      res.onDidDismiss().then((dis) => {
      });
    });
  }

  async hideLoader() {
    try {
      await this.loadingController.dismiss();
    } catch (error) {
      //
    }
  }

  async showAlert(message:any, title = null) {

    try {
      await this.alertController.dismiss();
    } catch (err) {
      //surpress
    }

    const alert = await this.alertController.create({
      mode: 'ios', message, header: (title) ? title : 'Attention!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //
          }
        }
      ]
    });
    await alert.present();
  }

  async statusModal(message:any, success = true) {

    const status = { status: success, message:message };

    const modal = await this.modalController.create({
      component: StatusModalComponent,
      componentProps:  status,
      cssClass: 'status-modal'
    });
    await modal.present();
  }


}
