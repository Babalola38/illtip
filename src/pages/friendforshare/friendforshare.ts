import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';
//APP SERVICES


//@IonicPage()
@Component({
  selector: 'page-friendforshare',
  templateUrl: 'friendforshare.html',
})
export class FriendforsharePage {
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  public profilepic=localStorage.getItem('userImage')
  friendlist:any;
  private page:number=1;
  private limit:number=10;
   hasMoreData: any;
   searchfriend:any;
  //  url=CONFIG.API_ENDPOINT+'uploads/users/'
  url:any;
  URL:any
   photopath:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    ) {
      this.photopath=this.navParams.get('data')
      console.log('this.photopath',this.photopath)
      this.url = webservice.apiUrl+'uploads/users/'
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendforsharePage');
    this.getFriendlist();
  }

  getFriendlist(){

    if(this.searchfriend == undefined) {
      this.URL = 'friends/allfriendlist11/'+'?page='+this.page+'&limit='+this.limit+'&token='+ this.token
    } else {
      this.URL = 'friends/allfriendlist11/'+'?page='+this.page+'&limit='+this.limit+'&token='+ this.token+ '&name=' +name
    }
   

    this.webservice.presentLoading();
 
     this.webservice.getData(this.URL).then((response:any) => {
    this.webservice.hideLoader();
 
     console.log("response friendlist", response);
 
     if(response.success){
          if(response.data.length  == 0){
              if(this.page == 1){
               console.log("No!");
               this.webservice.presentToast("Your friendlist is blank!");
              }
              
               console.log("Your friendlist is blank!");
               this.webservice.presentToast("No more friend in your list!");
               this.hasMoreData = false;
       }else{
         this.friendlist=response.data;
         //  this.hasMoreData = true;
         //   setTimeout(() => {
         //         for (var i = 0; i < response.data.length; i++) {
                    
         //         }
         //    resolve();
         //     }, 500);
       }
 
     }else{
         console.log("err", response.messege);
     }
 
   }, (error) => {
          this.webservice.hideLoader();
         console.log("error ts: ", error);
   })  
 

 }


 //// ShareImage////
 shareImage(id){
   let data={
     'friendId':id,
     //'galleryId':this.photoid
   }
  this.webservice.presentLoading();
  this.webservice.postData('friends/shareWithFriends/'+'?token='+ this.token,data).then((response:any) => {
 this.webservice.hideLoader();

  console.log("response image", response);
 }, (error) => {
  this.webservice.hideLoader();
 console.log("error ts: ", error);
})
}

shareImagemesge(id,fullName,remoteuserImage){ 
  let data={
    'id':id,
    'fullName':fullName,
    'remoteuserImage':remoteuserImage,
    'userimage':remoteuserImage,
    'photopath':this.photopath.photopath,
    'sharetpes':this.photopath.sharetypes
  }

  // let data={
  //   'id':id,
  //   'fullName':fullName,
  //   'remoteuserImage':remoteuserImage,
  //   'userimage':userimage
  // }
  console.log(data);
  this.navCtrl.push(TextchatModalPage,{'data':data,'shareImageme':data})
}

}
