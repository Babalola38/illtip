import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ExplorePage } from '../explore/explore';
import { ProfilePage } from '../profile/profile';
import { UserprofilePage } from '../userprofile/userprofile';

/**
 * Generated class for the PointWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-point-wallet',
  templateUrl: 'point-wallet.html',
})
export class PointWalletPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  page=1;
  limit=7;
  hasMoreData: any;
  pointhistory=[];
  // urls='http://18.191.93.75:6018/'+'users/userThumb/'
  urls:any;
  tipscount:any;

  pointlist=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider) {
      this.tipscount = this.navParams.get('tip')
      console.log(this.tipscount)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointWalletPage');
    this.urls = this.webservice.apiUrl + 'uploads/users/'
    this.getPointCountlist();
    this.readtip()
  }


    ////// GET PROFILE DETAILS //////
    getPointCountlist(){
      this.webservice.presentLoading();
      return new Promise(resolve => {
      this.webservice.getData('users/getPointList10/'+'?page='+ this.page+'&limit='+ this.limit+'&token='+ this.token).then((response:any) => {
        console.log("getPointCountlist=",response);
        
        if(this.tipscount =='read'){
         
        }
        this.getpointCount()
      if(response.success){ 
        if(response.data.length == 0){
        console.log('no image')
          this.hasMoreData = false;
         }else{
          this.hasMoreData = true;
          for (var i = 0; i < response.data.length; i++) { 
            this.pointhistory.push(response.data[i])
          }
            // resolve();
          console.log(this.pointhistory)
          this.imageType()
         }
        }
      }, (error) => {
        console.log("error ts: ", error);
        })
        });
    }

    imageType() {
      for (var j = 0; j < this.pointhistory.length; j++) {
        let obj = {...this.pointhistory[j]};
        
        if(String(this.pointhistory[j].likedBy.profilePicture).includes('.jpg') || String(this.pointhistory[j].likedBy.profilePicture).includes('.png') || String(this.pointhistory[j].likedBy.profilePicture).includes('.JPEG')) {
          obj.imagetype = "file"

        } else {
          obj.imagetype = "base64"
        }
      this.pointlist.push(obj)
      this.webservice.hideLoader();
      console.log("this.pointlist=",this.pointlist);
      } 
    }


    doInfinite(infiniteScroll) {
  
      this.page++
      //console.log('doInfinite page,  '+ this.listLentgh);
      this.getPointCountlist().then((data)=>{
        console.log("data", data);
        infiniteScroll.complete();
    });
  }

  ///// GOTO OTHER PROFILE //////
  goOtherProfile(id,fullName){
    if(this.token==null){
      let data={
      'userid':id,
      'fullName':fullName
      }
      console.log(data);
      
      this.navCtrl.setRoot(UserprofilePage,{'data':data}) 
  }else{
      if(id==this.userid){
      this.navCtrl.push(ProfilePage)
      }else{
      let data={
        'userid':id,
        'fullName':fullName
      }
      console.log(data);
      
      this.navCtrl.setRoot(UserprofilePage,{'data':data})
      }
  }
  }

readtip(){
  let enter ='true'
 localStorage.setItem('enter',enter)
}

getpointCount(){
  this.webservice.getData('users/getTotalpoint/'+'?token='+ this.token,).then((response:any) => {
    localStorage.setItem('tips',response.data)  
    console.log(response.data)
  })
}

///// GO TO PHOTO MODAL ////
gotoPhotoModal(list,i){
  let data = {
    'id':list.userid,
    'url':list.path,
    'profile':list.userid,
    'type':list.type,
    'index':i,
    'createdAt':list.createdAt
  }
  console.log("gotoPhotoModal=",data);
  
//  let NoteModal = this.modalCtrl.create("PhotoModalPage", {"photolist": data});
//   NoteModal.present();
this.navCtrl.push(ExplorePage, {"photolist": data,"page":"profile"})
}

}
