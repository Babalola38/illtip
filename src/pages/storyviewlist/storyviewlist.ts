import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CONFIG } from '../../config';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ProfilePage } from '../profile/profile';
import { UserprofilePage } from '../userprofile/userprofile';
 

@Component({
  selector: 'page-storyviewlist',
  templateUrl: 'storyviewlist.html',
  providers: [WebserviceProvider]
})
export class StoryviewlistPage {
  viewlist:any;
  storyid:any;
  commentList:any;
  // url=CONFIG.API_ENDPOINT+'users/userThumb/';
  url:any;
  userSearch:string ='view';

  storyVierlist:any = [];
  storycommentlist:any = [];


  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider) {
      this.viewlist=this.navParams.get('res');
    
    this.storyid = this.navParams.get('id')
    console.log(this.viewlist);
    this.url = webservice.apiUrl+'uploads/users/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryviewlistPage');
    this.StoryVierlist();
  }

  StoryVierlist() {
    for (var j = 0; j < this.viewlist.length; j++) {
      let obj = {...this.viewlist[j]};

      if(String(this.viewlist[j].createdBy.profilePicture).includes('.jpg') || String(this.viewlist[j].createdBy.profilePicture).includes('.png') || String(this.viewlist[j].createdBy.profilePicture).includes('.JPEG')) {
        obj.imagetype = "file"

      } else {
        obj.imagetype = "base64"
      }
    
    this.storyVierlist.push(obj);
    console.log("this.storyVierlist=",this.storyVierlist);
    } 
  }


  getCommentlist(){
      // this.webservice.getData(this.token,this.storyid).subscribe((response) => {
      this.webservice.getData('story/storyCommentList/'+this.storyid+'?token='+ this.token).then((response:any) => {
        console.log('story comm',response)
        this.commentList = response.data;

        for (var i = 0; i < this.commentList.length; i++) {
          let obj = {...this.commentList[i]};
    
          if(String(this.commentList[i].createdBy.profilePicture).includes('.jpg') || String(this.commentList[i].createdBy.profilePicture).includes('.png') || String(this.commentList[i].createdBy.profilePicture).includes('.JPEG')) {
            obj.imagetype = "file"
    
          } else {
            obj.imagetype = "base64"
          }
        
        this.storycommentlist.push(obj);
        console.log("this.storycommentlist=",this.storycommentlist);
        } 
      })
  }

  onSegmentChanged(event){
    if(event=='comment'){
      this.getCommentlist()
    }
  }



  goOtherProfile(id,fullName){

    console.log('hi')
    let data={
      'userid':id,
      'fullName':fullName
      }
      this.navCtrl.push(UserprofilePage,{'data':data}) 
    // if(this.token==null){
    // let data={
    // 'userid':id,
    // 'fullName':fullName
    // }
    // this.navCtrl.push(UserprofilePage,{'data':data}) 
    // }else{
    // if(id==this.userid){
    // this.navCtrl.push(ProfilePage)
    // }else{
    // let data={
    // 'userid':id,
    // 'fullName':fullName
    // }
    // this.navCtrl.push(UserprofilePage,{'data':data}) 
    // }
    // }
  }

}
