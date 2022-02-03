import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  report:any={}
  public token = localStorage.getItem('access-token-illTip');
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }


  doReport(){
    // let re = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("report",this.report)
    if(!this.report.type){
        console.log("1")
       this.webservice.presentToast("Please select your report type");
    }else if(!this.report.email){
      console.log("2")
       this.webservice.presentToast("Please select your report type");
    }else if(reg.test(this.report.email) == false){
      console.log("3")
      this.webservice.presentToast("Invalid email id");
    }else if(!this.report.report){
      console.log("4")
      this.webservice.presentToast("Plaese enter your report description");
    }else if(this.report.report.trim() == ""){
      console.log("5")
       this.webservice.presentToast("Please enter a valid job description");
    }else if(this.report.report.length < 10){
      console.log("6")
      this.webservice.presentToast("Description minimum 10 characters");
    }
    else{
        this.webservice.presentLoading();
        let data={
        "type":this.report.type,
        "email":this.report.email,
        "report":this.report.report
        }
        console.log('data',data)
          this.webservice.postData('users/sendreport/'+'?token='+ this.token,data).then((response:any) => {

          console.log("Report response : ", response);
          this.webservice.hideLoader();

          if(response.success == true){    

          this.webservice.presentToast("Report successfully submitted");  
          this.app.getActiveNav().pop()
            
          }else{
          this.webservice.presentToast(response.message);
          }
          }, (error) => {
          console.log("error ts: ", error);
          })
    }
    
  }

}
