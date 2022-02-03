import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';



@Component({
  selector: 'page-paymenthistory',
  templateUrl: 'paymenthistory.html',
})
export class PaymenthistoryPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  paymentList:any;

  paymentHistory:boolean = true;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private webservice: WebserviceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymenthistoryPage');
    this.getpaymentList();
  }

  getpaymentList(){
    this.webservice.presentLoading()
    this.webservice.paymenthistory(this.token).then((response:any) => {
    this.webservice.hideLoader();
    console.log("payment list",response); 
    if(response.success){ 
    this.paymentList=response.data
    console.log("this.paymentList",this.paymentList.length); 
    if(this.paymentList.length > 0) {
      this.paymentHistory = true;
    } else {
      this.paymentHistory = false;
    }
    }  
    }, (error) => {
      this.webservice.hideLoader();
    console.log("error ts: ", error);
    })
    }

}
