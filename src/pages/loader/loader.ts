import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Events } from 'ionic-angular';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer2';
import { NgZone } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { WebserviceProvider } from '../../providers/webservice/webservice';

/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
  providers: [ FileTransfer ]
})
export class LoaderPage {
  photoupload:any;
  perc:any;
  loaderShow:boolean=false
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");

  backtohomepage:boolean = true

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  // private _appService: AppService, 
  public viewCtrl: ViewController, 
  public ngZone:NgZone,
  private transfer: FileTransfer,
  public events: Events,
  public webservice: WebserviceProvider) {
    this.photoupload=this.navParams.get('res')
    console.log('data',this.photoupload)
    this.perc=0;
    this.loaderShow=false
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoaderPage');
    this.loadfile()
  }

  loadfile(){
    
    var randname=Math.random();
    if(this.photoupload.uploadType=='video'){
      console.log("come in video section");
      
      // var url = this.webservice.apiUrl+'users/uploadgalleryvideo/'+'?token='+ this.token;
      var url = this.webservice.apiUrl+'users/uploadgalleryvideo/'+'?token='+ this.token;
      console.log()
      localStorage.removeItem('imageview')
            //console.log(data)
            let  options : FileUploadOptions = {
              fileKey: 'video',
              fileName : randname+'.mp4',
              mimeType : "video/mp4",
              httpMethod : "POST",
              chunkedMode: false,
              params: {
              'title':this.photoupload.title
              }
          };
         console.log("options", options)





         const fileTransfer: FileTransferObject = this.transfer.create();
         fileTransfer.onProgress((progressEvent) => {
           if (progressEvent.lengthComputable) {
             this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
             console.log('progressEvent',this.perc)
           } else {
           }
         });

         console.log("this.photoupload.imageData=",this.photoupload.imageData);
         console.log("url=",url);
         console.log("options=",options);

         

         fileTransfer.upload(this.photoupload.imageData,url, options)
         .then((data) => {
           console.log('after trnas',options,data)
             let userdata: any = {};
             userdata = JSON.parse(data.response);
             console.log("image",userdata)
             if(userdata.success){
              this.viewCtrl.dismiss(userdata);
              this.navCtrl.setRoot(ProfilePage, {"back": "homepage"});
              this.events.publish('backtohomepage',this.backtohomepage);
  
   
             }else{
               this.viewCtrl.dismiss();
             }
               
         }, (err) => {
           this.viewCtrl.dismiss();
          //  this.webservice.presentToast('Video upload failed')
           console.log(err)
         })


    // ==========================================================

        //  const fileTransfer: FileTransferObject  = this.transfer.create();
        //   fileTransfer.onProgress((progressEvent) => {
        //     //this.ngZone.run(() => {
        //     if (progressEvent.lengthComputable) {
        //       this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
        //       console.log('progressEvent',progressEvent)
        //       } else {
  
        //     }
        //   //})
        //   });
        
        //   fileTransfer.upload(this.photoupload.imageData, url, options).then((response)=>{
        //    console.log("add video",response);
            
        //     let userdata: any = {};


    
        //     userdata = JSON.parse(response.response);
        //     console.log("video",userdata)
        //     if(userdata.success){
        //       this.viewCtrl.dismiss(userdata);
        //       this.events.publish('backtohomepage',this.backtohomepage);
  
        //     }else{
        //       this.viewCtrl.dismiss();
        //     }
        //     //  this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.path});
            
        //   }, (err)=>{
        //   this.viewCtrl.dismiss();
  
        //   console.log("err",err);
        //   });
    }
    else if(this.photoupload.uploadType=='image'){
      
    var URL = 'http://18.191.93.75:6018/'+'users/uploadgalleryimage/?token='+ this.token;

    //this._utilityService.showLoading();
    //var randname=Math.random();
    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName:randname+'.jpg',
      mimeType : "image/jpeg",
      httpMethod : "POST",
      chunkedMode: false,
       params: {
        'title':this.photoupload.title,
      }
    }
    console.log(options)
    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.onProgress((progressEvent) => {
      if (progressEvent.lengthComputable) {
        this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
        console.log('progressEvent',this.perc)
      } else {
      }
    });
    
    fileTransfer.upload(this.photoupload.imageData,URL, options)
    .then((data) => {
      //this._utilityService.showLoading();
      console.log('after trnas',options,data)
        let userdata: any = {};
        userdata = JSON.parse(data.response);
        console.log("image",userdata)
            if(userdata.success){
              this.viewCtrl.dismiss(userdata);
              this.navCtrl.setRoot(ProfilePage, {"back": "homepage"});
              this.events.publish('backtohomepage',this.backtohomepage);
  
            }else{
              this.viewCtrl.dismiss();
            }
            //  this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.path});
          
    }, (err) => {
     
      console.log("image uploading error",err)
    })
    }
   
  }



  loadimage(){
    // console.log(data)
    // var url = CONFIG.API_ENDPOINT+'users/uploadgalleryimage/'+'?title='+data.title+'&description='+data.description+'&token='+ this.token;
    // console.log('after crop',res)
    // //this._utilityService.showLoading();
    // var randname=Math.random();
    // let options: FileUploadOptions = {
    //   fileKey: 'image',
    //   fileName:randname+'.jpg',
    //   mimeType : "image/jpeg",
    //   httpMethod : "POST",
    //   chunkedMode: false
    // }
    // const fileTransfer: FileTransferObject = this.transfer.create();
    // fileTransfer.onProgress((progressEvent) => {
    //   if (progressEvent.lengthComputable) {
    //     this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
    //     console.log('progressEvent',this.perc)
    //   } else {
    //   }
    // });
    
    // fileTransfer.upload(res, url, options)
    // .then((data) => {
    //   //this._utilityService.showLoading();
    //   console.log('after trnas',options,data)
    //     let userdata: any = {};
    //     userdata = JSON.parse(data.response);
    //     console.log("userdata",userdata);

    //    this.photolist.push({path: userdata.path, _id: userdata.data._id,type: userdata.data.type});
    //    //this._utilityService.hideLoading();
    //    this.GetGalleryList()
    //    console.log("photolist",this.photolist);
          
    // }, (err) => {
     
    //   console.log(err)
    // })
  }


  // videoProcessing(userdata){
  // this.loaderShow=true
  
  // console.log('this.loaderShow2',this.loaderShow)
  //   this._appService.imageprocessing(userdata.data._id,this.token).subscribe((response) => {
  // console.log('processing',response)

  // if(response.success){
  //   this.loaderShow=false
  //  // this.viewCtrl.dismiss(userdata);
  //   console.log('this.loaderShow2',this.loaderShow)
  // }
  // //loader.dismiss();
  // //this.GetGalleryList()
  
  //   }, (error) => {
  
  //   console.log("error ts: ", error);
  //   })
  // }

  

}
