import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  ratingDetails :any={};
  rating:any;
  review:any;
  Provider:any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider) {
    this.ratingDetails = this.navParams.get('Rdata')
    console.log('ratingDetails',this.ratingDetails)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
    this.getEmployee()
   
  }

  onModelChange(rate){
    console.log('rate',rate)
    this.rating =rate
  }

  getEmployee() {
    this.webservice.getData('users/userdetails30/'+ this.ratingDetails.employeeId).then((res:any) => {
      console.log("res=",res);  
      this.Provider = res.data
    })
  }
 

addReview(){
  let givenRating ={
      'rating':this.rating,
      "userid":this.ratingDetails.employeeId,
      'serviceid' :this.ratingDetails.serviceid,
      'review' :this.review,

  }
  console.log('givenRating',givenRating)
  this.webservice.presentLoading();
this.webservice.postData('users/userrating/'+'?token='+ this.token,givenRating).then((response:any) => {
    this.webservice.hideLoader();
    console.log("response mypost list", response); 
    if(response.success){ 
    this.webservice.presentToast("Rating Successful");
    this.navCtrl.setRoot(HomePage)
    } else{
    this.webservice.presentToast(response.message);
    } 
  }, (error) => {
     this.webservice.hideLoader();
      console.log("error ts: ", error);
})
}

}
