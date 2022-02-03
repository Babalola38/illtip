import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Events } from 'ionic-angular';
import { FileTransfer,FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer2';
import { NgZone } from '@angular/core';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the StoryuploadloaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-storyuploadloader',
  templateUrl: 'storyuploadloader.html',
  providers: [ FileTransfer ]
})
export class StoryuploadloaderPage {

  photoupload:any;
  perc:any;
  loaderShow:boolean=false
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");

  backtohomepage:boolean = true

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public viewCtrl: ViewController, 
  public ngZone:NgZone,
  private transfer: FileTransfer,
  public events: Events) {
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
      var url = 'http://18.191.93.75:6018/'+'story/addStory/?token='+ this.token;
      console.log()
      localStorage.removeItem('imageview')
            //console.log(data)
            let  options : FileUploadOptions = {
              fileKey: 'video',
              fileName : randname+'.mp4',
              httpMethod : "POST",
              chunkedMode: false,
              params: {
              'title':this.photoupload.title
              }
          };
         console.log("options", options)
         const fileTransfer: FileTransferObject  = this.transfer.create();
          fileTransfer.onProgress((progressEvent) => {
            //this.ngZone.run(() => {
            if (progressEvent.lengthComputable) {
              this.perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)+1;
              console.log('progressEvent',progressEvent)
              } else {
  
            }
          //})
          });
        
          fileTransfer.upload(this.photoupload.imageData, url, options).then((response)=>{
           console.log("add video",response);
            
            let userdata: any = {};


    
            userdata = JSON.parse(response.response);
            console.log("video",userdata)
            if(userdata.success){
              this.viewCtrl.dismiss(userdata);
              this.events.publish('backtohomepage',this.backtohomepage);
  
            }else{
              this.viewCtrl.dismiss();
            }
            //  this.photolist.push({_id: userdata.data._id,type: userdata.data.type,path: userdata.path});
            
          }, (err)=>{
          this.viewCtrl.dismiss();
  
          console.log("err",err);
          });
    }
    else if(this.photoupload.uploadType=='image'){
      
    var URL = 'http://18.191.93.75:6018/'+'story/addStory/?token='+ this.token;


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
              this.navCtrl.setRoot(ProfilePage);
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
  
}
