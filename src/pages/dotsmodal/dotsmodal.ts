import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, AlertController } from 'ionic-angular';
import { EditpostPage } from '../editpost/editpost';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';

/**
 * Generated class for the DotsmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-dotsmodal',
  templateUrl: 'dotsmodal.html',
})
export class DotsmodalPage {

  user:any
  image:any;
  reportid:any

  public token = localStorage.getItem('access-token-illTip');
  public profilepic=localStorage.getItem('userImage')

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private webservice: WebserviceProvider,
    public app: App,
    public alerCtrl: AlertController,) {

     this.user = navParams.get('user');
     this.image = navParams.get('image');
     this.reportid = navParams.get('reportid');
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DotsmodalPage');
    console.log("user=",this.user);
    console.log("image=",this.image);
    console.log("reportid=",this.reportid);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  doEditPost() {
    this.navCtrl.push(EditpostPage,{"image":this.image});
  }

  doDeletePost(id,type) {
    console.log("id,type=",id,type);

    if(type=='image'){
      this.delgalleryImage(id)
    }else{
      this.delgalleryVideo(id)
    }
  }

  delgalleryImage(id){

    console.log("delete image=",id);
  
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
            // var count=0
            this.webservice.presentLoading();
                this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
                this.webservice.hideLoader();
                console.log('remove friend',response)
                this.webservice.presentToast("You have successfully delete gallery image")
                this.navCtrl.setRoot(HomePage)
               }, (error) => {
                this.webservice.hideLoader();
                console.log("error ts: ", error);
             }
             )
          }
        }
      ]
    });
    alert.present();
  }

  delgalleryVideo(id) {
    console.log("delete video=",id);

    console.log("delete image=",id);
  
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
            // var count=0
            this.webservice.presentLoading();
                this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
                this.webservice.hideLoader();
                console.log('remove friend',response)
                this.webservice.presentToast("You have successfully delete gallery video")
                this.navCtrl.setRoot(HomePage)
               }, (error) => {
                this.webservice.hideLoader();
                console.log("error ts: ", error);
             }
             )
          }
        }
      ]
    });
    alert.present();
  }



///// REPORT IMAGE ////



checkreport(gal_id) {
  if(this.token !=null){
    let checking = this.reportid.find(x => x.gal_id == gal_id);  
  if(!checking) {
    return true;
  } else {
    return false;
  }
  }
}



report(id){
  if(this.token==null){
    this.app.getRootNav().push('LoginOptionPage');
  }else{
    let data={
      'id':id
    }
    console.log('flag',data)
     this.webservice.presentLoading();

      this.webservice.getData('users/flagcontent10/'+id+'?token='+ this.token).then((response:any) => {
       console.log(response)
     this.webservice.hideLoader();
      setTimeout(()=>{
        if(response.success){ 
          if(response.message=="Report successfully"){
           this.AddReportAlart(response)
           document.getElementById('report_'+id).classList.remove('noFlag');
           document.getElementById('report_'+id).classList.add('isFlag');
          }else{
           this.RemoveReportAlart(response)
           document.getElementById('report_'+id).classList.remove('isFlag');
           document.getElementById('report_'+id).classList.add('noFlag');
          }
           }
      },500)
       //this.bacsicsearch()
    }, (error) => {
      //this._utilityService.hideLoading();
    console.log("error ts: ", error);
    })
  }
}


AddReportAlart(response) {
  console.log("error alart response=",response);
    const alert = this.alerCtrl.create({
      subTitle: response.message,
      buttons: ['OK']
    });
    alert.present();
}

RemoveReportAlart(response) {
  console.log("error alart response=",response);
    const alert = this.alerCtrl.create({
      subTitle: "Remove Report successfully",
      buttons: ['OK']
    });
    alert.present();
}


gotoChat() {
  console.log(this.image);
  if(this.token == null) {
    this.app.getRootNav().push(LoginPage);
  } else {
    let data={
      'id':this.image.userid._id,
      'fullName':this.image.userid.fullName,
      'remoteuserImage':this.image.userid.profilePicture,
      'userimage':this.profilepic,
      'photopath':''
    }
    console.log("TextchatModalPage data=",data);
    
    this.navCtrl.push(TextchatModalPage,{'data':data})
  }
}

}
