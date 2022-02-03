import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { EditservicePage } from '../editservice/editservice';
import { RatingPage } from '../rating/rating';
import { ServiceAcceptedPage } from '../service-accepted/service-accepted';

/**
 * Generated class for the MypostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mypost',
  templateUrl: 'mypost.html',
})
export class MypostPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  mypostList:any;
  completejob:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider,
     public alertCtrl: AlertController) {
       this.completejob=this.navParams.get('complete')
       console.log('this.completejob',this.completejob)
  }

  ionViewWillEnter() {
    console.log('token post',this.token)
    console.log('ionViewDidLoad MypostPage');
    setTimeout(()=>{
      this.getMypostList()
      
      
    },1000)
    
   
  }

  scrollTo(rec){
    const element = document.getElementById('job_'+rec);
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }

   //// GET CATEGORY LIST ///
 getMypostList(){
  this.webservice.presentLoading();
  this.webservice.getData('services/mypostlist/'+'?token='+ this.token).then((response:any) => {
     // this.webservice.hideLoading();
      console.log("response mypost list", response); 
      if(response.success){ 
          console.log("response mypost list", response); 
         this.mypostList=response.data;
         this.webservice.hideLoader();
        }else{
         this.webservice.hideLoader();
          console.log(response.message); 
          this.mypostList=[]
          console.log('You have no service requested,your service will show up here when requested')
          this.webservice.presentToast('You have no service requested, your service will show up here when requested');
        }
    }, (error) => {
       //this.webservice.hideLoading();
        console.log("error ts: ", error);
})
}


//// GET CATEGORY LIST ///
Deletemypost(id){
  this.presentConfirm(id);
}


presentConfirm(id) {
  let alert = this.alertCtrl.create({
    title: 'Are you want to delete your post ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {

        
          this.webservice.presentLoading();

            // let params = { "associateId": id}
              this.webservice.deleteData('services/deleteservice/'+id+'/?token='+ this.token).then((response:any) => {
                this.webservice.hideLoader();
                console.log(response);
                if(response.success == true){
                      this.getMypostList();
                      console.log("response mypost list", response); 
                     this.webservice.presentToast("Successfully deleted!");
                }

              })
        }
      }
    ]
  });
  alert.present();
}


///// GO TO APPLICAT LIST /////
goApplicatlist(post,id,tip,description,status,paymentSuccess){
  console.log(post);
  
  if(post.applicants == 0) {
    let alert = this.alertCtrl.create({
      title: 'Sorry!',
      subTitle: 'No Applicants found in this job.',
      buttons: ['Dismiss']
    });
    alert.present();
  }else {
    let data={
      'id':id,
      'tip':tip,
      'description':description,
      'status':status,
      'paymentSuccess':paymentSuccess
    }
    this.navCtrl.push(ServiceAcceptedPage,{'data':data})
  }
}

///// EDIT SERVICE ////

editservice(post){
  //console.log('post',post)
  this.navCtrl.push(EditservicePage,{'data':post})
}
// markecomplete(serviceid,payment){
//   console.log("payment",serviceid+payment)
// if(payment===true){
//   //this.webservice.showLoading();
//               this._appService.markcomplete(this.token,serviceid).subscribe((response) => {
//                 //this.webservice.hideLoading();
//                 console.log(response);
//                 if(response.success == true){
//                       this.getMypostList();
//                       console.log("response completed", response); 
//                      this.webservice.presentToast("Successfully deleted!");
//                 }

//               })
//   //console.log('true')
// }
// }
markecomplete(serviceid,cash,paypal,tip,confirm,description){
let data={
  'Job_id':serviceid,
  'cash':cash,
  'paypal':paypal,
  'tip':tip,
  'confirm':confirm,
  'description':description
}
this.navCtrl.push('MakePaymentPage',{'data':data})
}


goRating(description,serviceid,employeeId){
  let Rdata ={
    'description':description,
    'serviceid':serviceid,
    'employeeId':employeeId
  }
this.navCtrl.push(RatingPage,{'Rdata':Rdata})
}

}
