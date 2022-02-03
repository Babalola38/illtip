import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the LanguagemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-languagemodal',
  templateUrl: 'languagemodal.html',
})
export class LanguagemodalPage {

  language:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagemodalPage');

    fetch('../assets/language/language.json').then(res => res.json()).then(json => {
      console.log("language list=",json);
      this.language = json
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doCountry(data) {
    console.log("English");
    this.events.publish('language', data);
    this.viewCtrl.dismiss();
  }

}
