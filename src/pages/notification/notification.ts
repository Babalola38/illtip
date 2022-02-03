import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  public userid=localStorage.getItem("loginuserId");
  public token = localStorage.getItem('access-token-illTip');
  notifictionData:any;

  viewNotification:boolean;

  myDate: Date = new Date();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    console.log("this.myDate=",this.myDate);

    this.NotificationList()

    this.clearnoti()
  }

  NotificationList(){
    console.log("coming notification section");
    
    this.webservice.presentLoading();
      this.webservice.getData('services/notificationlist/'+'?token='+ this.token,).then((res:any) => {

    this.webservice.hideLoader();
    console.log("Notification list",res); 
    if(res.statusCode == 400) {
      this.viewNotification = false;
    }else {
      this.viewNotification = true;
      if(res.success){ 
        this.notifictionData=res.data
        console.log("response Notifiction Data list",this.notifictionData); 
      } 
    } 

    }, (error) => {
    this.webservice.hideLoader();
    console.log("error ts: ", error);
    })
    }



    clearnoti(){ 
      let data={
        'userid':this.userid
      }
      //this._utilityService.showLoading();
    this.webservice.postData('users/updatenotification'+'?token='+ this.token,data).then((response:any) => {
        //this._utilityService.hideLoading();
        console.log("del", response); 
      }, (error) => {
         this.webservice.hideLoader();
          console.log("error ts: ", error);
      })
    }



    /// SERVICE DETAILS ////
goToDetails(id,lati,long){
  console.log('id',id)
  this.navCtrl.push(DetailPage,{'id':id,'lati':lati,'long':long})
}

}
