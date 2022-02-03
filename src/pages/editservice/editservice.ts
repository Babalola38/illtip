import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer2';
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { WebserviceProvider } from '../../providers/webservice/webservice';

declare var google;
/**
 * Generated class for the EditservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-editservice',
  templateUrl: 'editservice.html',
  providers: [Camera,FileTransfer,File,ImagePicker]
})
export class EditservicePage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long')
  job_image: any= [];
  job_uplaod_images:any=[];
  upimage_id:any=[]
  getLocation:any;
  search_lat: any ;
  search_long: any;
  user:any={};
  flag:boolean=true;
  job: any = {};
  card:any={}
  upimage_array_id=[];
  up_image=[];
  categoryList:any;
  shown:boolean;
  check:any;
  isActive: boolean = false;
   date : any = new Date().toISOString();
   currentYear : any = (new Date()).getFullYear();
   endyear:any=(new Date()).getFullYear()+15;
   JobDate:any=(new Date()).getFullYear()+15;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public app:App,
     public modalCtrl: ModalController,
     private webservice:WebserviceProvider,
     private transfer: FileTransfer,
     private camera: Camera,) {
    this.job=this.navParams.get('data')
    this.job.category=this.job.catid
    this.search_lat=this.job.latitude
    this.search_long=this.job.longitude
    this.job_uplaod_images=this.job.pictures
    console.log('job',this.job)
  }

  ionViewDidLoad() {
    var geocoder = new google.maps.Geocoder(); 
    console.log('ionViewDidLoad EditServicePage');
    setTimeout(() => {
      this.webservice.presentLoading();
      if(!this.search_lat && !this.search_long ){
        // var flag:true;
      console.log("this.flag1",this.flag)
      }else{
        this.flag=false;
        this.user.address=this.GetAddress(geocoder,this.search_lat,this.search_long)
        console.log("user",this.user);
      }
      this.webservice.hideLoader();
    
  },1000)
  this.webservice.hideLoader();
  }


  /// GO TO MAP PAGE /////
goTomap(){
  //this.app.getRootNav().push('MapPage');
  let mapModal = this.modalCtrl.create("MapNewPage");
  mapModal.present();
  mapModal.onDidDismiss((data) => {
   
    console.log(data)
    this.job.latitude=data.pos_lat,
    this.job.longitude=data.pos_long
    console.log("data", this.job.latitude);
    if(!data){
      // var flag:true;
      console.log("this.flag1",this.flag)
    }else{
      this.flag=false;
      console.log("this.flag2",this.flag)
      this.loadMap()
    }
    
  });
}

  ///// GET CURRENT ADDRESS ////
loadMap() {
  this.search_lat = this.job.latitude;
  this.search_long = this.job.longitude;
  console.log('getting location', this.search_lat, this.search_long);
  var geocoder = new google.maps.Geocoder();
   this.webservice.presentLoading();
  this.user.address=this.GetAddress(geocoder,this.search_lat,this.search_long)   
  console.log("user",this.user);
  this.webservice.hideLoader();

}


  GetAddress(geocoder,search_lat,search_long){
  var data=[]
  // var pos=[]
  // let value={}
  var latLang = {lat: parseFloat(search_lat), lng: parseFloat(search_long)};
  console.log(latLang)
  geocoder.geocode({'location': latLang}, function(results, status) {
  //console.log(results[0])
  
  this.addressData=results[0].address_components
  if (status === 'OK') {
  if (results[0]) {
    data.push( results[0].formatted_address)
  } else {
  window.alert('No results found');
  }
  } else {
  window.alert('Geocoder failed due to: ' + status);
  }
});

 console.log('data de',this.job)
  return data
  //console.log('data de',data)
}


//// UPLOAD IMAGES ////
//// UPLOAD IMAGES ////
uplaodJob(){
  console.log("coming");
  
     
  var options = {
    // quality: 100,
    // outputType:0,
    // width:200,               
    // height:200,
    // allowEdit:true,
    // maximumImagesCount:10

    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit : true,
    correctOrientation:true
  };
  this.camera.getPicture(options).then((response) => {
  console.log("coming2");

    console.log("response=",response);
    // for (var i = 0; i <response.length; i++) {
      // this.job_image.push(response[i]);
      this.job_image.push(response);

      //console.log("gallry_img_array",this.job_image);
       
      var urls = this.webservice.apiUrl+'users/uploadimage/?type=service&id='+this.userid+'&token='+ this.token;
      
      var randname=Math.random();
      let options: FileUploadOptions = {
        fileKey: 'image',
        fileName:randname+'.jpg',
        mimeType : "image/jpeg",
        httpMethod : "POST",
        chunkedMode: false
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(response, urls, options)
      .then((data) => {
        console.log("data",data)
        var res=JSON.parse(data.response);
        console.log("res",res)
        // var imagearr=[]
        var idarr=[]
        this.job_uplaod_images.push(res);
        console.log("res_img_backend",this.job_uplaod_images)
         this.webservice.presentLoading();
        for(var i=0;i < this.job_uplaod_images.length;i++){
          this.up_image=this.job_uplaod_images[i].data._id
          console.log("this.up_image", this.up_image)
        }
        
        if(idarr.indexOf(this.up_image) == -1){
                idarr.push(this.up_image)
                  console.log("this.fianl_image",idarr)
                  this.upimage_id.push(this.up_image);
                  console.log("this.fianl_image",this.upimage_id)
            }
            // if(this.job_uplaod_images.length>=10&&this.upimage_id.length>=10){
            // this.stopButton=true
            // console.log("true",this.stopButton)
            // }else{
            // this.stopButton=false
            // console.log("false",this.stopButton)
            // }
            this.webservice.hideLoader();

      }, (err) => {
        // error
        this.webservice.hideLoader();
        console.log(err)
      })
    // }
  }, (err) => { 
    console.log(err)
  })
}


/////EDIT JOB /////
postJob(){
  console.log(this.job)
  console.log("ok")
  //  let re = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi;
  //  let re2=/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;

    var today = new Date();
    var startDate = new Date(this.job.date); 
    // var EndDate = new Date(this.job.end_date);
    // var age = EndDate.getFullYear() - startDate.getFullYear();
    // var m = EndDate.getMonth() - startDate.getMonth();
    // var da = EndDate.getDate() - startDate.getDate();

    // if(!this.job.category){
    //   console.log("1")
    //    this.webservice.presentToast("Please choose a category");
    // }
    // else if(!this.job.title){
    //   console.log("2")
    //  this.webservice.presentToast("Please add a job title");
    // }else if(this.job.title.trim() == ""){
    //   console.log("3")
    //   this.webservice.presentToast("Please enter a valid job title");
    // }
    // else if(this.job.title.length <3){
    //      console.log("Name minimum 3 characters")
    //      this.webservice.presentToast("Title minimum 3 characters");
    //  }
     if(!this.job.description){
       console.log("4")
       this.webservice.presentToast("Please add a job description");
     }else if(this.job.description.trim() == ""){
       console.log("5")
        this.webservice.presentToast("Please enter a valid job description");
     }else if(this.job.description.length < 10){
       console.log("6")
       this.webservice.presentToast("Description minimum 10 characters");
     }
    //  else if(!this.getLocation){
    //   console.log("7")
    //    this.webservice.presentToast("Please choose a location");
    // }
    else if(!this.job.experience){
      console.log("8")
       this.webservice.presentToast("Please inform us your requirement regarding job experience,license or degree");
    }else if(!this.job.date){
      console.log("9")
       this.webservice.presentToast("Please select Job date");
    }else if(today>startDate){
      console.log("13")
      this.webservice.presentToast("Plaese enter proper date");
    }else if(!this.job.starttime){
      console.log("10")
       this.webservice.presentToast("Please select start time");
    }else if(!this.job.endtime){
      console.log("11")
       this.webservice.presentToast("Please select end time");
    }else if(this.job.starttime>=this.job.endtime){
      console.log("12")
       this.webservice.presentToast("Time span is not correct");
    }else if(!this.job.tip){
      console.log("14")
       this.webservice.presentToast("Please enter price ammount");
    }
    // else if(this.job.tip.trim()==""){
    //   console.log("15")
    //   this.webservice.presentToast("Please enter valid price ammount");
    // }
    else{
      let data={
        // "title":this.job.title,
        "id":this.job._id,
        "description":this.job.description,
        "catid":this.job.category._id,
        "date":this.job.date,
        "starttime":this.job.starttime,
        "endtime":this.job.endtime,
        "tip":this.job.tip,
        "experience": this.job.experience,
        "latitude":this.job.latitude,
        "longitude":this.job.longitude,
        "pictures":this.upimage_id,
        "status":this.job.status,
        "isActive":this.job.isActive,
        "isLimitedRadius":this.job.isLimitedRadius
      }
         this.webservice.presentLoading();
          console.log('data',data)
           this.webservice.postData('services/editservice/'+'?token='+ this.token,data).then((response:any) => {
      
           console.log("Register response : ", response);
           this.webservice.hideLoader();
      
           if(response.success == true){    
      
           this.webservice.presentToast("Job edit successfully");  
           this.app.getActiveNav().pop()
             
           }else{
           this.webservice.presentToast(response.message);
           }
           }, (error) => {
           console.log("error ts: ", error);
           })
    }
  
    }

}
