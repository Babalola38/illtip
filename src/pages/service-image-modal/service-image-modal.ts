import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the ServiceImageModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-service-image-modal',
  templateUrl: 'service-image-modal.html',
})
export class ServiceImageModalPage {
  serviceImage:any
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    
    public viewCtrl:ViewController,) {
    this.serviceImage=this.navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceImageModalPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
