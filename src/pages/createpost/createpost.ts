import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Events } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { LoaderPage } from '../loader/loader';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the CreatepostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatepostPage {

  uploadData;any={};
  upload:any={};
  shareImage:any;
  base64Data:any;
  converted_image:any;
  public token = localStorage.getItem('access-token-illTip');

  backtoprofilepage:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
    private webservice:WebserviceProvider,
    public events: Events) {
    this.uploadData = this.navParams.get('res');
    // this.shareImage = this.sanitizer.bypassSecurityTrustUrl(this.uploadData.upload)
    this.shareImage = this.uploadData.captureImage

    console.log('this.uploadData',this.uploadData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatepostPage');

    this.events.subscribe('backtoprofilepage', backtoprofilepage =>{
      console.log(backtoprofilepage);
      this.backtoprofilepage = backtoprofilepage; 
    });
  }

  ADD(){
    if(this.upload.title.length >130){
       this.webservice.presentToast("Title should not exceed 130 characters");
     }else{
       console.log(this.upload)
       let data={
         'imageData':this.uploadData.imageData,
         'title':this.upload.title,
         //'description':this.upload.description,
         'uploadType':this.uploadData.uploadType
       }
       console.log("upload data=",data);
       
       let loader = this.modalCtrl.create(LoaderPage, {"res": data});
         loader.present();  
         this.upload.title="";
         this.upload.description="";
         loader.onDidDismiss((userdata) => {
           console.log('dismis 71',userdata)
           if(!data){
             //localStorage.removeItem('imageview')
           }else{ 
            //  this.viewCtrl.dismiss(userdata);
            this.viewCtrl.dismiss();
           }
          
         });
  }
  }

  // discard(){
  //   this.viewCtrl.dismiss();
  // }


  doBacktoprofilepage() {
    // this.navCtrl.setRoot(ProfilePage);
    this.viewCtrl.dismiss();
  }

}
