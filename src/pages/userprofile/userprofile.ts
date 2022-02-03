import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, AlertController, Events, Content } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import Masonry from 'masonry-layout';
import { LoginPage } from '../login/login';
import { FriendsPage } from '../friends/friends';
import { SearchPage } from '../search/search';
import { ExplorePage } from '../explore/explore';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  @ViewChild(Content) content: Content;

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  public profilepic=localStorage.getItem('userImage')

  userdata:any={};

  otherProfile:any={};
  gallerylist:any;
  gallerylength:any={};
  ublock:boolean=false;
  userprofilepic:any={};
  // frndscount:any;
  // rateing:any;
  commentProfile:any={};
  connect:any={};

  profilePicture:any;
  base64Data:any;
  converted_image:any;

  

  videoCount:any;
  hasMoreData:any
  listLentgh:any
  photolist:any = [];

  Usergallery:any;

  post_permission:any;
  backtohomepage:any;

  userDetails:any;

  ratinglist:any=[];

  urls:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    private app : App,
    public actionSheetCtrl: ActionSheetController,
    private alerCtrl: AlertController,
    public events: Events,) {

      this.userdata=this.navParams.get('data');
      this.backtohomepage = this.navParams.get('back');
      console.log('userid',this.userdata)
      console.log("back=",this.backtohomepage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
    console.log("this.token=",this.token);

    this.urls = this.webservice.apiUrl+'uploads/users/';


    if(this.token !=null){
      this.getotherprofileDetils();
      this.getRatingList();
    }else{
      this.getusercontent()
      
    }

    
    // this.events.subscribe('backtohomepage', backtohomepage =>{
    //   console.log("backtohomepage=",backtohomepage);
    //   this.backtohomepage = backtohomepage; 
    // });
    // this.getRatingList()
  }

  doBack() {
    console.log("go back");

    this.navCtrl.setRoot(SearchPage);
  }

  getotherprofileDetils() {

    // this.webservice.getData('users/userdetails30/'+this.userdata.userid).then((response:any) => {
    this.webservice.OtherUserProfile(this.token,this.userdata.userid).then((response:any) => {

      console.log('resss',response)
      this.userDetails = response;

      if(this.userDetails.message=="You can't view the user") {
        this.otherProfile="";
        this.gallerylength="";
        this.ublock=true;
        this.gallerylist="";
        console.log('isblock',this.ublock)
        this.webservice.presentToast('You have blocked this user');
      }else {

        this.ublock=false;
        console.log('isblock',this.ublock)
        
        if(this.userDetails.success){
          if(this.userDetails.data.length  == 0){
            this.webservice.presentToast("No photo uploaded yet!");
            this.hasMoreData = false;
          } else {
            this.otherProfile = this.userDetails.data
            this.Usergallery = this.userDetails.gallery
            this.hasMoreData = true;
            this.listLentgh=this.userDetails.data.length
  
  
            this.profilePicture = this.otherProfile.profilePicture;
        
  
            if(this.profilePicture != null) {
              var Purl = this.profilePicture
              var extension = this.profilePicture.split('.').pop();
              console.log("Extension =>"+extension);
              if(extension== 'jpg' || extension== 'png' || extension== 'JPEG'){
                console.log('ok')
                this.converted_image=this.profilePicture
              }else{
              console.log('no')
              this.userprofilepic = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
              this.base64Data = this.userprofilepic;
              this.converted_image = "data:image/jpeg;base64,"+this.base64Data;
              }
            } else {
              console.log("profile pictur null");
            }
  
  
  
            setTimeout(() => {
              for (var i = 0; i < this.Usergallery.length; i++) {
                if(this.Usergallery[i].type =='video'){
                  this.videoCount++;
                  if(this.videoCount % 5 == 0){
                    this.Usergallery[i].isMovable = true;
                  }else{
                    this.Usergallery[i].isMovable = false;
                  }
                }
                this.photolist.push(this.Usergallery[i]);
                // setTimeout(()=>{
                //   console.log('hi hi hi hi hi')
                //  var elem = document.querySelector('.grid');
                // var msnry = new Masonry(elem, {
                // // options
                // itemSelector: '.galleryVideo',
                // columnWidth: 10
                // });
                // console.log(msnry);
                
                // },1000)
              }
              console.log(this.photolist);
        //  resolve();
          }, 500);


          if(this.token !=null){
            this.connect=this.userDetails.connect
           // for(var i=0;i<response.connect.length;i++){
           //   if(response.connect.length==0){
           //    this.connect=false
           //   }else{
           //    this.connect=response.connect[0].isUnread
           //   }
           //   console.log(this.connect)
           // }
          }
         if(this.otherProfile.isFriend==true && this.connect==true){
           this.commentProfile=true
           console.log('1',this.commentProfile)
         }else if(this.otherProfile.isFriend==false &&  this.connect==true ){
           this.commentProfile=true
           console.log('2',this.commentProfile)
         }else if(this.otherProfile.isFriend==false && this.connect==false){
           this.commentProfile=true
           console.log('3',this.commentProfile)
         }else if(this.otherProfile.isFriend==true && this.connect==false){
           this.commentProfile=false
           console.log('4',this.commentProfile)
         }

          }
        } else {
          console.log("err", this.userDetails.messege);
          this.webservice.presentToast(this.userDetails.message);
        }
      }


    })
  }


  connectFrined(){
    if(this.token==null){
      if(this.userdata.modal=="modal"){
        this.navCtrl.pop()
        this.app.getRootNav().push('LoginOptionPage');
      }else{
        this.app.getRootNav().push('LoginOptionPage');
      }
    }else{
      let data={
        'friend_from':this.userdata.userid,
        'friend_status':'connect'
      }
      this.webservice.postData('friends/sentfriendrequest/'+'?token='+ this.token,data).then((response:any) => {
         console.log("connect response", response);
         this.webservice.presentToast(response.message);
         this.getusercontent()
      }, (error) => {

      console.log("error ts: ", error);
      })
    }
  }


    ///// GET USER CONTENT /////
getusercontent(){
  let data={
    'profile_id':this.userdata.userid,
    'curr_user_id':this.userid

  }
  //this._utilityService.showLoading();
this.webservice.postData('users/getusercontent/'+'?token='+ this.token,data).then((response:any) => {
    //this._utilityService.hideLoading();
    console.log("content", response); 
    this.post_permission=response.data
    this.getotherprofileDetils()
  }, (error) => {
    // this._utilityService.hideLoading();
      console.log("error ts: ", error);
})
}


selectoption(id,type,i,list) {
  let data = {
    'id':list._id,
    'url':list.path,
    'profile':list.userid,
    'type':list.type,
    'index':i,
    'createdAt':list.createdAt
  }

  this.navCtrl.push(ExplorePage,{"photolist": data,"page":"profile"})
}




  ////// GO TO FRIENDLIST /////
  gotoFriendlist(){
    if(this.token==null){
      if(this.userdata.modal=="modal"){
        this.navCtrl.pop()
        this.app.getRootNav().push(LoginPage);
      }else{
        this.app.getRootNav().push(LoginPage);
      }
    }else{
      this.navCtrl.push(FriendsPage,{'id':this.userdata.userid})
    }
  }



  doDots() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Block User',
          handler: () => {
            console.log('Block User clicked');
            this.blockUser()
          }
        },{
          text: 'Remove Friend',
          handler: () => {
            console.log('Remove Friend clicked');
            this.removefriend()
          }
        },
      ]
    });
    actionSheet.present();
  }


  doDots2() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Unblock User',
          handler: () => {
            console.log('Block User clicked');
            this.UnblockUser()
          }
        },
        {
          text: 'Remove Friend',
          handler: () => {
            console.log('Remove Friend clicked');
            this.removefriend()
          }
        },
      ]
    });
    actionSheet.present();
  }



  removefriend() {
    console.log("this.userdata=",this.userdata);

    let alert = this.alerCtrl.create({
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
              'friend_from':this.userid
            }
            //this._utilityService.showLoading();
           
               this.webservice.postData('friends/unfriend'+'?token='+this.token,data).then((response:any) => {
                 //this._utilityService.hideLoading();
                 console.log('remove friend=',response)
                 if(response.success){
                  this.webservice.presentToast("Friend is remove from friendlist");
                  this.navCtrl.push(SearchPage);
                  // this.friendlist.splice(i,1)
                  //this.getFriendlist();

                  //this.friendlist=[]
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



  //// BLOCK USER /////
blockUser(){

  let alert = this.alerCtrl.create({
    title: 'Are you sure you want to block friend?',
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
          let data={
            'user_id':this.userid,
            'block_id':this.userdata.userid
          }
         // this._utilityService.showLoading();
          this.webservice.postData('users/permanentblock/'+'?token='+ this.token,data).then((response:any) => {
            //this._utilityService.hideLoading();
             
             console.log("block", response);
             this.ionViewDidLoad();
             this.webservice.presentToast('You have block this user successfully');
             this.ublock=false;
          }, (error) => {
          //this._utilityService.hideLoading();
          console.log("error ts: ", error);
          })
        }
      }
    ]
  });
  alert.present();

}



UnblockUser() {
  
}



gotoChat(id,fullName,profilePicture) {
  let data={
    'id':id,
    'fullName':fullName,
    'remoteuserImage':profilePicture,
    'userimage':this.profilepic,
    'photopath':''
  }
  console.log("TextchatModalPage data=",data);
  
  this.navCtrl.push(TextchatModalPage,{'data':data})
}
 


scrollTo(){
  this.content.scrollToBottom();
}

up(){
  this.content.scrollToTop();
}





getRatingList(){
  let data={
    'userId':this.userdata.userid
  }

this.webservice.ratingList(this.token,data).then((response:any) => {

    console.log("rating list", response); 
    if(response.success){ 
      // this.ratinglist=response.data;

      for (var i = 0; i < response.data.length; i++) {
        let obj = {...response.data[i]};

        if(String(response.data[i].provider_id.profilePicture).includes('.jpg') || String(response.data[i].provider_id.profilePicture).includes('.png') || String(response.data[i].provider_id.profilePicture).includes('.JPEG')) {
          obj.datatype = "file"

        } else {
          obj.datatype = "base64"
        }

        this.ratinglist.push(obj);
        console.log("this.ratinglist=",this.ratinglist);
      }
      
    }  
  }, (error) => {
    console.log("error ts: ", error);
})
}



  


}
