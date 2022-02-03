import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the MyWorksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-works',
  templateUrl: 'my-works.html',
})
export class MyWorksPage {

  public token = localStorage.getItem('access-token-illTip');
  myworkList:any;

  workdone:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWorksPage');
    this.getMypostList()
  }


  getMypostList(){
    console.log("coming...");
    
    this.webservice.presentLoading();
    this.webservice.getData('services/myworks/'+'?token='+ this.token).then((response:any) => {
        this.webservice.hideLoader();
        console.log("response mywork list", response); 
      
        if(response.success){ 
          if(response.data.length==0){
            this.workdone = false; 
            console.log('You have not apply for any service yet, your application will show up here when applied')
            this.webservice.presentToast('You have not applied for any service yet, your application will show up here when applied');
          }else{
            this.workdone = true;
            this.myworkList=response.data
            console.log("this.myworkList=",this.myworkList); 
          }
        }  
      }, (error) => {
         this.webservice.hideLoader();
          console.log("error ts: ", error);
  })
  }





  // Deletemywork(id){
  //   console.log('work id',id)
  // }



  Deletemywork(id) {
    let data={
      'id':id
    }
    let alert = this.alertCtrl.create({
      title: 'Are you want to delete your work ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
  
          
            this.webservice.presentLoading();
  
              // let params = { "associateId": id}
                this.webservice.delmywork(this.token,data).then((response:any) => {
                  this.webservice.hideLoader();
                  console.log(response);
                  if(response.success == true){
                    this.getMypostList();
                    this.webservice.presentToast("Successfully deleted!");
                  }
  
                })
          }
        }
      ]
    });
    alert.present();
  }



  goToDetails(id,lati,long){
    console.log('id',id)
    this.navCtrl.push(DetailPage,{'id':id,'lati':lati,'long':long})
  }





  jobcomplete(id){
    console.log(id)
    this.webservice.markcomplete(this.token,id).subscribe((response) => {
      //this._utilityService.hideLoading();
      console.log(response);
      if(response.success == true){
            //this.getMypostList();
            console.log("response completed", response); 
           this.webservice.presentToast("Your payment sucessfully Done");
           this.getMypostList()
      }
  })
  
  }

}
