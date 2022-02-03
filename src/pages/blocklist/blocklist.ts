import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

/**
 * Generated class for the BlocklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blocklist',
  templateUrl: 'blocklist.html',
})
export class BlocklistPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    public alertCtrl: AlertController) {
  }
 private token =localStorage.getItem('access-token-illTip');
 public userid=localStorage.getItem("loginuserId");
 url:any;
 friendlist:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad BlocklistPage');
    this.url=this.webservice.apiUrl+'uploads/users/';
    this.getblocklist()
  }

  getblocklist(){
    this.webservice.presentLoading();
    this.webservice.blocklist(this.token).then((response:any)=>{
      this.webservice.hideLoader();
      console.log('block list',response)
      if(response.success){
        this.friendlist=response.data;
      }else{
        console.log(response); 
        this.webservice.presentToast("Block list is empty");
        this.friendlist=[]
      }
      

    }, (error) => {
      this.webservice.hideLoader();
       console.log("error ts: ", error);
      })
  }

  /////// REMOVE FRIENDLIST /////
  unblock(id){
  this.confirmremove(id)
 }

 confirmremove(id){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to unblock this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let data ={
              'user_id':this.userid, 
              'block_id':id
            }
            //this._utilityService.showLoading();
            console.log(data);
            
           
               this.webservice.unblockuser(data,this.token).then((response:any) => {
                 //this._utilityService.hideLoading();
                 console.log('remove friend',response)
                 if(response.success){
                  this.webservice.presentToast("User is remove from Blocklist");
                  this.getblocklist()
                  //this.friendlist=[]
                 }else{
                  console.log("Block list is empty"); 
                  this.friendlist="";
                  //this._utilityService.displayToast("Block list is empty");
                 }
         
               }, (error) => {
                    //this._utilityService.hideLoading();
                   console.log("error ts: ", error);
             }
             )
          }
        }
      ]
    });
    alert.present();
 }

}
