import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SharePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-share-preview',
  templateUrl: 'share-preview.html',
})
export class SharePreviewPage {
  enlarge:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController) {
    this.enlarge =this.navParams.get('enlarge')
    console.log('this.enlarge',this.enlarge)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePreviewPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
