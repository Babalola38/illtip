import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { AddgroupuserPage } from '../addgroupuser/addgroupuser';
import { ContactPage } from '../contact/contact';
import { GroupchatPage } from '../groupchat/groupchat';

/**
 * Generated class for the GroupchatditailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-groupchatditails',
  templateUrl: 'groupchatditails.html',
})
export class GroupchatditailsPage {

  GroupChat = this.navParams.get('groupChat');
  GroupUsers = this.navParams.get('groupUsers');
  GroupChatId = this.navParams.get('groupChatId');



  GroupChatUrl:any;

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");

  profileDetails:any;
  profilePicture:any;
  base64Data:any;
  converted_image:any;
  userprofilepic:any;

  userList:any=[];
  url:any;

  groupUser:any;
  GroupUser:any=[];



  GroupPicture:any;

  Base64Data:any;
  ConvertedImage:any;






  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    private alertController: AlertController,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatditailsPage');
    console.log("GroupChat=",this.GroupChat);
    console.log("GroupUsers=",this.GroupUsers);
    console.log("userid=",this.userid);

    this.GroupChatUrl = this.webservice.chat_apiUrl+'groupChatImage/';
    this.url = this.webservice.apiUrl+'users/userThumb/';
    this.getprofiledetails();
    this.usersprofile();
  }

  usersprofile() {
    for (var i = 0; i < this.GroupUsers.length; i++) {
      let obj = {...this.GroupUsers[i]};
      console.log("Imgobj=",obj._id);

     
      if(String(this.GroupUsers[i].profilePicture).includes('.jpg') || String(this.GroupUsers[i].profilePicture).includes('.png') || String(this.GroupUsers[i].profilePicture).includes('.JPEG')) {
        obj.imagetype = "file";
        obj.userImage = this.GroupUsers[i].profilePicture
      } else {
        var Purl = this.GroupUsers[i].profilePicture;
        obj.imagetype = "base64";
        obj.userImage = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
      }

      this.userList.push(obj)
      console.log("this.userdList=",this.userList);
    }
  }

  otherUser() {
    
  }

  getprofiledetails() {
    this.webservice.presentLoading();
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token,).then((res:any) => {
    this.webservice.hideLoader();
      console.log("Service data..=",res);
      this.profileDetails = res.data;
      console.log("this.profileDetails=",this.profileDetails);
      this.profilePicture = this.profileDetails.profilePicture;
      localStorage.setItem('userImage',this.profilePicture)
      

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

    }, (err) => {
      console.log(err); 
      this.webservice.hideLoader();
    });
  }

  remove_user(user,i) {
    console.log("index value=",i);
    
      let alert = this.alertController.create({
        title: 'Confirm Remove User',
        message: 'Do you want to remove this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              //console.log('Delete clicked');
              this.delet_user(user,i);
            }
          }
        ]
      });
      alert.present();
  }

  delet_user(user,i) {
    console.log(user);

    let data = {
      'groupId':this.GroupChat.groupId._id,
      'userId':user._id
    }

    this.webservice.presentLoading();
    this.webservice.RemoveGroupUser('groupchat/deleteUserFromGroup',data).then((response:any) => {
      this.webservice.hideLoader();
      console.log("response=",response);
      this.groupUsers();
    })
  }


  groupUsers() {
    this.GroupUsers = [];
    this.userList = [];
    this.webservice.presentLoading();
    this.webservice.GroupUser('groupchat/getGroupChatDetails/',this.GroupChatId).then((response:any) => {
      this.webservice.hideLoader();
      console.log("response=",response);
      this.groupUser = response.result;
      for(var i=0; i <response.result.length; i++) {
        let chatUserId = response.result[i].groupUser.chatUserId;
        console.log("chatUserId=",chatUserId);
        this.webservice.OtheruserProfile(this.token,chatUserId).then((data:any)=>{
          this.GroupUser.push(data.data);
          console.log("this.GroupUser=",this.GroupUser);
          this.GroupUsers = this.GroupUser;
          this.usersprofile();
        }) 
      }
    })
  }

  addUser() {
    this.navCtrl.push(AddgroupuserPage,{'groupId':this.GroupChat.groupId._id}); 
  }

  goBack() {
    this.userList = [];
    this.GroupUser = [];
  }


  AddIcon() {
    const alert = this.alertController.create({
      title: 'Select option!',
      // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Galery',
          handler: data => {
            console.log('Galery clicked');
            this.openGalery();
          }
        },
        {
          text: 'Camera',
          handler: data => {
            console.log('Camera clicked');
            this.openCamera();
          }
        }
      ]
    });
    alert.present();
  }


  openGalery() {
    console.log("Open Galery");
  
  
    const option: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    console.log("img=",option);
    this.camera.getPicture(option).then((photo) => {

      this.GroupPicture = photo;
  
      this.Base64Data=this.GroupPicture;
      this.ConvertedImage= "data:image/jpeg;base64,"+this.Base64Data;
  
      console.log("this.ConvertedImage=",this.ConvertedImage);
      this.uploadIcon(this.ConvertedImage);
      
    //   console.log("own img=",this.GroupPicture);
  
    // this.uploadImage = this.GroupPicture
  
      
    }, (err) => {
      console.log("error in image uplode=",err);
    })
  }
  
  
  openCamera() {
    console.log("Open Camera");
  
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
  
    //  this.converted_image = 'data:image/jpeg;base64,' + imageData;
    //  console.log("this.converted_image=",this.converted_image);
  
    this.GroupPicture = imageData;
  
    this.Base64Data=this.GroupPicture;
    this.ConvertedImage= "data:image/jpeg;base64,"+this.Base64Data;
  
    console.log("this.ConvertedImage=",this.ConvertedImage);
    
    // console.log("own img=",this.GroupPicture)
  
    // this.uploadImage = this.GroupPicture

    this.uploadIcon(this.ConvertedImage);
  
    }, (err) => {
     // Handle error
     console.log("error in image uplode=",err);
    });
  }


  uploadIcon(ConvertedImage) {
    let data = {
      'groupCover':ConvertedImage,
  }
  console.log("upload group image=",data);
  
  // let headers = new HttpHeaders();   
  // headers = headers.set('Authorization', this.token) ;
  
  this.webservice.putGroupImage(this.webservice.chat_apiUrl+'groupchat/setImage/'+this.GroupChat.groupId.id+'?isDelete=false',data).subscribe((response:any) => {
    console.log("upload image....",response);
    // this.ionViewDidLoad();
    this.navCtrl.setRoot(ContactPage);
  });
  }

}
