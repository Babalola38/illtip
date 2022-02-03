import { Component } from '@angular/core';
import { AlertController, App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ContactPage } from '../contact/contact';
import { CreategroupPage } from '../creategroup/creategroup';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserprofilePage } from '../userprofile/userprofile';

/**
 * Generated class for the AddgroupuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-addgroupuser',
  templateUrl: 'addgroupuser.html',
})
export class AddgroupuserPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  public groupid=this.navParams.get("groupId");

  searchfriendother:any;
  friendlist:any;
  FriendList:any=[];
  private page:number=1;
  private limit:number=10;
   hasMoreData: any;

   groupuser:boolean = false;

   GroupChatData:any=[];
   groupChatData:any;


  //  urls='http://18.191.93.75:6018/'+'users/userThumb/'
  urls:any;

  GroupUserId:any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    public app: App,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    this.urls = this.webservice.apiUrl+'uploads/users/'
    console.log('ionViewDidLoad AddgroupuserPage');
    console.log(this.GroupChatData);
    console.log("groupid=",this.groupid);
    this.getFriendlist();
  }

  getFriendlist(){
   

    return new Promise(resolve => {
      this.webservice.presentLoading();
      console.log(this.page);
      this.webservice.otherfriendlist(this.userid,this.page,this.limit,this.token,this.searchfriendother).then((response:any) =>{
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
            this.FriendList.push(obj)
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
    this.navCtrl.push(UserprofilePage,{'data':data})
  }
  
}


chat_this_user(list,i) {
  this.groupuser = true;
  console.log(list);

  this.FriendList.splice(i, 1);
  
  this.GroupUserId.push(list.friendData._id)
  // if(this.GroupChatData.length == 0) {
  //   this.GroupChatData.push(list);
  // } else {
  //   for(var i=0; i<this.GroupChatData.length; i++) {
  //     if(list.friendData._id != this.GroupChatData[i].friendData._id) {
  //       console.log(i);
  //       this.GroupChatData.push(list);
  //     } else {
  //       console.log("no");
  //     }
  //   }
  // }
  this.GroupChatData.push(list)
  console.log(this.GroupChatData); 
}

RemoveUser(list,i) {
  console.log(list);

  this.FriendList.push(list, 1);
  
  this.GroupChatData.splice(i, 1);
  console.log(this.GroupChatData);
  if(this.GroupChatData.length == 0) {
    this.groupuser = false;
  }
}

// chat_this_user(list) {
//   console.log(list);
//   this.groupuser = true;
//   if(this.GroupChatData.length == 0) {
//     this.GroupChatData.push(list);
//     this.groupChatData = this.GroupChatData
//   } else {
//     for(var i=0; i<this.groupChatData.length; i++) {
//       console.log("this.groupChatData[i]=",this.groupChatData[i]);
//       // console.log("list=",list);
      
//       if(list.friendData._id != this.groupChatData[i].friendData._id) {
//         this.GroupChatData.push(list);
//         this.groupChatData = this.GroupChatData;
//       } else if(list.friendData._id == this.groupChatData[i].friendData._id) {
//         console.log("no");
//         // this.sameUser(this.groupChatData[i]);
//       }
//     }
//   }
//   // this.GroupChatData.push(list)
//   // console.log(this.GroupChatData); 
// }

sameUser(user) {
  console.log(user);
  
  const alert =  this.alertController.create({
    message: 'You can not add '+ user.friendData.fullName +' again.',
    buttons: ['Cancel']
  });

 alert.present();
}




// chat_this_user(list) {
//   console.log(list);
//   if(this.token == null) {
//     this.app.getRootNav().push(LoginPage);
//   } else {
//     let data={
//       'id':list.friendData._id,
//       'fullName':list.friendData.fullName,
//       'remoteuserImage':list.friendData.profilePicture,
//       'userimage':list.friendData.profilePicture,
//       'photopath':''
//     }
//     console.log("TextchatModalPage data=",data);
    
//     this.navCtrl.push("TextchatModalPage",{'data':data})
//   }
// }


CreateGroup() {
  console.log(this.GroupUserId);
  // this.navCtrl.push(CreategroupPage,{'groupUser':this.GroupChatData,'GroupUserId':this.GroupUserId});
  let data = {
    'groupId':this.groupid,
    'groupUsers':this.GroupUserId
  }
  this.webservice.presentLoading();
  this.webservice.AddGroupUser("groupchat/addGroupUser/",data).then((response:any) =>{
    console.log("add user=",response);
    if(response.success == true) {
      this.webservice.hideLoader();
      this.webservice.presentToast("User add successfully");
      this.navCtrl.setRoot(ContactPage);
    } else {
      this.webservice.hideLoader();
      this.webservice.presentToast("User didn't add");
    }
  })
}

}
