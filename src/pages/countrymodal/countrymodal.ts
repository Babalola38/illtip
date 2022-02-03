import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

/**
 * Generated class for the CountrymodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-countrymodal',
  templateUrl: 'countrymodal.html',
})
export class CountrymodalPage {

  country:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicepagemodalPage');

    fetch('../assets/country/countrycode.json').then(res => res.json()).then(json => {
      console.log("service list=",json);
      this.country = json
    });
  }

 

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doCountry(data) {
    console.log("service=",data);
    this.events.publish('country', data);
    this.viewCtrl.dismiss();
  }

}
