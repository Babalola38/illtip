import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer2';
import { FileTransfer } from "@ionic-native/file-transfer2";
import { File } from '@ionic-native/file';
import { HomePage } from '../home/home';
/**
 * Generated class for the UploadStoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upload-story',
  templateUrl: 'upload-story.html',
  providers: [FileTransfer, File]
})
export class UploadStoryPage {

  storydata:any={};
  story:any;
  converted_image:any;
  profileName:any;
  perc:any;

  loader:boolean=false;

  public token = localStorage.getItem('access-token-illTip');


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private webservice:WebserviceProvider,
    public modalCtrl: ModalController,
    private transfer: FileTransfer) {
      this.perc=0;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadStoryPage');
    this.storydata=this.navParams.get('res');
    this.converted_image=this.navParams.get('converted_image');

    console.log("this.storydata=",this.storydata);
    console.log("this.converted_image=",this.converted_image);

    this.story = this.storydata.captureImage
  }

  // dismiss(){
  //   this.viewCtrl.dismiss();
  // }

  // shareStory(){
    
  //   if(this.storydata.comment==undefined||this.storydata.comment==''||this.storydata.comment==null){
  //     this.webservice.presentToast("Please add title");
  //    }else if(this.storydata.comment.length >130){
  //      this.webservice.presentToast("Title should not exceed 130 characters");
  //    }else{
  //      console.log(this.storydata)
  //      let data={
  //        'imageData': this.story,
  //        'title':this.storydata.comment,
  //        //'description':this.upload.description,
  //        'uploadType':this.storydata.uploadType
  //      }
  //      console.log("upload data=",data);
       
  //      let loader = this.modalCtrl.create("StoryuploadloaderPage", {"res": data});
  //        loader.present();  
  //        this.storydata.comment="";
  //        this.storydata.description="";
  //        loader.onDidDismiss((userdata) => {
  //          console.log('dismis',userdata)
  //          if(!data){
  //            //localStorage.removeItem('imageview')
  //          }else{ 
  //            this.viewCtrl.dismiss(userdata);
  //          }
          
  //        });
  //   }
  // }





  shareStory(){
    this.loader = true;
    console.log("shareStory coming");
    
    var url = this.webservice.apiUrl+'story/addStory/?token='+ this.token;
    if(this.storydata.type=='video'){
    console.log("shareStory coming video");
     
      var randname=Math.random();
  
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName : randname+'.mp4',
        mimeType : "video/mp4",
        httpMethod : "POST",
        chunkedMode: false,
         params: {
          'title':this.storydata.comment,
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
      
      fileTransfer.upload(this.storydata.fullPath,url, options)
      .then((data) => {
        console.log('after trnas',options,data)
          let userdata: any = {};
          userdata = JSON.parse(data.response);
          console.log("image",userdata)
          if(userdata.success){
            //this.viewCtrl.dismiss();
            this.convervideo(userdata.data._id)

          }else{
            this.viewCtrl.dismiss();
          }
            
      }, (err) => {
        this.viewCtrl.dismiss();
        this.webservice.presentToast('Video upload failed')
        console.log(err)
      })
    }else if(this.storydata.type=='image'){
     
      console.log("shareStory coming image");

      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName:randname+'.jpg',
        mimeType : "image/jpeg",
        httpMethod : "POST",
        chunkedMode: false,
         params: {
          'title':this.storydata.comment,
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
      
      fileTransfer.upload(this.storydata.fullPath,url, options)
      .then((data) => {
        //this._utilityService.showLoading();
        console.log('after trnas',options,data)
          let userdata: any = {};
          userdata = JSON.parse(data.response);
          console.log("image",userdata)
          if(userdata.success){
            this.converimage(userdata.data._id)

          }else{
            this.viewCtrl.dismiss();
          }
            
      }, (err) => {
        this.viewCtrl.dismiss();
        this.webservice.presentToast('Image upload failed')
        console.log(err)
      })
    }

  }
  ///// DISMISS MODAL //////

  dismiss(){
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(HomePage)
  }


  convervideo(id){
    console.log('convervideo')
  //   let loadering = this.loadingCtrl.create({ 
  //     spinner:'dots',
  //     content: 'Processing',
  //     //showBackdrop:false
  // });
  // this._utilityService.imashowLoading()
    this.webservice.getData('story/convertStoryVideo/'+id+'?token='+ this.token).then((response:any) => {
      console.log("convertStoryVideo=",response);
      if(response.success){
        this.loader = false;
        this.viewCtrl.dismiss();
      }
    }, (error) => {
      //this._utilityService.hideLoading();
      console.log("error ts: ", error);
      this.viewCtrl.dismiss();
      })
  }

  /// IMAGE PROCESSING ////

  converimage(id){
    console.log("converimage");
    
  //   let loaders = this.loadingCtrl.create({ 
  //     spinner:'dots',
  //     content: 'Processing',
  //     //showBackdrop:false
  // });
  // loaders.present();    
    this.webservice.getData('story/createStoryImageThumb/'+id+'?token='+ this.token).then((response:any) => {
      console.log(response);
      if(response.success){
        this.loader = false;
        // loaders.dismiss();
        this.viewCtrl.dismiss();
      }
    }, (error) => {
      //this._utilityService.hideLoading();
      console.log("error ts: ", error);
      this.viewCtrl.dismiss();
      })
  }





  

}
