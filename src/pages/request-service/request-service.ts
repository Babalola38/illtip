import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Events } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer2';
import { File } from '@ionic-native/file';
import { ServicepagemodalPage } from '../servicepagemodal/servicepagemodal';
import { MapNewPage } from '../map-new/map-new';

/**
 * Generated class for the RequestServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-request-service',
  templateUrl: 'request-service.html',
  providers: [Camera,FileTransfer,File,ImagePicker]
})
export class RequestServicePage {

  categoryList:any;
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long');
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  URL:any

  job: any = {};
  timeselect:boolean;
  job_image: any= [];
  job_uplaod_images:any=[];
  upimage_id:any=[]
  upimage_array_id=[];
  up_image=[];
  captureImage:any;
  perc:any;

  flag:boolean=true;
  getLocation:any;
  search_lat: any ;
  search_long: any;
  user:any={};

  currentYear : any = (new Date()).getFullYear();
  JobDate:any=(new Date()).getFullYear()+15;

  Service:any
  serviceValue:any

  public Address:any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private transfer: FileTransfer,
    private camera: Camera,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestServicePage');
    // this.getCategoryList() 


    this.events.subscribe('service', service => {
      console.log("service=",service);
      this.Service = service.name;
      this.serviceValue = service.value
    })

  }

    //// GET CATEGORY LIST ///
 getCategoryList(){
  // var arrayId={}
  if(this.token == null) {
    this.URL = 'services/categorylist10/'+'?lat='+this.lat+'&long='+this.long
  } else {
    this.URL = 'services/categorylist10/'+'?lat='+this.lat+'&long='+this.long+'&token='+ this.token
  }

  this.webservice.getData(this.URL).then((res:any) => { 
    console.log("response category list", res);
    if(res.success){ 
      console.log("response category list", res); 
      this.categoryList = res.data
   }
   setTimeout(() => {
    if(res.success){ 
    
      // this.categoryList=response.data
      
    }
      
    },500)
},(error) => {
   console.log("error ts: ", error);
})
}


openServiceMordal() {
  const modal = this.modalCtrl.create(ServicepagemodalPage);
  modal.present();
}





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



//// UPLOAD IMAGES ////
// uplaodJob(){
     
//   // var options = {
//   //   quality: 100,
//   //   outputType:0,
//   //   width:200,               
//   //   height:200,
//   //   allowEdit:true,
//   //   maximumImagesCount:10
//   // };
//   // this.imagePicker.getPictures(options).then((response) => {
//   //   console.log("getPictures=",response);

  

//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     encodingType: this.camera.EncodingType.JPEG,
//     allowEdit : true,
//     correctOrientation:true

//   }

//   this.camera.getPicture(options).then((response) => {
//     console.log('imageData',response)
//     var url = this.webservice.apiUrl+'users/uploadimage/?type=service&id='+this.userid+'&token='+ this.token;
//     var randname=Math.random();

//     let win: any = window;
//     var myURL = win.Ionic.WebView.convertFileSrc(response);
//     this.captureImage = myURL;
//     console.log("this.captureImage=",this.captureImage);

//     let options: FileUploadOptions = {
//       fileKey: 'file',
//       fileName:randname+'.jpg',
//       mimeType : "image/jpeg",
//       httpMethod : "POST",
//       chunkedMode: false,

//     }
//     console.log(options);
//     const fileTransfer: FileTransferObject = this.transfer.create();
//     fileTransfer.onProgress((progressEvent) => {
//       if (progressEvent.lengthComputable) {
//         this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
//         console.log('progressEvent',this.perc)
//       } else {
//       }
//     });

//     fileTransfer.upload(response,url, options)
//     .then((data) => {
//       //this._utilityService.showLoading();
//       console.log('after trnas',options,data)
//         let userdata: any = {};
//         userdata = JSON.parse(data.response);
//         console.log("image",userdata)
//         this.job_uplaod_images.push(userdata);
//         if(userdata.success){


//         }else{
//           this.viewCtrl.dismiss();
//         }
          
//     }, (err) => {
//       this.viewCtrl.dismiss();
//       this.webservice.presentToast('Image upload failed')
//       console.log(err)
//     })

//     // for (var i = 0; i <response.length; i++) {
//     //   this.job_image.push(response[i]);
//     //   //console.log("gallry_img_array",this.job_image);
       
//     //   var url = this.webservice.apiUrl+'users/uploadimage/?type=service&id='+this.userid+'&token='+ this.token;
      
//     //   var randname=Math.random();
//     //   let options: FileUploadOptions = {
//     //     fileKey: 'image',
//     //     fileName:randname+'.jpg',
//     //     mimeType : "image/jpeg",
//     //     httpMethod : "POST",
//     //     chunkedMode: false
//     //   }
//     //   const fileTransfer: FileTransferObject = this.transfer.create();

//     //   fileTransfer.upload(response[i], url, options)
//     //   .then((data) => {

//     //     console.log("data",data)
//     //     // var res=JSON.parse(data.response);
//     //     // console.log("res",res)
//     //     // var imagearr=[]
//     //     // var idarr=[]
//     //     // this.job_uplaod_images.push(res);
//     //     // console.log("res_img_backend",this.job_uplaod_images)
//     //     //  this.webservice.presentLoading();
//     //     // for(var i=0;i < this.job_uplaod_images.length;i++){
//     //     //   this.up_image=this.job_uplaod_images[i].data._id
//     //     //   console.log("this.up_image", this.up_image)
//     //     // }
        
//     //     // if(idarr.indexOf(this.up_image) == -1){
//     //     //         idarr.push(this.up_image)
//     //     //           console.log("this.fianl_image",idarr)
//     //     //           this.upimage_id.push(this.up_image);
//     //     //           console.log("this.fianl_image",this.upimage_id)
//     //     //     }

//     //     //     this.webservice.hideLoader();

//     //   }, (err) => {
//     //     this.webservice.hideLoader();
//     //     console.log(err)
//     //   })
//     // }
//   }, (err) => { 
//     console.log("error=",err)
//   })
// }


checktime(){
  var currentTime:any;
  var inputTime:any 
  // var startHours =(this.job.start_time)
  let hoursMinutes = this.job.start_time.split(':');
// let time = this.formatAMPM(hoursMinutes);
console.log('time',hoursMinutes);
var hours = hoursMinutes[0];
var minutes = hoursMinutes[1];
// var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;
//this.strTime = hours + ':' + minutes + ' ' + ampm;
//console.log('strTime',this.strTime)
    var date=new Date()
    var today=new Date().toISOString().split('T')
    var currentDate=today[0]
    var element = this.job.start_time
    console.log(today,this.job.date,date)
    if(currentDate==this.job.date){
    console.log("same time",this.job.start_time)
    if(!this.job.start_time){
    console.log("input time")
    }else{
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    if(h == 0) {
    h = 24
    }
    //var currentTime:any
    currentTime = h+"."+m;
    console.log(currentTime);

    // get input time
    var time = element.split(":");
    var hour = time[0];
    if(hour == '00') {hour = 24}
    var min = time[1];

    
    inputTime = hour+"."+min;
    console.log(inputTime,this.job.start_time);

    var totalTime = currentTime - inputTime;
    console.log(totalTime);
    if(totalTime>0){

    this.timeselect=false
    console.log("no",this.timeselect);
    this.webservice.presentToast("Please select proper start time");
    }else{
    this.timeselect=true
    console.log("ok",this.timeselect);
    }
    }
    }else{
    this.timeselect=true
    console.log("other",this.job.start_time)
    }
}






/// GO TO MAP PAGE /////
goTomap(){
  //this.app.getRootNav().push('MapPage');
  let mapModal = this.modalCtrl.create(MapNewPage);
  mapModal.present();
  mapModal.onDidDismiss((data) => {
   
    console.log(data)
    this.getLocation=data
    console.log("data", this.getLocation);
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
  this.search_lat = this.getLocation.pos_lat;
  this.search_long = this.getLocation.pos_long;
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
  let value={}

  
  var latLang = {lat: parseFloat(search_lat), lng: parseFloat(search_long)};
  console.log(latLang)
  geocoder.geocode({'location': latLang}, function(results, status) {
  console.log(results[0].address_components);
  // results[0].address_components = results[0].address_components;
  // console.log("results[0].address_components=",results[0].address_components);

  
  // results[0].address_componentsData=Address.address_components;
  // console.log("results[0].address_componentsData=",results[0].address_componentsData);

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
  this.job.city= city.slice(1, -1)

  var state=JSON.stringify(value["state"])
  this.job.state= state.slice(1, -1)

  var zipcode=JSON.stringify(value["postal_code"])
  this.job.zipcode= zipcode.slice(1, -1)

  var country=JSON.stringify(value["country"])
  this.job.country= country.slice(1, -1)
},1000)
 console.log('data de',this.job)
  return data
  //console.log('data de',data)
}







checkdates(){
  var todate=new Date()

  var d = (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate())
  var m:number =new Date().getMonth()+1
  var month = (m < 10 ? '0' + m : m)
  var y = new Date().getFullYear()
  var currentDate= y +'-' + month + '-' +d
  console.log('todate',todate,currentDate)
   console.log(this.job.date)
  if(currentDate>this.job.date){
    console.log('no')
  }else{
    console.log('ok')
  }
}




postJob(){
  console.log(this.job)
  console.log("ok")
  //  let re = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi;
  //  let re2=/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
  //  var today = new Date();
   var startDate = new Date(this.job.date); 
   var EndDate = new Date(this.job.end_date);
   var age = EndDate.getFullYear() - startDate.getFullYear();
   var m = EndDate.getMonth() - startDate.getMonth();
   var da = EndDate.getDate() - startDate.getDate();
   console.log(age,m,da);
   
  //  var todate=new Date().toISOString().split('T')
  //  var currentDate=todate[0]
  var d = (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate())
  var mon:number =new Date().getMonth()+1
  var month = (mon < 10 ? '0' + mon : mon)
  var y = new Date().getFullYear()
  var currentDate = y +'-' + month + '-' +d

    

    if(!this.serviceValue){
      console.log("1")
       this.webservice.presentToast("Please choose a category");
    }
    // else if(!this.job.title){
    //   console.log("2")
    //  this._utilityService.displayToast("Please add a job title");
    // }else if(this.job.title.trim() == ""){
    //   console.log("3")
    //   this._utilityService.displayToast("Please enter a valid job title");
    // }
    // else if(this.job.title.length <3){
    //      console.log("Name minimum 3 characters")
    //      this._utilityService.displayToast("Title minimum 3 characters");
    //  }
     else if(!this.job.description){
       console.log("4")
       this.webservice.presentToast("Please add a job description");
     }else if(this.job.description.trim() == ""){
       console.log("5")
        this.webservice.presentToast("Please enter a valid job description");
     }else if(this.job.description.length < 10){
       console.log("6")
       this.webservice.presentToast("Description minimum 10 characters");
     }else if(!this.getLocation){
      console.log("7")
       this.webservice.presentToast("Please choose a location");
    }else if(!this.job.experience){
      console.log("8")
       this.webservice.presentToast("Please inform us your requirement regarding job experience,license or degree");
    }else if(!this.job.date){
      this.webservice.presentToast("Please select job date");
      console.log("add date")
    }else if(currentDate>this.job.date){
      console.log("22new")
      this.webservice.presentToast("Please select proper date");
    }else if(!this.job.start_time){
      this.webservice.presentToast("Please select start time");
    }else if(this.timeselect===false){
      console.log("23new")
       this.webservice.presentToast("Please select proper time");
       this.job.start_time=""
    }else if(!this.job.end_time){
      console.log("11")
       this.webservice.presentToast("Please select end time");
    }else if(this.job.start_time>=this.job.end_time){
      console.log("12")
       this.webservice.presentToast("Time span is not correct");
    }else if(!this.job.tip){
      console.log("14")
       this.webservice.presentToast("Please enter price ammount");
    }else if(this.job.tip.trim()==""){
      console.log("14")
      this.webservice.presentToast("Please enter valid price ammount");
    }
    else{
      let data={
        // "title":this.job.title,
        "description":this.job.description,
        // "catid":this.job.category,
        "catid":this.serviceValue,
        "date":this.job.date,
        "starttime":this.job.start_time,
        "endtime":this.job.end_time,
        "tip":this.job.tip,
        "experience": this.job.experience,
        "latitude":this.getLocation.pos_lat,
        "longitude":this.getLocation.pos_long,
        "pictures":this.upimage_id,
        "isLimitedRadius":this.job.radius
      }
      console.log("data",data)
         this.webservice.presentLoading();
          console.log('data',data)
           this.webservice.postData('services/createservice/'+'?token='+ this.token,data).then((response:any) => {
      
           console.log("Register response : ", response);
           this.webservice.hideLoader();
      
           if(response.success == true){    
      
           this.webservice.presentToast("Job saved successfully");  
           this.job.title=""
           this.job.description="",
            this.user=[],
            this.job.category="",
            this.job.date="",
            this.job.start_time="",
            this.job.end_time="",
            this.job.end_date="",
            this.job.tip="",
            this.job.experience="",
            this.job.radius="",
            this.job_uplaod_images=[];
            this.upimage_id=[]
           }else{
           this.webservice.presentToast(response.message);
           }
           }, (error) => {
           console.log("error ts: ", error); 
           })
    }
  
}

}
