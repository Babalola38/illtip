import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

/**
 * Generated class for the EditpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html',
})
export class EditpostPage {

  uploadData:any;
  shareImage:any;
  public token = localStorage.getItem('access-token-illTip');


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider) {

    this.uploadData = navParams.get('image'); 
    this.shareImage = this.uploadData.imageThumb
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
    console.log("uploadData data=",this.uploadData);
  }

  EditCaption() {
    if(this.uploadData.title==undefined||this.uploadData.title==''||this.uploadData.title==null){
      this.webservice.presentToast("Please add title");
     } else if(this.uploadData.title.length >130){
       this.webservice.presentToast("Title should not exceed 130 characters");
     } else{

      let data={
        'title':this.uploadData.title
      }

      console.log("edit title=",data);

      this.webservice.postData('users/editPost/'+this.uploadData._id+'?token='+ this.token,data).then((response:any) => {
        console.log('edit post',response)
        this.navCtrl.pop()
      },(error) => {
        console.log("error ts: ", error);
})
    }
  }

}
