import { Component, ViewChild, ElementRef,Input, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, ActionSheetController, ModalController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { Registration1Page } from '../registration1/registration1';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfilePage } from '../profile/profile';
import { WebserviceProvider } from '../../providers/webservice/webservice';

import { Globalization } from '@ionic-native/globalization';
import { ExplorePage } from '../explore/explore';
import { NotificationPage } from '../notification/notification';
import { PointWalletPage } from '../point-wallet/point-wallet';

import Masonry from 'masonry-layout';
import { SearchPage } from '../search/search';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { CreateThumbnailOptions, GetVideoInfoOptions, VideoEditor } from '@ionic-native/video-editor';
import { StorypagePage } from '../storypage/storypage';
import { CurrentpostPage } from '../currentpost/currentpost';
import { EditexploremodalPage } from '../editexploremodal/editexploremodal';

import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { LoginPage } from '../login/login';
import { UploadStoryPage } from '../upload-story/upload-story';
import { OwnListPage } from '../own-list/own-list';


// declare var Cordova: any;
declare var google;
declare var MarkerClusterer

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    Geolocation,MediaCapture,VideoEditor
  ]
})
export class HomePage {

   @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  geoLatitude:any;
  geoLongitude:any;

  profileDetails:any;
  profilePicture:any;
  base64Data:any;
  converted_image:any;
  userprofilepic:any;
   url:any;

   page=1;
   limit=12;
   type:boolean;
   hasMoreData: any;
   listLentgh:any;
   videoCount:any;
   imageList:any=[];
   currentimageList:any=[];

   isMovable: boolean;

   noticount:any={};

   tippoints:any={};
   tips_count_read:any;

   nostory:any={};
   ownstoryList:any={}
   ownstoryListlength:any;

   androidCordova = false;
   storyData:any;
   fileName:any;

   GEOLOC_CONFIG: { enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0 };
    search_lat: any ;
    search_long: any;
    map: any;
    latLang:any;
    @ViewChild('mapContainer') mapContainer: ElementRef;
    locations=[];
    searchsection:any=null;

    captureImage:any;
    imageview:any={};

    storyList:any;
    storyId:any;
    currentTime:any;
    perc:any;
    loaderShow:boolean=false;

    profilepic:any

    backtohomepage = "homepage"


    hommepage:boolean = true;
    currentpostpage:boolean = false;

    hidesearch:boolean = false;


    imageID:any;
    reportid:any
    ImageArr:any=[];

    
   


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    private geolocation: Geolocation,
    private webservice:WebserviceProvider,
    private globalization: Globalization,
    // private alerCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public modalCtrl: ModalController,
    // private platform:Platform,
    // private mediaCapture: MediaCapture,
    public popoverCtrl: PopoverController,
    private loadingCtrl:LoadingController,
    private videoEditor: VideoEditor,
    private alerCtrl: AlertController,
    public events: Events,
    public renderer: Renderer2) {


      

      events.subscribe('top', (time) => {
        
        const element2 = document.getElementById('top');
        console.log(element2);
        console.log('top', 'at', time);
      });
        this.perc=0;
        this.loaderShow=false

        var today = new Date();
        this.currentTime= today.getTime();
        console.log('time',this.currentTime);


       


  }

  @Input("header") header:any;


  ionViewWillEnter(){
    console.log("home");
    
     this.masonry.reloadItems();
      this.masonry.layout();
  }



  ionViewDidLoad() {

    this.tips_count_read=localStorage.getItem('enter')
    
    console.log('ionViewDidLoad HomePage');

    // this.globalization.getDatePattern (  
    //   { formatLength: 'short', selector: 'date and time'} )
      
    //   .then(res => {
    //      console.log( "time zone=",res );
    //   });
    this.styleload();
    //this.getGeolocation();

    this.getownstoryList();
    this.getstoryList();
    this.getprofiledetails();
    this.url= this.webservice.apiUrl

    this.globalization.getPreferredLanguage()
    .then(res => console.log(res))
    .catch(e => console.log(e));

    this.bacsicsearch();

    this.imageserachwithpagination()

    this.getnotificationcount()
    this.getpointCount()

    // this.loadMap(this.searchsection)


     setTimeout(function(){ 
      this.videoTag = document.getElementsByTagName('video');
      for(var i=0; i<this.videoTag.length; i++){
        this.videoTag[i].play();
      }

    }, 4000);
  }


  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("country details=",resp);
      
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude; 
      console.log(this.geoLatitude);
      console.log(this.geoLongitude);
      localStorage.setItem('search_lat', this.geoLatitude);
      localStorage.setItem('search_long', this.geoLongitude);
     }).catch((error) => {
       console.log('Error getting location', JSON.stringify(error));
     });
  }

  onClick() {
    if(this.token !=null) {
      this.navCtrl.push(SearchPage);
    } else {
      this.registration();
    }
  }

  registration() {
    // this.navCtrl.setRoot(Registration1Page);
    this.app.getRootNav().push(Registration1Page);
  }

  login(){
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().push('LoginPage');
  }

goProfile() {
  this.navCtrl.push(ProfilePage, {'back':this.backtohomepage});
}



getprofiledetails() {
    
  if(this.token != null) {
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token,).then((res:any) => {
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
           this.converted_image=this.profilePicture;
         }else{
          console.log('no')
          this.userprofilepic = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
          this.base64Data = this.userprofilepic;
          this.converted_image = "data:image/jpeg;base64,"+this.base64Data;
         }
      } else {
        console.log("profile pictur null");
      }
  
      // var Purl = this.profilePicture
      // var extension = this.profilePicture.split('.').pop();
      //  console.log("Extension =>"+extension);
      //  if(extension== 'jpg' || extension== 'png' || extension== 'JPEG'){
      //    console.log('ok')
      //    this.converted_image=this.profilePicture
      //  }else{
      //   console.log('no')
      //   this.userprofilepic = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
      //   this.base64Data = this.userprofilepic;
      //   this.converted_image = "data:image/jpeg;base64,"+this.base64Data;
      //  }
      
  
      console.log('convert',this.converted_image);
    }, (err) => {
      console.log(err); 
    });
  }else {
    console.log("login first..");
  }

}


////STORY////


addClasss(date){
  let time,conditionOne,conditionTwo,conditionThree
  
  time = date
  
  var Checkdate = new Date(time)
  var diff =(Checkdate.getTime() - this.currentTime) / 1000;
  diff /= (60 * 60);
  var difffen = Math.abs(Math.round(diff));
    if(difffen <= 48 && difffen >=25){
      conditionOne =true
    }else if(difffen <=24 && difffen >=7){
      conditionTwo =true;
    }else if(difffen <= 6){
      conditionThree =true
    }
  let className ={
    isRed: (conditionOne)?true:false,
    isYellow: (conditionTwo)?true:false,
    isGreen: (conditionThree)?true:false,
  }
  return className;
}


submitid(id){
  console.log(id)
}


getownstoryList(){
  //alert("Entered")
  //this._utilityService.showLoading();
    //console.log(this.page);
    this.webservice.getData('story/ownstoryList/'+'?token='+ this.token).then((response:any) => {
      console.log('oenstory',response)
     // alert("getownstoryList "+JSON.stringify(response))
      this.nostory=response.data
      
      if(this.userid != null) {
        this.ownstoryList=response.data[0];
        this.ownstoryListlength=response.data.length
        console.log("this.ownstoryList=",this.ownstoryList);
        console.log("this.ownstoryListlength=",this.ownstoryListlength);
      }
      

      console.log("this.nostory=",this.nostory);
      
    }, (err) => {
        alert("err is "+ JSON.stringify(err))
    })
}

getOwnList(){
  let myModal = this.modalCtrl.create(OwnListPage,{ 'ownstoryList':this.nostory});
    myModal.present();
    myModal.onDidDismiss(() => {
      this.getownstoryList()
     })
}



//////// STORY //////////
showstory(story,i){
  console.log(story);
  console.log(i);
  
  let storydata={
    'story':story.story[0],
    'i':i,
    'id':story._id
  }

  console.log("storydata=",storydata);
  console.log("storyList=",this.storyList);
  
  // this.viewStory(story.story[0]._id)
  this.navCtrl.push(StorypagePage,{'storydata':storydata,'storylist':this.storyList}) 
  // let myModal = this.modalCtrl.create(StorypagePage,{
  //   'storydata':storydata,
  //   'storylist':this.storyList
  //   });
  //   myModal.present();
  //   myModal.onDidDismiss((storydata) => {
  //     this.getstoryList();
  //   })
}

// viewStory(id){  
//   let data={
//     "reaction":""
//   }
//   this.webservice.postData('story/reactStory/'+id+'?token='+ this.token,data).then((response:any) => {
//     console.log('reaction',response)
//     // this.getstoryList()
//   })
// }

///STORY /////


getstoryList(){
  let id,time,timing
  console.log(id,time,timing);
  //this._utilityService.showLoading();
    console.log(this.page);
    if(this.userid != null) {
      this.webservice.getData('story/storyList/'+'?token='+ this.token).then((response:any) => {
        console.log('story',response)
        this.storyList=response.data;
        
        for(var i=0;i<response.data.length;i++){
          time = response.data[i].story[0].createdAt
          this.storyId = response.data[i].story[0]._id
          var date = new Date(time)
          var diff =(date.getTime() - this.currentTime) / 1000;
          diff /= (60 * 60);
          console.log(diff);
          // var difffen = Math.abs(Math.round(diff)); 
          // console.log(difffen)
          // if(difffen == 41){
            
          // }else if(difffen == 24){
            
          // }else if(difffen == 6){
          
          // }
        }
       
  
      })
    }

}


// plus() {
//   let actionSheet = this.actionSheetCtrl.create({
//     buttons: [
//       {
//         text: 'Photo',
//         handler: () => {
//           // this.permission()
//         }
//       },
//       {
//         text: 'Video',
//         handler: () => {
//           console.log('Archive clicked');
//           // this.videoCapture()
//         }
//       },{
//         text: 'Gallery',
//         handler: () => {
//           console.log('Archive clicked');
//           // this.gallery()
//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       }
//     ]
//   });

//   actionSheet.present();
// }

plus() {
  const actionSheet = this.actionSheetCtrl.create({
    // title: 'Modify your album',
    buttons: [
      {
        text: 'Camera',
        handler: () => {
          console.log('Destructive clicked');
          // this.permission()
          this.Imagecapture()
        }
      },{
        text: 'Video',
        handler: () => {
          console.log('Archive clicked');
          this.videoCapture()
        }
      },
      {
        text: 'Gallery',
        handler: () => {
          console.log('Archive clicked');
          this.gallery()
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}


// permission(){
//   navigator.getUserMedia = ((<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia || (<any>navigator).mozGetUserMedia || (<any>navigator).msGetUserMedia);
  
//   this.androidCordova = this.platform.is('android') && typeof Cordova !== 'undefined';
//   this.platform.ready().then(() => {
//     if( this.androidCordova ){ // is Android Native App
//         this.androidPermissions.requestPermissions(
//         [
//           this.androidPermissions.PERMISSION.CAMERA, 
//           this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
//           this.androidPermissions.PERMISSION.READ_MEDIA_VIDEO
//         ]

//         ).then(()=>{
//           this.Imagecapture()
//         })
//       }
//   })
//  }

 Imagecapture() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit : true,
    correctOrientation:true

  }

  this.camera.getPicture(options).then((imageData) => {
    console.log('imageData',imageData)

    let win: any = window;
    var myURL = win.Ionic.WebView.convertFileSrc(imageData);
    this.captureImage = myURL;
    console.log("this.captureImage=",this.captureImage);

    let data={
      'fullPath':imageData,
      'captureImage':this.captureImage,
      'imageData':imageData,
      'upload':imageData,
      'type':'image',
      'uploadType':'image',
      'profileDetails':this.profileDetails.fullName
      }
      // let uploadModal = this.modalCtrl.create("CreatepostPage", {"res": data});
      let uploadModal = this.modalCtrl.create(UploadStoryPage, {"res": data,"converted_image":this.converted_image,});

      uploadModal.present();
      uploadModal.onDidDismiss((data) => {
        this.getownstoryList()
      if(!data){

      }else{
      this.webservice.presentToast('Image upload successfully');
      // this.GetGalleryList();
      this.getpointCount();
      }

      });
    //this.cropImage()
  }, (err) => {
    // Handle error
    })
 }

//  Imagecapture(){
  
  
//   var randname=Math.random();
//   let options: CaptureImageOptions = { 
//     limit:1,
//    };
//   this.mediaCapture.captureImage(options).then((data: MediaFile[]) => {
//     console.log('image',data);
//     this.storyData = data[0].fullPath;
//     let datas={
//       'fullPath':data[0].fullPath,
//        'type':data[0].type
//     }
//     let uploadModal = this.modalCtrl.create("UploadStoryPage", {"res": datas});
//     uploadModal.present();
//     uploadModal.onDidDismiss(() => {
//       this.getownstoryList()
//      })
  
//   },(err: CaptureError) => {
//     console.error(err)
// });
// }


///// GET FILE FROM GALLERY ///


gallery() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit : true,
    correctOrientation:true

  }

  this.camera.getPicture(options).then((imageData) => {
    console.log('imageData',imageData)

    let win: any = window;
    var myURL = win.Ionic.WebView.convertFileSrc(imageData);
    this.captureImage = myURL;
    console.log("this.captureImage=",this.captureImage);

    let data={
      'fullPath':imageData,
      'captureImage':this.captureImage,
      'imageData':imageData,
      'upload':imageData,
      'type':'image',
      'uploadType':'image',
      'profileDetails':this.profileDetails.fullName
      }
      // let uploadModal = this.modalCtrl.create("CreatepostPage", {"res": data});
      
      let uploadModal = this.modalCtrl.create(UploadStoryPage, {"res": data,"converted_image":this.converted_image});

      uploadModal.present();
      uploadModal.onDidDismiss((data) => {
        this.getownstoryList()
      if(!data){

      }else{
      this.webservice.presentToast('Image upload successfully');
      // this.GetGalleryList();
      this.getpointCount();
      }

      });
    //this.cropImage()
  }, (err) => {
    // Handle error
    })
}


// gallery(){
//   //console.log("work");
//   //this.user=user
//   var type
//   var data
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     mediaType: this.camera.MediaType.ALLMEDIA
//   }
//   this.camera.getPicture(options).then((imageData) => {

//     this.fileName = imageData.split('/')[imageData.split('/').length - 1];
//      var fileext = this.fileName.split(".").pop();
//           console.log("fileext", imageData);
//           if(fileext=='jpeg'||fileext=='jpg'||fileext=='png'){
//            var image = imageData.split('file://');
//             type='image/jpeg'
//              data={
//               'fullPath':imageData,
//               'type':type,
//              }
//              let uploadModal = this.modalCtrl.create("UploadStoryPage", {"res": data});
//              uploadModal.present();
//              uploadModal.onDidDismiss(() => {
//               this.getownstoryList()
//              })
//             }else if(fileext=='MOV'||fileext=='mp4'){
//               type='video/mp4';
//               var video = 'file://'+imageData
//              data={
//               'fullPath':video,
//               'type':type,
//              }
//              let uploadModal = this.modalCtrl.create("UploadStoryPage", {"res": data});
//              uploadModal.present();
//              uploadModal.onDidDismiss(() => {
//               this.getownstoryList()
//              })
//             }
//   }, (err) => {

//   });

// }


videoCapture() {
  var randname=Math.random();
const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  mediaType: this.camera.MediaType.VIDEO,
}

this.camera.getPicture(options).then((imageData) => {
  let fileUri = 'file://'+imageData;
  console.log('imageData',imageData)
  console.log('info',fileUri)
  var option:GetVideoInfoOptions = {
    fileUri:fileUri,
  }
  
//// VIDEO EDIT ////
  this.videoEditor.getVideoInfo(option).then(result=>{
    var size:any
    size =((result.size)/ 1048576).toFixed(2);
    console.log('info',size)
    if(size > 100){
      this.webservice.presentToast('Your video is larger than 100 MB')
    }else{
      var option:CreateThumbnailOptions = {
        fileUri:imageData,
        outputFileName: 'sample'+randname,
        width: 300,
        height: 300,
        quality:100
      }
      this.videoEditor.createThumbnail(option).then(result=>{
        console.log('thumbnail',result)
        localStorage.setItem('imageview',result)
        this.imageview = localStorage.getItem('imageview')
        console.log("imageData",this.imageview)



        let win: any = window;
        var myURL = win.Ionic.WebView.convertFileSrc(result);
        this.captureImage = myURL;
        console.log("this.captureImage=",this.captureImage);



        if(result !=undefined){
          let data={
            'fullPath':imageData,
            'captureImage':this.captureImage,
            'upload':result,
            'imageData':imageData,
            'type':'video',
            'uploadType':'video',
            'profileDetails':this.profileDetails.fullName
          }
          console.log('data',data)
        let uploadModal = this.modalCtrl.create(UploadStoryPage, {"res": data,"converted_image":this.converted_image});
        uploadModal.present();
        uploadModal.onDidDismiss((userdata) => {
          this.getownstoryList()
          console.log('dismis',data)
          if(!data){
            localStorage.removeItem('imageview')
          }else{ 
            localStorage.removeItem('imageview')
            //this.GetGalleryList()
             //this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.videoThumb});
             this.videoProcessing(userdata.data._id)
          }
        });
        
        }
      })
    }
  })
  
 //// video EDIT ////
}, (err) => {
// Handle error
// this._utilityService.hideLoading();
});
}


videoProcessing(id){
  let loader = this.loadingCtrl.create({ 
    spinner:'dots',
    content: 'Processing',
    //showBackdrop:false
  });
  loader.present();    
  this.webservice.imageprocessing(id,this.token).then((response) => {
  console.log('processing',response)
  loader.dismiss();
  this.webservice.presentToast('Video upload successfully');
  // this.GetGalleryList();
  // this.getpointCount();
  // this.perc=0
  }, (error) => {
  
  console.log("error ts: ", error);
  })
  }



// videoCapture(){
//   var randname=Math.random();
//   let options: CaptureVideoOptions = { 
//     limit:1,
//    };
//   this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
//     console.log('video',data)
//     this.storyData = data[0].fullPath;
//     let datas={
//       'fullPath':data[0].fullPath,
//        'type':data[0].type
//     }
//     var url = 'http://18.191.93.75:6018/'+'story/addStory/?token='+ this.token;
//     let uploadModal = this.modalCtrl.create("UploadStoryPage", {"res": datas});
//     uploadModal.present();
//     uploadModal.onDidDismiss(() => {
//       this.getownstoryList()
//      })
  
//   },(err: CaptureError) => {
//     console.error(err)
// });
// }






 


// bacsicsearch() {
//   this.webservice.getData('users/searchbase10/'+'?page='+this.page+'&limit='+this.limit,).then((res:any) => {
//     console.log("serch result", res);


//   })
// }


// bacsicsearch() {

//   return new Promise(resolve => {
//     this.webservice.getData('users/searchbase10/'+'?page='+this.page+'&limit='+this.limit,).then((res:any) => {
//       console.log("serch result", res);
//       this.type=true;
  
//       if(res.success){ 
//         if(res.data.length == 0){
//           //console.log('no image')
//           //this._utilityService.displayToast('No more result');
//           this.hasMoreData = false;
//         }else{
//           this.hasMoreData = true;
//          // this.imageList=response.data.docs;
//           this.listLentgh=res.data.length
          
//           setTimeout(() => {
//             for (var i = 0; i < res.data.length; i++) {
//               if(res.data[i].type =='video'){
//                 this.videoCount++;
//                 if(this.videoCount % 5 == 0){
//                   res.data[i].isMovable = true;
//                 }else{
//                   res.data[i].isMovable = false;
//                 }
//               }
//               this.imageList.push(res.data[i]);
//             }
//             console.log(this.imageList);
//        resolve();
//         }, 500);
//         }
        
//         } 
//         else{
//           this.webservice.presentToast(res.message);
//         }
//     }, (error) => {
//       //this._utilityService.hideLoading();
//       this.app.getRootNav().push('LoginOptionPage');
//        console.log("error ts: ", error);
//   })
//   })
  

// }




//// GET BASIC SEARCH RESULT///
bacsicsearch(){
  // this.imageList=[]
   return new Promise(resolve => {
   //this._utilityService.showLoading();
   console.log(this.page);
   this.webservice.getData('users/searchbase10/'+'?page='+this.page+'&limit='+this.limit,).then((res:any) => {
      // this._utilityService.hideLoading();
       console.log("serch result", res); 
       this.type=true;
       //console.log("type result true", this.type); 
       if(res.success){ 
         if(res.data .length == 0){
           //console.log('no image')
           //this._utilityService.displayToast('No more result');
           this.hasMoreData = false;
         }else{
           this.hasMoreData = true;
          // this.imageList=response.data.docs;
           this.listLentgh=res.data.length
           
           setTimeout(() => {
             for (var i = 0; i < res.data.length; i++) {
               if(res.data[i].type =='video'){
                 this.videoCount++;
                 if(this.videoCount % 5 == 0){
                   res.data[i].isMovable = true;
                 }else{
                   res.data[i].isMovable = false;
                 }
               }
               this.imageList.push(res.data[i]);
               this.styleload();
              //  setTimeout(()=>{
              //   var elem = document.querySelector('.grid');
              //  var msnry = new Masonry(elem, {
              //  // options
              //  itemSelector: '.newGallery',
              //  columnWidth: 10
              //  });
              //  console.log(msnry);
              //  },1000)

             }
             console.log(this.imageList);
        resolve();
         }, 500);
         }
         
         } 
         else{
           this.webservice.presentToast(res.message);
         }
     }, (error) => {
        //this._utilityService.hideLoading();
        // this.app.getRootNav().push('LoginOptionPage');
         console.log("error ts: ", error);
 })
 });
 }

 styleload() {
   console.log("demo");
   
  // setTimeout(()=>{
  //   var elem = document.querySelector('.grid');
  //  var msnry = new Masonry(elem, {
  //  // options
  //  itemSelector: '.newGallery',
  //  columnWidth: 10
  //  });
  //  console.log(msnry);
  //  },1000)
 }



isMove(type,video){
  //console.log(type)
  if(type == 'video'){
    this.videoCount++;
    if(this.videoCount % 5 == 0){
      this.isMovable==true
      console.log('yes')
    }
  }
    return false;
  
    
  
  // console.log(this.videoCount)
  
}

doInfinite(infiniteScroll) {
  this.page++
  console.log('doInfinite page,  '+ this.listLentgh);
  this.bacsicsearch().then((data)=>{
    console.log("data", data);
    infiniteScroll.complete();
});
}



scrollHandler(event) {
  var searchDiv = document.getElementById("searchDiv");
  var search5 = document.getElementById("search5");

  console.log("event=",event.directionY);
  if(event.directionY == "down") {
    console.log("hide searchbar");
    searchDiv.style.display = "none";
  } else if(event.directionY == "up") { 
    console.log("show searchbar");
    searchDiv.style.display = "block"; 
  }
}






gotoPhoto(id,type,i,list) {
  console.log("list=",list);
  if(this.token==null){
    this.navCtrl.push(LoginPage);
  } else {
  if(this.userid != list.userid._id){
    this.gotoPhotoModal(list,i)
  }else{
  //  this.viewCount(list._id)
  this.gotoPhotoModal(list,i)
  // this.selectoption(id,type,i,list)
  }
}
}

selectoption(id,type,i,list) {
  let data = {
    'id':list._id,
    'url':list.path,
    'profile':list.userid,
    'type':list.type,
    'index':i,
    'createdAt':list.createdAt
  }
  const modal = this.modalCtrl.create(EditexploremodalPage,{"id":id,"type":type,"i":i,"list":list,"data":data}); 
  modal.onDidDismiss(data => {
    console.log('check',data);
    this.imageList=[]
    return new Promise(resolve => {
    //this._utilityService.showLoading();
    console.log(this.page);
    this.webservice.getData('users/searchbase10/'+'?page='+this.page+'&limit='+this.limit,).then((res:any) => {
       // this._utilityService.hideLoading();
        console.log("serch result", res); 
        this.type=true;
        //console.log("type result true", this.type); 
        if(res.success){ 
          if(res.data .length == 0){
            //console.log('no image')
            //this._utilityService.displayToast('No more result');
            this.hasMoreData = false;
          }else{
            this.hasMoreData = true;
           // this.imageList=response.data.docs;
            this.listLentgh=res.data.length
            
            setTimeout(() => {
              for (var i = 0; i < res.data.length; i++) {
                if(res.data[i].type =='video'){
                  this.videoCount++;
                  if(this.videoCount % 5 == 0){
                    res.data[i].isMovable = true;
                  }else{
                    res.data[i].isMovable = false;
                  }
                }
                this.imageList.push(res.data[i]);
                this.styleload();
               //  setTimeout(()=>{
               //   var elem = document.querySelector('.grid');
               //  var msnry = new Masonry(elem, {
               //  // options
               //  itemSelector: '.newGallery',
               //  columnWidth: 10
               //  });
               //  console.log(msnry);
               //  },1000)
 
              }
              console.log(this.imageList);
         resolve();
          }, 500);
          }
          
          } 
          else{
            this.webservice.presentToast(res.message);
          }
      }, (error) => {
         //this._utilityService.hideLoading();
         // this.app.getRootNav().push('LoginOptionPage');
          console.log("error ts: ", error);
  })
  });
  });
  modal.present();
}


// selectoption(list,i) {
//   let alert = this.alerCtrl.create({
//     title: 'Please select option',
//     buttons: [
//       {
//         text: 'Explore',
//         role: 'explore',
//         handler: () => {
//           console.log('Explore clicked');
//           let data = {
//             'id':list._id,
//             'url':list.path,
//             'profile':list.userid,
//             'type':list.type,
//             'index':i,
//             'createdAt':list.createdAt
//           }
//           console.log("data=",data);
//           if(this.token==null){
//             this.navCtrl.push(ExplorePage,{"photolist": data})
//           }else{
//           //  this.viewCount(list._id)
//            this.navCtrl.push(ExplorePage,{"photolist": data})
//           }
//         }
//       },
//       {
//         text: 'Delete',
//         handler: () => {
//           console.log('Delete clicked');
//           this.confirmDel(list._id,list.type,i)
//         }
//       }
//     ]
//   });
//   alert.present();
// }



// confirmDel(id,type,i){

//   if(type=='image'){
//     this.delgalleryImage(id,i)
//   }else{
//     this.delgalleryVideo(id,i)
//   }

  
// }




// delgalleryImage(id,i){
  
//   let alert = this.alerCtrl.create({
//     title: 'Are you sure you want to delete your image?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Yes',
//         handler: () => {
//           var count=0
//           //this._utilityService.showLoading();
//              this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
//                //this._utilityService.hideLoading();
//                console.log('remove friend',response)
//                if(response.success){
//                 this.imageList.splice(i,1)
//                 this.webservice.presentToast("You have successfully delete gallery image")
//                }else{
//                 this.webservice.presentToast(response.message)
//                }
//              }, (error) => {
//                   //this._utilityService.hideLoading();
//                  console.log("error ts: ", error);
//            }
//            )
//         }
//       }
//     ]
//   });
//   alert.present();
// }

// delgalleryVideo(id,i){
//   console.log('del')
//   let alert = this.alerCtrl.create({
//     title: 'Are you sure you want to delete your video?',
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Yes',
//         handler: () => {
//           //this._utilityService.showLoading();
//           this.webservice.deleteData('users/deletegallery10/'+id+'?token='+this.token).then((response:any) => {
//                //this._utilityService.hideLoading();
//                console.log('remove friend',response)
//                if(response.success){
//                  this.imageList.splice(i, 1)
//                 this.webservice.presentToast("You have successfully delete gallery video");

//                }else{
//                 this.webservice.presentToast(response.message)
//                }
//              }, (error) => {
//                   //this._utilityService.hideLoading();
//                  console.log("error ts: ", error);
//            }
//            )
//         }
//       }
//     ]
//   });
//   alert.present();
// }


///// GO TO PHOTO MODAL ////
gotoPhotoModal(list,i){
  let data = {
    'id':list._id,
    'url':list.path,
    'profile':list.userid,
    'type':list.type,
    'index':i,
    'createdAt':list.createdAt
  }

  console.log("gotoPhotoModal=",data);
  // this.viewCount(list._id)

  if(this.token==null){
    this.navCtrl.push(ExplorePage,{"photolist": data,"page":"home"})
  }else{
  //  this.viewCount(list._id)
   this.navCtrl.push(ExplorePage,{"photolist": data,"page":"home"})
  }
}


viewCount(id){
  this.webservice.viewCount(this.token,id).then((response) => {
 console.log('res',response)
  })
}


//// GET NOTIFICATION COUNT /////
getnotificationcount(){
  //console.log('tttt',this.long);
  let data={
    'userid':this.userid,
    'lat':this.geoLatitude,
    'long':this.geoLongitude
  }
  this.webservice.postData('users/notificationcount/'+'?token='+ this.token,data).then((response:any) => {
  console.log("response noti count",response);
    if(response.success){ 
      this.noticount=response.data
    }else{
      this.noticount=response.data
    }
}, (error) => {
console.log("error ts: ", error);
})
}


goNoti() {
  this.navCtrl.push(NotificationPage,{'tip':'read'})
}


//// GET POINT COUNT /////
getpointCount(){
  this.webservice.getData('users/getTotalpoint/'+'?token='+ this.token).then((response:any) => {
    
  console.log("getpointCount=",response);
  
    if(this.tips_count_read=='true' && localStorage.getItem('tips')==response.data){
      this.tippoints = 0;
      console.log('tips',this.tippoints,this.tips_count_read)
    }else{
      this.tippoints = response.data
    }
    
  })
}

gopointsHistory() {
  this.navCtrl.push(PointWalletPage,{'tip':'read'})
}


















//// MAP OPEN ////
loadMap(service){
  console.log('service',service)
  var marking =[];
   let modal = this.modalCtrl;
   let popup=this.popoverCtrl;
   this.webservice.presentLoading();
    this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
    this.webservice.hideLoader();
      this.search_lat = position.coords.latitude;
      this.search_long = position.coords.longitude;
      localStorage.setItem('search_lat', this.search_lat);
      localStorage.setItem('search_long', this.search_long);
  });
  let locationOptions = {enableHighAccuracy: true,timeout: 30000,maximumAge: 0};
 
        navigator.geolocation.getCurrentPosition(
 
            (position) => {
              
              //console.log(position.coords);
              //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              this.latLang = {lat: position.coords.latitude, lng: position.coords.longitude};
              console.log("current",this.latLang);
              
                let mapOptions = {
                  center: {lat: position.coords.latitude, lng: position.coords.longitude},
                  //disableDefaultUI: true,
                  zoom:7,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
 
                }
                this.map = new google.maps.Map(this.mapContainer.nativeElement,mapOptions);
              var markers = this.locations.map(function(location,i) {
                console.log('marker',location)
                var markerked =  new google.maps.Marker({
                  position: location,
                  id:location.id,
                  fullName:location.fullName,
                  profilePicture:location.profilePicture,
                  about:location.about
                  //icon:pinImage.url[i % pinImage.url.length],

                  //animation: google.maps.Animation.DROP,
                  //label: labels[i % labels.length]
                });
                // let that = this;
                google.maps.event.addListener(markerked,'click',function() {
                  //that.openBasicModal(markerked.id)
                  console.log('id',markerked)
                  if(service=='service'){
                    modal.create('DetialsModalPage',{'id':markerked.id}).present();
                  }else if(service=='provider'){
                    console.log('provider')
                    console.log('id',markerked)
                  let data={
                    'userid':markerked.id,
                    'fullName':markerked.fullName,
                    'profilePicture':markerked.profilePicture,
                    'about':markerked.about,
                    'type':'serachimage'
                  }
                 popup.create('ProfilepopupPage',{'data':data}).present();
                  }else if(service=='volunteer'){
                    console.log('volunteer')
                    console.log('id',markerked)
                  let data={
                    'userid':markerked.id,
                    'fullName':markerked.fullName,
                    'profilePicture':markerked.profilePicture,
                    'about':markerked.about,
                    'type':'serachimage'
                  }
                 popup.create('ProfilepopupPage',{'data':data}).present();
                  }
                 
                });
                marking.push(markerked)
              });
              console.log(markers);
              this.webservice.hideLoader();
              var markerCluster = new MarkerClusterer(this.map, marking,
                {
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
                console.log(markerCluster);
                this.webservice.hideLoader();
              
            },
 
            (error) => {
             
                console.log(error);
                this.webservice.hideLoader();
            }, locationOptions
        );

}




onSegmentChanged(event){
  if(event==='mapView'){
    this.loadMap(this.searchsection)
    console.log("change",event)
  }

}

// viewCount(id){
//   this.webservice.viewCount('users/createView/'+'?token='+this.token,id ).subscribe((response) => {
//  console.log('viewCount res',response)
//   })
// }




// gotoCurrentpage() {
//   this.navCtrl.push(CurrentpostPage)
// }

gotoHomepage() {
  this.hommepage = true;
  this.currentpostpage = false;
  this.styleload()
  // this.bacsicsearch();
  // this.navCtrl.push(HomePage) 
}




gotoCurrentpage() {
  this.hommepage = false;
  this.currentpostpage = true;
  // this.navCtrl.push(CurrentpostPage)
  this.imageserachwithpagination()
}


imageserachwithpagination() {
  console.log("==============================================================================");
  // this.imageList=[]
  return new Promise(resolve => {
    //this._utilityService.showLoading();
    console.log(this.page);
    this.webservice.getData('users/feedList/'+'?page='+ this.page+'&limit='+ this.limit+'&token='+ this.token,).then((res:any) => {
       // this._utilityService.hideLoading();
        console.log("serch result", res); 
        this.type=true;
        //console.log("type result true", this.type); 
        if(res.success){ 
          if(res.data .length == 0){
            //console.log('no image')
            //this._utilityService.displayToast('No more result');
            this.hasMoreData = false;
          }else{
            this.hasMoreData = true;
           // this.imageList=response.data.docs;
            this.listLentgh=res.data.length
            
            setTimeout(() => {
              for (var i = 0; i < res.data.length; i++) {
                if(res.data[i].type =='video'){
                  this.videoCount++;
                  if(this.videoCount % 5 == 0){
                    res.data[i].isMovable = true;
                  }else{
                    res.data[i].isMovable = false;
                  }
                }
                this.currentimageList.push(res.data[i]);
                this.styleload();
               //  setTimeout(()=>{
               //   var elem = document.querySelector('.grid');
               //  var msnry = new Masonry(elem, {
               //  // options
               //  itemSelector: '.newGallery',
               //  columnWidth: 10
               //  });
               //  console.log(msnry);
               //  },1000)
 
              }
              console.log("currentimageList=",this.currentimageList);
         resolve();
          }, 500);
          }
          
          } 
          else{
            this.webservice.presentToast(res.message);
          }
      }, (error) => {
         //this._utilityService.hideLoading();
         // this.app.getRootNav().push('LoginOptionPage');
          console.log("error ts: ", error);
  })
  });
}





// imageserachwithpagination() {
//   console.log("==============================================================================");
  
//   // this.galleryid=this.photo.id
//   // var firstDataRequired=true
//   this.webservice.presentLoading();

//       // if(this.token==null||this.token==undefined) {
//       //   this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
//       // } else {
//       //   this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
//       // }

//       this.webservice.getData('users/feedList/'+'?page='+ this.page+'&limit='+ this.limit+'&token='+ this.token,).then((res:any) => {
//         if(res){
//           console.log("response=",res);
//           this.webservice.hideLoader();
//           if(res.data.length == 0){
//             console.log('no image')
//             this.hasMoreData = false;
//           } else {
//             this.hasMoreData = true;
//             if(res.likeList!=null||res.likeList!=undefined && res.flagList !=null || res.flagList !=undefined ){
//               this.imageID=res.likeList
//               this.reportid=res.flagList
//             }

//             for (var i = 0; i < res.data.length; i++) {
//               let obj = {...res.data[i]};
//               console.log("Imgobj=",obj._id);

             
//               if(String(res.data[i].gallery.userid.profilePicture).includes('.jpg') || String(res.data[i].gallery.userid.profilePicture).includes('.png') || String(res.data[i].gallery.userid.profilePicture).includes('.JPEG')) {
//                 obj.datatype = "file"

//               } else {
//                 obj.datatype = "base64"
//               }

//               let data={
//                 'imageid':obj._id 
//               }

//               this.webservice.postData('users/showallcomment/'+'?token='+ this.token,data).then((response:any) => {
//                 console.log("comment response=",response);

//                 this.ImageArr = response.data.reverse()
//                 obj.commentData = this.ImageArr[0]
//               })


//               this.currentimageList.push(obj)
//               console.log("this.currentimageList=",this.currentimageList);
//             }
//           }
//         } else {
//           this.webservice.presentToast(res);
//         }
//       })
// }






  // friendsPage(){
  //   // this.navCtrl.setRoot('LoginPage');
  //   this.app.getRootNav().setRoot('FriendsPage');
  // }
  // faq(){
  //   // this.navCtrl.setRoot('LoginPage');
  //   this.app.getRootNav().setRoot('FaqPage');
  // }

  // myWorks(){
  //   this.app.getRootNav().setRoot('MyWorksPage');
  // }

  // search(){
  //   this.app.getRootNav().setRoot('SearchPage');
  // }
  // blockList(){
  //   this.app.getRootNav().setRoot('BlockListPage');
  // }
  //   pointWallet(){
  //   this.app.getRootNav().setRoot('PointWalletPage');
  // }

  // changePassword(){
  //   this.app.getRootNav().setRoot('ChangePasswordPage');
  // }
  // profile(){
  //   this.app.getRootNav().setRoot('ProfilePage');
  // }

  // serviceApply(){
  //   this.app.getRootNav().setRoot('ServiceApplyPage');
  // }
  // disclaimer(){
  //   this.app.getRootNav().setRoot('DisclaimerPage');
  // }

  // token2(){
  //   this.app.getRootNav().setRoot('Token2Page');
  // }
  // shareEarn(){
  //   this.app.getRootNav().setRoot('ShareAndEarnPage');
  // }
  // serviceAvailable(){
  //   this.app.getRootNav().setRoot('ServiceAvailableListPage');
  // }
  // notification(){
  //   this.app.getRootNav().setRoot('NotificationPage');
  // }
  // rating(){
  //   this.app.getRootNav().setRoot('RatingPage');
  // }
  // report(){
  //   this.app.getRootNav().setRoot('ReportPage');
  // }
  // myPost(){
  //   this.app.getRootNav().setRoot('MyPostsPage');
  // }


}




