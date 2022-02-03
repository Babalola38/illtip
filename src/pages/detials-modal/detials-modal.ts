import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController,AlertController, App} from 'ionic-angular';

//APP SERVICES

import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ServiceApplyPage } from '../service-apply/service-apply';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserprofilePage } from '../userprofile/userprofile';
import { ServiceImageModalPage } from '../service-image-modal/service-image-modal';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';
declare var google;
//@IonicPage()
@Component({
  selector: 'page-detials-modal',
  templateUrl: 'detials-modal.html',
})
export class DetialsModalPage {
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  serviceId:any;
  userDeatils:any={};
  postDeatils:any={};
  picturesList:any;
  own:any={};
  user:any={};
  status:any ={};
  confirm:any;
  confirmId:any;
  profiledetails:any={};
  acceptance:boolean

  url:any;
  profilePicture:any;
  converted_image:any;
  userprofilepic:any;
  base64Data:any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private webservice: WebserviceProvider,
     public viewCtrl: ViewController,
    public modalctrl :ModalController,
    public app : App,
    public alertctrl :AlertController ) {

      this.serviceId=this.navParams.get('id')
      console.log('service id',this.serviceId)
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DetialsModalPage');
    this. getServicelisting();
    this.getprofiledetails()
  }


  //// GET SERVICE DETAILS ////

  getServicelisting(){
    // var acceptance
  this.webservice.presentLoading();
  if(this.token == null) {
    this.url = 'services/servicedetails10/'+this.serviceId
  } else {
    this.url = 'services/servicedetails10/'+this.serviceId+'/?token='+ this.token
  }
  this.webservice.getData(this.url).then((response:any) => {
  this.webservice.hideLoader();
  console.log("Service list", response);
  if(response.success){ 
  this.own=response.applyinfo
  
  this.userDeatils=response.data.userid
  console.log("this.userDeatils=",this.userDeatils);
  this.profilePicture = this.userDeatils.profilePicture








  //   let obj = {...response.data.userid};
    
  //   if(String(response.data.userid.profilePicture).includes('.jpg') || String(response.data.userid.profilePicture).includes('.png') || String(response.data.userid.profilePicture).includes('.JPEG')) {
  //     obj.imagetype = "file"

  //   } else {
  //     obj.imagetype = "base64"
  //   }
  // this.userDeatils.push(obj)
  // console.log("this.userDeatils=",this.userDeatils);

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








  this.postDeatils=response.data
  this.picturesList=response.data.pictures
  this.status = response.data.status;
  if(response.data.confirmedid==null){
    this.acceptance = false
    console.log("Service own1", this.acceptance);
  }else if(response.data.confirmedid.userid !=this.userid){
    this.acceptance = false
    console.log("Service own2", this.acceptance);
  }else if(response.data.confirmedid.userid ==this.userid){
    this.acceptance = true
    console.log("Service own3", this.acceptance);
  }
  //this.confirm = response.data.confirmedid.status
  //this.confirmId =response.data.confirmedid.userid
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // var date = new Date(this.postDeatils.date);
  var d = new Date(this.postDeatils.date);
  var dayName = days[d.getDay()];
  console.log("Post Details",  this.status);
  this.postDeatils.dayName= dayName

  //// GET LOCATION ////
  var geocoder = new google.maps.Geocoder();
  //this._utilityService.showLoading();
 this.user.address=this.GetAddress(geocoder,this.postDeatils.latitude,this.postDeatils.longitude)   
 console.log("user",this.user);
 //this._utilityService.hideLoading();
  }  
  }, (error) => {
  this.webservice.hideLoader();
  console.log("error ts: ", error);
  })
  }

  

  GetAddress(geocoder,search_lat,search_long){
    var data=[]
    // var pos=[]
    let value={}
    var latLang = {lat: parseFloat(search_lat), lng: parseFloat(search_long)};
    console.log(latLang)
    geocoder.geocode({'location': latLang}, function(results, status) {
    console.log(results[0])
    
    // this.addressData=results[0].address_components
    if (status === 'OK') {
    if (results[0]) {
      data.push( results[0].formatted_address)
      for(var i=0;i<results[0].address_components.length;i++){
        
      if(results[0].address_components[i].types[0]=="locality"){
          var city =results[0].address_components[i].long_name
          value["city"]=city
          //data={"city":city}
          console.log("value",value)    
      }
      if(results[0].address_components[i].types[0]=="administrative_area_level_1"){
        var State =results[0].address_components[i].long_name
        console.log(State)
        value["state"]=State
        
        
      }
      if(results[0].address_components[i].types[0]=="postal_code"){
        var postal_code =results[0].address_components[i].long_name
        console.log(postal_code)
        value["postal_code"]=postal_code
       
      }
      if(results[0].address_components[i].types[0]=="country" && results[0].address_components[i].types[1]=="political"){
        var Country =results[0].address_components[i].long_name
        console.log("country",Country)
        value["country"]=Country
      }
  }
    } else {
    window.alert('No results found');
    }
    } else {
    window.alert('Geocoder failed due to: ' + status);
    }
  });
  setTimeout(() => {
    var city=JSON.stringify(value["city"])
    this.postDeatils.city= city.slice(1, -1)
  
    var state=JSON.stringify(value["state"])
    this.postDeatils.state= state.slice(1, -1)
  
    var zipcode=JSON.stringify(value["postal_code"])
    this.postDeatils.zipcode= zipcode.slice(1, -1)
  
    var country=JSON.stringify(value["country"])
    this.postDeatils.country= country.slice(1, -1)
  },1000)
    console.log('data de',this.postDeatils)
    return data
    //console.log('data de',data)
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  /// GO TO APPLY PAGE /////

  gotoApply(){
    var data={
      'name':this.postDeatils.description,
      'tip':this.postDeatils.tip,
      'id': this.serviceId
    }
    this.navCtrl.push(ServiceApplyPage,{'data':data})
  }

  identy(){
    // if(this.profiledetails.is_verified=='no' && this.own=='Not applicable'){
    //   this._utilityService.displayToast("Please upload your photo identity & verify your phone no.");
    //   console.log("Please upload your photo identity & verify your phone no.")
    // }else if(this.own=='Not applicable'){
    //   this._utilityService.displayToast("Please upload your photo identity");
    //   console.log("Please upload your photo identity")
    // }else if(this.profiledetails.is_verified=='no'){
    //   this._utilityService.displayToast("Please verify your phone no.");
    //   console.log("verify your phone no.")
    // }
    if(this.profiledetails.is_verified=='no'){
      //this._utilityService.displayToast("Please verify your phone no.");
   
      let phoneModal = this.modalctrl.create('AddphonePage');
      phoneModal.onDidDismiss(data => {
        console.log(data);
        

      });
      phoneModal.present();
    }
    
  }

  ///// GOTO OTHER PROFILE //////
goOtherProfile(id,fullName){

  if(this.token==null){
    let data={
    'userid':id,
    'fullName':fullName,
    'modal':'modal'
    }
    this.navCtrl.push(UserprofilePage,{'data':data}) 
    this.dismiss()
}else{
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
  
}


imageZoom(image){
   console.log(image)

    let imagezoom = this.modalctrl.create(ServiceImageModalPage,{'image':image,'postDeatils':this.postDeatils.description});
    imagezoom.onDidDismiss(data => {
      console.log(data);
      

    });
    imagezoom.present();
  
  
}

////// GET PROFILE DETAILS //////

getprofiledetails(){
  // this._utilityService.showLoading();
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token).then((response:any) => {
      // this._utilityService.hideLoading();
       this.profiledetails=response.data
       console.log("profile details", this.profiledetails);
       
    }, (error) => {
  // this._utilityService.hideLoading();
    console.log("error ts: ", error);
    })
}


///// TEXT CHAT ////
gotoChat(id,fullName){
  if(this.token==null){
    this.dismiss();
  this.app.getRootNav().push(LoginOptionPage);
  }else{
    let data={
      'id':id,
      'fullName':fullName
    }
    this.navCtrl.push(TextchatModalPage,{'data':data})
  }
  
}




gologin(){
  this.dismiss();
  this.app.getRootNav().push(LoginPage);
}
}
function LoginOptionPage(LoginOptionPage: any) {
  throw new Error('Function not implemented.');
}

