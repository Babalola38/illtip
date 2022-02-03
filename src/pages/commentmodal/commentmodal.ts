import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserprofilePage } from '../userprofile/userprofile';

/**
 * Generated class for the CommentmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-commentmodal',
  templateUrl: 'commentmodal.html',
})
export class CommentmodalPage {
  url='http://18.191.93.75:6018/'+'users/userThumb/'
  
  language:any;

  photoID:any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  commentlist:any=[];
  commentCount:any;

  profiledetails:any={};

  comment:boolean;
  id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private webservice: WebserviceProvider) {

      this.photoID = navParams.get('imageId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentmodalPage');

    // fetch('../assets/language/language.json').then(res => res.json()).then(json => {
    //   console.log("language list=",json);
    //   this.language = json
    // });

    this.commentList()
  }

  commentList(){
    console.log('work')
   
      let data={
        'imageid':this.photoID
      }
      console.log("imageId=",data);
      
        this.webservice.presentLoading();
        this.webservice.postData('users/showallcomment/'+'?token='+ this.token,data).then((res:any) => {
          this.webservice.hideLoader();
          console.log("comment res=",res);
          
          if(res.data.length == 0) {
            this.comment = false;

          } else {
            this.comment = true;
            
            for (var i = 0; i < res.data.length; i++) {
              let obj = {...res.data[i]};
              
              if(String(res.data[i].user_id.profilePicture).includes('.jpg') || String(res.data[i].user_id.profilePicture).includes('.png') || String(res.data[i].user_id.profilePicture).includes('.JPEG')) {
                obj.datatype = "file"
  
              } else {
                obj.datatype = "base64"
              }
            this.commentlist.push(obj)
            console.log("this.commentlist=",this.commentlist);
            }
          }
        }, (error) => {
          //this._utilityService.hideLoading();
        console.log("error ts: ", error);
        })
    }

  addcomment() {
  if(this.token==null) {
        this.navCtrl.push(LoginPage);
      } else {
      console.log('work')
      console.log("this.profiledetails=",this.profiledetails);
      
      if(!this.profiledetails.comment){
        this.webservice.presentToast("Enter your comments");
      }else if(this.profiledetails.comment.trim() == ""){
        this.webservice.presentToast("Enter your comments");
      }else{
        let data={
          'comment':this.profiledetails.comment,
          'imageid':this.photoID
        }
        console.log('data',data)
          this.webservice.postData ('users/usercomment/'+this.photoID+'?token='+ this.token,data).then((response:any) => {
         console.log("comment", response);
         this.webservice.presentToast(response.message);
         this.profiledetails.comment="";
          // this.dismiss()
          this.commentlist=[];
          this.commentList()
          }, (error) => {
          console.log("error ts: ", error);
          })
      }
    }
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }


      ///// DELETE PROFILE COMMENT ///////
commentdel(id){
  this.webservice.presentLoading();
  // this.webservice.ImagecommentDelete(this.token,id).subscribe((response) => {
  this.webservice.deleteData('users/deletecomment/'+id+'?token='+ this.token,).then((response:any) => {
  this.webservice.hideLoader();
     
     console.log("comment delete response", response);
    this.webservice.presentToast(response.message);
     //this.getotherprofileDetils()
     this.commentlist=[];
     this.commentList()
  }, (error) => {
  this.webservice.hideLoader();
  console.log("error ts: ", error);
  })
  }


  openCommentUser(comment) {
    console.log("comment=",comment);


    if(this.token==null){
      let data={
      'userid':comment.user_id._id,
      'fullName':comment.user_id.fullName
      }
      this.navCtrl.push(UserprofilePage,{'data':data}) 
      }else{
      if(comment.user_id._id==this.userid){
      this.navCtrl.push(ProfilePage)
      }else{
      let data={
        'userid':comment.user_id._id,
        'fullName':comment.user_id.fullName
      }
      this.navCtrl.push(UserprofilePage,{'data':data}) 
      }
      }
  }


  scrollHandler(event) {
    console.log("event=",event);
    
    // var searchDiv = document.getElementById("searchDiv");
    // var search5 = document.getElementById("search5");
  
    // console.log("event=",event.directionY);
    // if(event.directionY == "down") {
    //   console.log("hide searchbar");
    //   searchDiv.style.display = "none";
    // } else if(event.directionY == "up") { 
    //   console.log("show searchbar");
    //   searchDiv.style.display = "block"; 
    // }
  }


}
