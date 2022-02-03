import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the GetStartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-get-started',
  templateUrl: 'get-started.html',
})
export class GetStartedPage {

  public token = localStorage.getItem('access-token-illTip');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetStartedPage');
  }

  GetStart() {

    // if(this.token ==null){
    //   this.navCtrl.push(HomePage);
    // }else{
    //   this.navCtrl.push(TabsPage);
    // }

    // this.navCtrl.push(TabsPage);
    this.navCtrl.push(HomePage);
  }

}
