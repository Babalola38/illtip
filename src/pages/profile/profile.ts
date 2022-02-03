import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Events, Content } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CameraOptions, Camera } from '@ionic-native/camera';
import Masonry from 'masonry-layout';
// import { Crop } from '@ionic-native/crop';

import { VideoEditor,CreateThumbnailOptions,GetVideoInfoOptions } from '@ionic-native/video-editor';
import { ChangePasswordPage } from '../change-password/change-password';
import { ContactPage } from '../contact/contact';
import { MyWorksPage } from '../my-works/my-works';
import { ReportPage } from '../report/report';
import { ShareAndEarnPage } from '../share-and-earn/share-and-earn';
import { FaqPage } from '../faq/faq';
import { MypostPage } from '../mypost/mypost';

import { FileUploadOptions,FileTransferObject,FileTransfer } from "@ionic-native/file-transfer2";
import { SearchPage } from '../search/search';
import { ExplorePage } from '../explore/explore';
import { EditexploremodalPage } from '../editexploremodal/editexploremodal';
import { PointWalletPage } from '../point-wallet/point-wallet';
import { FriendsPage } from '../friends/friends';
import { HelpPage } from '../help/help';
import { PaymenthistoryPage } from '../paymenthistory/paymenthistory';
import { CreatepostPage } from '../createpost/createpost';
import { BlocklistPage } from '../blocklist/blocklist';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[VideoEditor,FileTransfer]
})
export class ProfilePage {
  @ViewChild(Content) content: Content;

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");


  profileDetails:any;
  profilePicture:any;
  base64Data:any;
  converted_image:any;

  userprofilepic:any;

  galleryImage:any;

  photolist:any = [];

  captureImage:any;
  imageview:any={};
  perc:number=0;

  backtopage:any;

  hasMoreData:any;
  listLentgh:any;
  videoCount:any;
  isMovable:boolean;
  page=1;
  limit=12;

  friendCount:any;

  tippoints:any;
  tipsDollar:any;
  storydata:any={};

  profiledetails:any={};

  ratinglist:any=[];

  discount:any;

  TotalDiscount:any;

  Discount:any;

  urls:any;





  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public modalCtrl: ModalController,
    private alerCtrl: AlertController,
    private videoEditor: VideoEditor,
    private loadingCtrl:LoadingController,
    private transfer: FileTransfer,
    public events: Events,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.urls = this.webservice.apiUrl+"uploads/users/"

    this.backtopage = this.navParams.get('back');

    console.log("this.backtopage=",this.backtopage); 

    console.log("localStorage.getItem('discount')=",localStorage.getItem('discount'));

    if(localStorage.getItem('discount') == null) {
      this.TotalDiscount = 0;
    }else {
      this.TotalDiscount = localStorage.getItem('discount');
    }

    this.getpointCount()
    this.getprofiledetails();
    this.GetGalleryList();

    this.getRatingList();

    this.events.subscribe('backtohomepage', backtohomepage =>{
      console.log("backtohomepage=",backtohomepage);
      // this.backtopage = homepage; 
    });

  }

  doBack() {
    console.log("go back");
    
   this.navCtrl.setRoot(HomePage);
    // this.navCtrl.pop();
  }


  doBackSearch() {
    this.navCtrl.setRoot(SearchPage);
  }

  getpointCount(){
    this.webservice.getData('users/getTotalpoint/'+'?token='+ this.token).then((response:any) => {
      this.tippoints = response.data.point;
      this.discount = response.data.discount;
      this.Discount = response.data.discount - this.TotalDiscount;
      // this.tipsDollar=26
      //  this.tipsDollar=((this.tippoints*1)/1000).toFixed(2)
      // console.log('tip count',this.tipsDollar);
      
    })
  }

  getprofiledetails() {
    this.webservice.presentLoading();
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token,).then((res:any) => {
    this.webservice.hideLoader();
      console.log("Service data..=",res);
      this.friendCount = res.friendCount;
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

doEditProfile() {
  // this.navCtrl.setRoot(EditProfilePage);
  console.log("work in pogress");
  
}


presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    // title: 'Modify your album',
    buttons: [
      {
        text: 'Payment history',
        role: 'destructive',
        handler: () => {
          console.log('Destructive clicked');
          this.navCtrl.push(PaymenthistoryPage);
        }
      },{
        text: 'Report',
        handler: () => {
          console.log('Archive clicked');
          this.navCtrl.push(ReportPage);
        }
      },{
        text: 'Update Profile',
        handler: () => {
          console.log('Update Profile');
          this.navCtrl.push(EditProfilePage);
        }
      },{
        text: 'My Work',
        handler: () => {
          console.log('My Work');
          this.navCtrl.push(MyWorksPage);
        }
      },{
        text: 'service accepted',
        handler: () => {
          console.log('My Work');
          this.navCtrl.push(MypostPage);
        }
      },{
        text: 'Change Password',
        handler: () => {
          console.log('change password,');
          this.navCtrl.push(ChangePasswordPage);
        }
      },
      // {
      //   text: 'App Ratings',
      //   handler: () => {
      //     console.log('Archive clicked');
      //   }
      // },
      {
        text: 'Help',
        handler: () => {
          console.log('Archive clicked');
          this.navCtrl.push(HelpPage,{"pagename": 'Help'});
        }
      },{
        text: 'FAQ',
        handler: () => {
          console.log('FAQ clicked');
          this.navCtrl.push(FaqPage);
        }
      },{
        text: 'Share Get Deals & Earn',
        handler: () => {
          console.log('Archive clicked');
          this.navCtrl.push(ShareAndEarnPage);
        }
      },{
        text: 'Blocking',
        handler: () => {
          console.log('Blocking clicked');
          this.navCtrl.push(BlocklistPage);
        }
      },{
        text: 'Log out',
        handler: () => {
          console.log('logout clicked');
          this.LogOut();
        }
      },{
        text: 'Contact Us',
        handler: () => {
          console.log('Contact Us');
          this.navCtrl.push(HelpPage,{"pagename": 'Contact Us'});
        }
      }
    ]
  });
  actionSheet.present();
}


LogOut(){
  let token=localStorage.getItem('access-token-illTip')
  console.log("token",token)

      localStorage.removeItem('access-token-illTip');
      localStorage.removeItem('loginuserId'); 
      localStorage.removeItem('tokbox_apiKey');
      localStorage.removeItem('tokbox_session');
      localStorage.setItem('tokbox_status','offline');
      localStorage.removeItem('tokbox_token');
      localStorage.removeItem('tokbox_sessionId');
      localStorage.removeItem('opentok_client_id');

      this.navCtrl.setRoot(HomePage);
}


/////////////GET GALLERY LIST///////////////

GetGalleryList(){
  return new Promise(resolve => {

    // this.webservice.getData('users/gallerylist/'+'?token='+ this.token,'&limit='+this.limit,).then((res:any) => {
    this.webservice.getGalleryData('users/gallerylist/'+'?token='+ this.token,+'&page='+this.page+'&limit='+this.limit,).then((res:any) => {
    console.log("response GetGalleryList", res);

    if(res.success){
      if(res.data.length  == 0){
        this.webservice.presentToast("No photo uploaded yet!");
        this.hasMoreData = false;
      }else{
        // this.photolist = res.data;
        // this.hasMoreData = true;
        this.hasMoreData = true;
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
             this.photolist.push(res.data[i]);
             this.styleload()
            //  setTimeout(()=>{
            //    console.log('hi hi hi hi hi')
            //   var elem = document.querySelector('.grid');
            //  var msnry = new Masonry(elem, {
            //  // options
            //  itemSelector: '.galleryVideo',
            //  columnWidth: 10
            //  });
            //  console.log(msnry);
            //  },1000)
           }
           console.log(this.photolist);
      // resolve();
       }, 500);
      }

    }else{
        console.log("err", res.messege);
        this.webservice.presentToast(res.message);
    }

  }, (error) => {
        console.log("error ts: ", error);
  })  

});
  
}

styleload() {
  console.log("demo");
  // setTimeout(()=>{
  //   console.log('hi hi hi hi hi')
  //  var elem = document.querySelector('.grid');
  // var msnry = new Masonry(elem, {
  // // options
  // itemSelector: '.galleryVideo',
  // columnWidth: 10
  // });
  // console.log(msnry);
  // },1000)
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
  this.GetGalleryList().then((data)=>{
    console.log("data", data);
    infiniteScroll.complete();
});
  
 
}



AddPhotoorVideo() {
  const actionSheet = this.actionSheetCtrl.create({
    // title: 'Modify your album',
    buttons: [
      {
        text: 'Camera',
        handler: () => {
          console.log('Destructive clicked');
          this.Addphoto();
          // this.permission()
        }
      },{
        text: 'Video',
        handler: () => {
          console.log('Archive clicked');
          this.AddVideo();
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



// AddPhotoorVideo() {
//   const alert = this.alerCtrl.create({
//     cssClass: 'photo-video-alert',
//     title: 'Select option!',
//     // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
//     buttons: [
//       {
//         text: '',
//         cssClass: 'photo-btn button',
//         handler: data => {
//           console.log('Add photo clicked');
//           this.Addphoto();
//         }
//       },
//       {
//         text: '',
//         cssClass: 'video-btn button',
//         handler: data => {
//           console.log('Add Video clicked');
//           this.AddVideo();
//         }
//       }
//     ]
//   });
//   alert.present();
// }

Addphoto(){
  console.log("Addphoto");
  

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
          'captureImage':this.captureImage,
          'imageData':imageData,
          'upload':imageData,
          'type':'image',
          'uploadType':'image'
          }
          // let uploadModal = this.modalCtrl.create("CreatepostPage", {"res": data});
          let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});

          uploadModal.present();
          uploadModal.onDidDismiss((data) => {
          if(!data){

          }else{
          this.webservice.presentToast('Image upload successfully');
          // this.GetGalleryList();
          this.styleload();
          this.getpointCount();
          }

          });
        //this.cropImage()
      }, (err) => {
        // Handle error
        })
}























AddVideo(){
  console.log("AddVideo");

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
            'captureImage':this.captureImage,
            'upload':result,
            'imageData':imageData,
            'type':'image',
            'uploadType':'video'
          }
          console.log('data',data)
        let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});
        uploadModal.present();
        uploadModal.onDidDismiss((userdata) => {
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
this.styleload();
this.getpointCount();
this.perc=0
}, (error) => {

console.log("error ts: ", error);
})
}




//////////////ADD Video////////////////

// AddVideo(){
//   var randname=Math.random();
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     mediaType: this.camera.MediaType.VIDEO,
//   }

//   this.camera.getPicture(options).then((imageData) => {
//     let fileUri = 'file://'+imageData
//     console.log('info',fileUri)
//     var option:GetVideoInfoOptions = {
//       fileUri:fileUri,
//     }
    
// //// VIDEO EDIT ////
//     this.videoEditor.getVideoInfo(option).then(result=>{
//       var size:any
//       size =((result.size)/ 1048576).toFixed(2);
//       console.log('info',size)
//       if(size > 100){
//         this.webservice.presentToast('Your photo is larger than 100 MB')
//       }else{
//         var option:CreateThumbnailOptions = {
//           fileUri:imageData,
//           outputFileName: 'sample'+randname,
//           width: 300,
//           height: 300,
//           quality:100
//         }
//         this.videoEditor.createThumbnail(option).then(result=>{
//           console.log('thumbnail',result)
//           localStorage.setItem('imageview',result)
//           this.imageview=localStorage.getItem('imageview')
//           console.log("imageData",this.imageview)
//           if(result !=undefined){
//             let data={
//               'captureImage':this.captureImage,
//               'upload':result,
//               'imageData':imageData,
//               'type':'image',
//               'uploadType':'video'
//             }
//             console.log('data',data)
//           let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});
//           uploadModal.present();
//           uploadModal.onDidDismiss((userdata) => {
//             console.log('dismis',data)
//             if(!data){
//               localStorage.removeItem('imageview')
//             }else{ 
//               localStorage.removeItem('imageview')
//               //this.GetGalleryList()
//                //this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.videoThumb});
//                this.videoProcessing(userdata.data._id)
//             }
//           });
          
//           }
//         })
//       }
//     })
    
//    //// video EDIT ////
//   }, (err) => {
//   // Handle error
//   this.webservice.hideLoader();
//   });

// }

// videoProcessing(id){
//   let loader = this.loadingCtrl.create({ 
//     spinner:'dots',
//     content: 'Processing',
//     //showBackdrop:false
// });
// loader.present();    
// this.webservice.imageprocessing(id,this.token).then((response) => {
// console.log('processing',response)
// loader.dismiss();
// this.webservice.presentToast('Video upload successfully');
// this.GetGalleryList();
// this.getpointCount();
// this.perc=0
//   }, (error) => {

//   console.log("error ts: ", error);
//   })
// }





// AddVideo(){
//   console.log("AddVideo");

// var randname=Math.random();
// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//   mediaType: this.camera.MediaType.VIDEO,
// }

// this.camera.getPicture(options).then((imageData) => {
//   let fileUri = 'file://'+imageData;
//   console.log('imageData',imageData)
//   console.log('info',fileUri)
//   var option:GetVideoInfoOptions = {
//     fileUri:fileUri,
//   }
  
// //// VIDEO EDIT ////
//   this.videoEditor.getVideoInfo(option).then(result=>{
//     var size:any
//     size =((result.size)/ 1048576).toFixed(2);
//     console.log('info',size)
//     if(size > 100){
//       this.webservice.presentToast('Your video is larger than 100 MB')
//     }else{
//       var option:CreateThumbnailOptions = {
//         fileUri:imageData,
//         outputFileName: 'sample'+randname,
//         width: 300,
//         height: 300,
//         quality:100
//       }
//       this.videoEditor.createThumbnail(option).then(result=>{
//         console.log('thumbnail',result)
//         localStorage.setItem('imageview',result)
//         this.imageview = localStorage.getItem('imageview')
//         console.log("imageData",this.imageview)



//         let win: any = window;
//         var myURL = win.Ionic.WebView.convertFileSrc(result);
//         this.captureImage = myURL;
//         console.log("this.captureImage=",this.captureImage);



//         if(result !=undefined){
//           let data={
//             'captureImage':this.captureImage,
//             'upload':result,
//             'imageData':imageData,
//             'type':'video',
//             'uploadType':'video'
//           }
//           console.log('data',data)
//         let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});
//         uploadModal.present();
//         uploadModal.onDidDismiss((userdata) => {
//           console.log('dismis 589',userdata)
//           if(!userdata){
//             localStorage.removeItem('imageview')
//           }else{ 
//             localStorage.removeItem('imageview')
//             //this.GetGalleryList()
//              //this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.videoThumb});
//              this.videoProcessing(userdata.data._id)
//           }
//         });
        
//         }
//       })
//     }
//   })
  
//  //// video EDIT ////
// }, (err) => {
// // Handle error
// // this._utilityService.hideLoading();
// });

// }

// videoProcessing(id){
// let loader = this.loadingCtrl.create({ 
//   spinner:'dots',
//   content: 'Processing',
//   //showBackdrop:false
// });
// loader.present();    
// this.webservice.imageprocessing(id,this.token).then((response) => {
// console.log('processing',response)
// loader.dismiss();
// this.webservice.presentToast('Video upload successfully');
// // this.GetGalleryList();
// this.styleload();
// this.getpointCount();
// this.perc=0
// }, (error) => {

// console.log("error ts: ", error);
// })
// }


// //////////////ADD Video END////////////////






// cropImage(){
//   console.log('ok')
//   var options = {
//     quality: 100,
//     targetHeight:500,
//     targetWidth:800,               
//   };
//   this.crop.crop(this.galleryImage,options).then(res =>{
//     if(res !=undefined){
//           let data={
//           'imageData':res,
//           'upload':res,
//           'type':'image',
//           'uploadType':'image'
//           }
//           let uploadModal = this.modalCtrl.create("CreatepostPage", {"res": data});
//           uploadModal.present();
//           uploadModal.onDidDismiss((data) => {
//           if(!data){

//           }else{
//           this.webservice.presentToast('Image upload successfully');
//           // this.GetGalleryList();
//           // this.getpointCount();
//           }

//           });
//     }
//   },err =>{
//     //this.job_image=null
//     console.log('error'+err)
//   })

// }

//   //////////////ADD PHOTO////////////////

//////////////ADD Video////////////////

// AddVideo(){
//   console.log("AddVideo");

// var randname=Math.random();
// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//   mediaType: this.camera.MediaType.VIDEO,
// }

// this.camera.getPicture(options).then((imageData) => {
//   let fileUri = 'file://'+imageData;
//   console.log('imageData',imageData)
//   console.log('info',fileUri)
//   var option:GetVideoInfoOptions = {
//     fileUri:fileUri,
//   }
  
// //// VIDEO EDIT ////
//   this.videoEditor.getVideoInfo(option).then(result=>{
//     var size:any
//     size =((result.size)/ 1048576).toFixed(2);
//     console.log('info',size)
//     if(size > 100){
//       this.webservice.presentToast('Your video is larger than 100 MB')
//     }else{
//       var option:CreateThumbnailOptions = {
//         fileUri:imageData,
//         outputFileName: 'sample'+randname,
//         width: 300,
//         height: 300,
//         quality:100
//       }
//       this.videoEditor.createThumbnail(option).then(result=>{
//         console.log('thumbnail',result)
//         localStorage.setItem('imageview',result)
//         this.imageview = localStorage.getItem('imageview')
//         console.log("imageData",this.imageview)



//         let win: any = window;
//         var myURL = win.Ionic.WebView.convertFileSrc(result);
//         this.captureImage = myURL;
//         console.log("this.captureImage=",this.captureImage);



//         if(result !=undefined){
//           let data={
//             'captureImage':this.captureImage,
//             'upload':result,
//             'imageData':imageData,
//             'type':'video',
//             'uploadType':'video'
//           }
//           console.log('data',data)
//         let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});
//         uploadModal.present();
//         uploadModal.onDidDismiss((userdata) => {
//           console.log('dismis',data)
//           if(!data){
//             localStorage.removeItem('imageview')
//           }else{ 
//             localStorage.removeItem('imageview')
//             //this.GetGalleryList()
//              //this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.videoThumb});
//              this.videoProcessing(userdata.data._id)
//           }
//         });
        
//         }
//       })
//     }
//   })
  
//  //// video EDIT ////
// }, (err) => {
// // Handle error
// // this._utilityService.hideLoading();
// });

// }






// AddVideo(){
//   console.log("AddVideo");

// var randname=Math.random();
// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//   mediaType: this.camera.MediaType.VIDEO,
// }

// this.camera.getPicture(options).then((imageData) => {
//   let fileUri = 'file://'+imageData;
//   console.log('imageData',imageData)
//   console.log('info',fileUri)
//   var option:GetVideoInfoOptions = {
//     fileUri:fileUri,
//   }
  
// //// VIDEO EDIT ////
//   this.videoEditor.getVideoInfo(option).then(result=>{
//     var size:any
//     size =((result.size)/ 1048576).toFixed(2);
//     console.log('info',size)
//     if(size > 100){
//       this.webservice.presentToast('Your video is larger than 100 MB')
//     }else{
//       var option:CreateThumbnailOptions = {
//         fileUri:imageData,
//         outputFileName: 'sample'+randname,
//         width: 300,
//         height: 300,
//         quality:100
//       }
//       this.videoEditor.createThumbnail(option).then(result=>{
//         console.log('thumbnail',result)
//         localStorage.setItem('imageview',result)
//         this.imageview = localStorage.getItem('imageview')
//         console.log("imageData",this.imageview)



//         let win: any = window;
//         var myURL = win.Ionic.WebView.convertFileSrc(result);
//         this.captureImage = myURL;
//         console.log("this.captureImage=",this.captureImage);



//         if(result !=undefined){
//           let data={
//             'captureImage':this.captureImage,
//             'upload':result,
//             'imageData':imageData,
//             'type':'image',
//             'uploadType':'video'
//           }
//           console.log('data',data)
//         let uploadModal = this.modalCtrl.create(CreatepostPage, {"res": data});
//         uploadModal.present();
//         uploadModal.onDidDismiss((userdata) => {
//           console.log('dismis',data)
//           if(!data){
//             localStorage.removeItem('imageview')
//           }else{ 
//             localStorage.removeItem('imageview')
//             //this.GetGalleryList()
//              //this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.videoThumb});
//              this.videoProcessing(userdata.data._id)
//           }
//         });
        
//         }
//       })
//     }
//   })
  
//  //// video EDIT ////
// }, (err) => {
// // Handle error
// // this._utilityService.hideLoading();
// });

// }

// videoProcessing(id){
// let loader = this.loadingCtrl.create({ 
//   spinner:'dots',
//   content: 'Processing',
//   //showBackdrop:false
// });
// loader.present();    
// this.webservice.imageprocessing(id,this.token).then((response) => {
// console.log('processing',response)
// loader.dismiss();
// this.webservice.presentToast('Video upload successfully');
// // this.GetGalleryList();
// this.styleload();
// this.getpointCount();
// this.perc=0
// }, (error) => {

// console.log("error ts: ", error);
// })
// }


// //////////////ADD Video END////////////////

scrollTo(){
  this.content.scrollToBottom();
}

up(){
  this.content.scrollToTop();
}



















AddProfile() {
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
    console.log('imageData',imageData);
    this.uploadProfileImage(imageData);

    // let win: any = window;
    // var myURL = win.Ionic.WebView.convertFileSrc(imageData);
    // this.captureImage = myURL;
    // console.log("this.captureImage=",this.captureImage);
  })
}

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
    console.log('imageData',imageData);
    this.uploadProfileImage(imageData);

    // let win: any = window;
    // var myURL = win.Ionic.WebView.convertFileSrc(imageData);
    // this.captureImage = myURL;
    // console.log("this.captureImage=",this.captureImage);
  }) 
}



uploadProfileImage(imageData) {
  console.log("imageData=",imageData);
  
  let  options : FileUploadOptions = {
    fileKey: 'image',
    fileName : 'jpg',
    mimeType : "image/jpeg",
    httpMethod : "POST",
    chunkedMode: false
  };
  console.log(options);

  const fileTransfer: FileTransferObject = this.transfer.create();
  this.webservice.presentLoading();
  fileTransfer.upload(imageData, this.webservice.apiUrl + 'users/uploadimage/?type=user&id='+this.userid+'&token='+ this.token, options).then((response)=>{
    this.webservice.hideLoader();
    console.log("ok profile image",response);
    let userdata: any = {};

    userdata = JSON.parse(response.response);
    this.profiledetails.profilePicture = userdata.data;
    // var Purl = userdata.data;
    //  this.converted_image=Purl.substring(Purl.lastIndexOf('/')+1);
    this.converted_image = this.profiledetails.profilePicture;

    console.log(this.converted_image);    
     this.getpointCount();
  },(err)=>{
    console.log(err);
     this.webservice.hideLoader();
    })
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

  this.navCtrl.push(ExplorePage,{"photolist": data,"page":"profile"});
}






goPointWallet() {
  this.navCtrl.push(PointWalletPage)
}

gotoFriendlist(){
    this.navCtrl.push(FriendsPage,{'id':this.profileDetails._id,'removeFriend': 'yes'})
}

goChat() {
  this.navCtrl.push(ContactPage)
}

getRatingList(){
  let data={
    'userId':this.userid
  }

this.webservice.ratingList(this.token,data).then((response:any) => {

    console.log("rating list", response); 
    if(response.success){ 
      // this.ratinglist=response.data;

      for (var i = 0; i < response.data.length; i++) {
        let obj = {...response.data[i]};

        if(String(response.data[i].provider_id.profilePicture).includes('.jpg') || String(response.data[i].provider_id.profilePicture).includes('.png') || String(response.data[i].provider_id.profilePicture).includes('.JPEG')) {
          obj.datatype = "file"

        } else {
          obj.datatype = "base64"
        }

        this.ratinglist.push(obj);
        console.log("this.ratinglist=",this.ratinglist);
      }
      
    }  
  }, (error) => {
    console.log("error ts: ", error);
})
}










// selectoption(id,type,i,list) {
//           let data = {
//             'id':list._id,
//             'url':list.path,
//             'profile':list.userid,
//             'type':list.type,
//             'index':i,
//             'createdAt':list.createdAt
//           }
//           const modal = this.modalCtrl.create(EditexploremodalPage,{"id":id,"type":type,"i":i,"list":list,"data":data}); 
//           modal.onDidDismiss(data => {
//             console.log('check',data);
//             this.photolist = [];
//             return new Promise(resolve => {

//               // this.webservice.getData('users/gallerylist/'+'?token='+ this.token,'&limit='+this.limit,).then((res:any) => {
//               this.webservice.getGalleryData('users/gallerylist/'+'?token='+ this.token,+'&page='+this.page+'&limit='+this.limit,).then((res:any) => {
//               console.log("response GetGalleryList", res);
          
//               if(res.success){
//                 if(res.data.length  == 0){
//                   this.webservice.presentToast("No photo uploaded yet!");
//                   this.hasMoreData = false;
//                 }else{
//                   // this.photolist = res.data;
//                   // this.hasMoreData = true;
//                   this.hasMoreData = true;
//                    this.listLentgh=res.data.length
                   
//                    setTimeout(() => {
//                      for (var i = 0; i < res.data.length; i++) {
//                        if(res.data[i].type =='video'){
//                          this.videoCount++;
//                          if(this.videoCount % 5 == 0){
//                            res.data[i].isMovable = true;
//                          }else{
//                            res.data[i].isMovable = false;
//                          }
//                        }
//                        this.photolist.push(res.data[i]);
//                        this.styleload()
//                       //  setTimeout(()=>{
//                       //    console.log('hi hi hi hi hi')
//                       //   var elem = document.querySelector('.grid');
//                       //  var msnry = new Masonry(elem, {
//                       //  // options
//                       //  itemSelector: '.galleryVideo',
//                       //  columnWidth: 10
//                       //  });
//                       //  console.log(msnry);
//                       //  },1000)
//                      }
//                      console.log(this.photolist);
//                 resolve();
//                  }, 500);
//                 }
          
//               }else{
//                   console.log("err", res.messege);
//                   this.webservice.presentToast(res.message);
//               }
          
//             }, (error) => {
//                   console.log("error ts: ", error);
//             })  
          
//           });            
//           })
//           modal.present();
// }



// selectoption(id,type,i,list) {
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
//           this.confirmDel(id,type,i)
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
//                 this.photolist.splice(i,1)
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
//                  this.photolist.splice(i, 1)
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



// Imagecapture() {
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.CAMERA,
//     encodingType: this.camera.EncodingType.JPEG,
//     allowEdit : true,
//     correctOrientation:true

//   }

//   this.camera.getPicture(options).then((imageData) => {
//     console.log('imageData',imageData)

//     // let win: any = window;
//     // var myURL = win.Ionic.WebView.convertFileSrc(imageData);
//     // this.captureImage = myURL;
//     // console.log("this.captureImage=",this.captureImage);

//     // let data={
//     //   'fullPath':imageData,
//     //   'captureImage':this.captureImage,
//     //   'imageData':imageData,
//     //   'upload':imageData,
//     //   'type':'image',
//     //   'uploadType':'image',
//     //   'profileDetails':this.profileDetails.fullName
//     //   }
//     //   console.log("upload image=",data);
//       this.uploadProfileImage(imageData);

      

//     //this.cropImage()
//   }, (err) => {
//     // Handle error
//     })
//  }









//  gallery() {
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     encodingType: this.camera.EncodingType.JPEG,
//     allowEdit : true,
//     correctOrientation:true

//   }

//   this.camera.getPicture(options).then((imageData) => {
//     console.log('imageData',imageData)

//     // let win: any = window;
//     // var myURL = win.Ionic.WebView.convertFileSrc(imageData);
//     // this.captureImage = myURL;
//     // console.log("this.captureImage=",this.captureImage);

//     // let data={
//     //   'fullPath':imageData,
//     //   'captureImage':this.captureImage,
//     //   'imageData':imageData,
//     //   'upload':imageData,
//     //   'type':'image',
//     //   'uploadType':'image',
//     //   'profileDetails':this.profileDetails.fullName
//     //   }
//     //   console.log("upload profile image=",data);
//       this.uploadProfileImage(imageData);
      
//     //this.cropImage()
//   }, (err) => {
//     // Handle error
//     })
// }


// uploadProfileImage(imageData) {
//   // this.storydata = data
//   // var URL = this.webservice.apiUrl+'story/addStory/?token='+ this.token;
//   var URL = this.webservice.apiUrl+'users/uploadimage/?type=user&id='+this.userid+'&token='+ this.token 

//   // var randname=Math.random();

//   let options: FileUploadOptions = {
//     fileKey: 'file',
//     fileName:'jpg',
//     mimeType : "image/jpeg",
//     httpMethod : "POST",
//     chunkedMode: false,
//   }
//   console.log(options)
//   const fileTransfer: FileTransferObject = this.transfer.create();
//   // fileTransfer.onProgress((progressEvent) => {
//   //   if (progressEvent.lengthComputable) {
//   //     this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
//   //     console.log('progressEvent',this.perc)
//   //   } else {
//   //   }
//   // });
  
//   fileTransfer.upload(imageData,URL, options)
//   .then((data) => {
//     //this._utilityService.showLoading();
//     console.log('after trnas',options,data)
//       let userdata: any = {};
//       userdata = JSON.parse(data.response);
//       console.log("image",userdata)
//       if(userdata.success){
//         this.webservice.presentToast('Profile Image change success')
//         console.log("image upload success=",userdata);
//         // this.converimage(userdata.data._id)

//       }else{
//         // this.viewCtrl.dismiss();
//       }
        
//   }, (err) => {
//     // this.viewCtrl.dismiss();
//     this.webservice.presentToast('Image upload failed')
//     console.log("Image upload failed=",err)
//   })
// }




}
