import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ProfilePage } from '../profile/profile';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';
import { UserprofilePage } from '../userprofile/userprofile';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  idUser:any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  friendlist:any;
  FriendList:any=[];
  temp_FrendList : any = [];
  private page:number=1;
  private limit:number=10;
   hasMoreData: any;
   searchfriendother:any;

   urls:any;
   searchFlag : Boolean = false;
   searchTerm : any= '';
   removeFriend : any;
  //  urls='http://18.191.93.75:6018/'+'users/userThumb/'

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    private alertCtrl: AlertController) {
      this.idUser=this.navParams.get('id');
      this.removeFriend = this.navParams.get('removeFriend');
      console.log('id',this.idUser)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
    this.urls = this.webservice.apiUrl + 'uploads/users/';
    console.log("this.removeFriend=",this.removeFriend);
    this.getFriendlist()
  }

  getFriendlist(){
   

    return new Promise(resolve => {
      this.webservice.presentLoading();
      console.log(this.page);
      this.webservice.otherfriendlist(this.idUser,this.page,this.limit,this.token,this.searchfriendother).then((response:any) =>{
        console.log(response)
          this.webservice.hideLoader();
          
          if(response.success){ 
            if(response.data.length == 0){
              console.log('no image')
              //this._utilityService.displayToast('No more result');
              this.hasMoreData = false;
            }else{
              this.hasMoreData = true;
             // this.imageList=response.data.docs;
              

             for (var j = 0; j < response.data.length; j++) {
              let obj = {...response.data[j]};
              
              if(String(response.data[j].friendData.profilePicture).includes('.jpg') || String(response.data[j].friendData.profilePicture).includes('.png') || String(response.data[j].friendData.profilePicture).includes('.JPEG')) {
                obj.imagetype = "file"
        
              } else {
                obj.imagetype = "base64"
              }
            this.FriendList.push(obj);
            this.temp_FrendList.push(obj);
            console.log("this.FriendList=",this.FriendList);
            } 
             
            }
            
            } 
            else{
              this.webservice.presentToast(response.message);
            }
        }, (error) => {
           this.webservice.hideLoader();
            console.log("error ts: ", error);
    })
    });
 
    

 }





//  optionChangeother(){
//   this.friendlist=[]
//   return new Promise(resolve => {
//     this.page=1
//    // this._utilityService.showLoading();
//     console.log(this.page);
//     this.webservice.otherfriendlist(this.idUser,this.page,this.limit,this.token,this.searchfriendother).then((response:any) =>{
//       console.log('hi',response,this.searchfriendother)
//         //this._utilityService.hideLoading();
        
//         if(response.success){ 
//           if(response.data.length == 0){
//             console.log('no image')
//             //this._utilityService.displayToast('No more result');
//             this.hasMoreData = false;
//           }else{
//             this.hasMoreData = true;
//            // this.imageList=response.data.docs;
            
         
//               for (var i = 0; i < response.data.length; i++) {
                
//               this.friendlist.push(response.data[i]);
             
//               }
//               console.log(this.friendlist)
//          resolve();
        
//           }
          
//           } 
//           else{
//             this.webservice.presentToast(response.message);
//           }
//       }, (error) => {
//          //this._utilityService.hideLoading();
//           console.log("error ts: ", error);
//   })
//   });

//  }


 doInfinite(infiniteScroll) {
  console.log('doInfinite page,  '+ this.page);
  this.page++;
 
  this.getFriendlist().then((data)=>{
      console.log("data", data);
      infiniteScroll.complete();
 });
 
 }


 goOtherProfile(id,fullName){

  if(id==this.userid){
    this.navCtrl.push(ProfilePage)
  }else{
    let data={
      'userid':id,
      'fullName':fullName
    }

    this.searchTerm = '' ;
    this.friendlist = this.temp_FrendList;
    this.searchFlag = false;
    this.navCtrl.push(UserprofilePage,{'data':data})
  }
  
}


gotoChat(id,fullName,remoteuserImage,userimage){
  let chatdata={
    'id':id,
    'fullName':fullName,
    'remoteuserImage':this.webservice.apiUrl + 'uploads/users/' + remoteuserImage,
    'userimage':this.webservice.apiUrl + 'uploads/users/' + remoteuserImage
  }
  console.log('datas',chatdata)
  this.searchTerm = '' ;
  this.friendlist = this.temp_FrendList;
  this.searchFlag = false;
  this.navCtrl.push(TextchatModalPage,{'data':chatdata});
}

// cancel(){
//   this.page =1;
//   this.searchfriendother=""
//   this.friendlist=[];
//   this.getFriendlist();
// }

gotoBack() {
  this.navCtrl.pop();
}

    /* Fetch Data for Search by name */
    onFocus() { 
      this.searchFlag = true;
      if (this.searchTerm === '' || this.searchTerm === null) {
        this.FriendList = this.temp_FrendList;
      } else {
        this.FriendList = this.temp_FrendList.filter(e => (e.friendData.fullName != null && e.friendData.fullName != '' && e.friendData.fullName.toUpperCase().startsWith(this.searchTerm.toUpperCase())));
      }
    }
   
    onBlur() {
      this.searchFlag = false;
       this.FriendList = this.temp_FrendList ; 
       this.searchTerm = '';
    }




    /////// REMOVE FRIENDLIST /////
 remove(id,name,i){
  this.confirmremove(id,name,i)
 }

 confirmremove(id,name,i){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to remove friend?',
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
              'friend_from':id
            }
            this.webservice.presentLoading();
           
               this.webservice.removefrnd(this.token,data).then((response:any) => {

                 console.log('remove friend',response)
                 if(response.success){
                  this.webservice.presentToast("Friend is remove from friendlist");
                  this.FriendList.splice(i,1)
                  this.webservice.hideLoader();
                 }
         
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

}
