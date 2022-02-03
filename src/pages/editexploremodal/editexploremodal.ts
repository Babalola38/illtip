import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { EditpostPage } from '../editpost/editpost';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditexploremodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-editexploremodal',
  templateUrl: 'editexploremodal.html',
})
export class EditexploremodalPage {
  id = this.navParams.get('id');
  type = this.navParams.get('type');
  i = this.navParams.get('type');
  list = this.navParams.get('list');
  data = this.navParams.get('data');
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  backtohomepage = "homepage"

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alerCtrl: AlertController,
    private webservice: WebserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditexploremodalPage');
    console.log(this.data);
    console.log(this.list);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doEditPost() {
    this.navCtrl.push(EditpostPage,{"image":this.list});
  }

  doExplorePost() {
    this.navCtrl.push(ExplorePage,{"photolist": this.data})
  }

  doDeletePost(id,i,type) {
    if(type=='image'){
      this.delgalleryImage(id,i)
    }else{
      this.delgalleryVideo(id,i)
    }
  }



  delgalleryImage(id,i){ 
  
    let alert = this.alerCtrl.create({
      title: 'Are you sure you want to delete your image?',
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
            var count=0
            //this._utilityService.showLoading();
               this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
                 //this._utilityService.hideLoading();
                 console.log('remove friend',response)
                 if(response.success){
                  // this.photolist.splice(i,1)
                  // this.navCtrl.setRoot(HomePage, {'back':this.backtohomepage});
                  this.dismiss();
                  this.webservice.presentToast("You have successfully delete gallery image")
                 }else{
                  this.webservice.presentToast(response.message)
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
  
  delgalleryVideo(id,i){
    console.log('del')
    let alert = this.alerCtrl.create({
      title: 'Are you sure you want to delete your video?',
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
            //this._utilityService.showLoading();
            this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
                 //this._utilityService.hideLoading();
                 console.log('remove friend',response)
                 if(response.success){
                  //  this.photolist.splice(i, 1)
                  this.webservice.presentToast("You have successfully delete gallery video");
  
                 }else{
                  this.webservice.presentToast(response.message)
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
