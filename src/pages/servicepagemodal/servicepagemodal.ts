import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';


/**
 * Generated class for the ServicepagemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-servicepagemodal',
  templateUrl: 'servicepagemodal.html',
})
export class ServicepagemodalPage {

  service:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicepagemodalPage');

    fetch('../assets/service/service.json').then(res => res.json()).then(json => {
      console.log("service list=",json);
      this.service = json
    });
  }

 

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doService(data) {
    console.log("service=",data);
    this.events.publish('service', data);
    this.viewCtrl.dismiss();
  }


}
