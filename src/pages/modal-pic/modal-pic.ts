import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-pic',
  templateUrl: 'modal-pic.html',
})
export class ModalPicPage {

  url : any = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl : ViewController,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPicPage');
    this.url = this.navParams.get('url');
  }
  
   closeModal() {
    // this.view.dismiss();
    this.viewCtrl.dismiss();
    console.log("called closeModal")
    const onClosedData: string = "Wrapped Up!";
  }

  
}
