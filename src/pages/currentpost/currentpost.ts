import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, App, ActionSheetController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { LoginPage } from '../login/login';
import { CommentmodalPage } from '../commentmodal/commentmodal';
import { DotsmodalPage } from '../dotsmodal/dotsmodal';
import { NativeAudio } from "@ionic-native/native-audio";
import { UserprofilePage } from '../userprofile/userprofile';
import { ProfilePage } from '../profile/profile';
import { ExplorePage } from '../explore/explore';
// import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the CurrentpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-currentpost',
  templateUrl: 'currentpost.html',
  // providers:[SocialSharing]
})
export class CurrentpostPage {
  public photo:any;
  imageList:any=[];
  galleryid:any;
  show:boolean=true
  show_other:boolean =false
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  public profilepic=localStorage.getItem('userImage');
  imageID:any;
  reportid:any
  hasMoreData: any;
  API_URL:any;

  url='http://18.191.93.75:6018/'+'users/userThumb/'
  checkscroll:boolean=true;
  vids:any;
  profiledetails:any={};
  commentlist:any;
  commentCount:any;
  id:any;

  videos:any;
  images:any
   panelObj: any;
   exactTop: any;

   noLike:any;
   isLike:any;

   imageId:any;

   AllImage:any;

   commentImage:any=[];

   ImageArr:any=[];

   page=1;
   limit=10


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private modalControler:ModalController,
    private nativeAudio: NativeAudio,
    platform: Platform,
    public app :App,
    public actionSheetController: ActionSheetController,
    // private socialSharing: SocialSharing
    ) {

          // The Native Audio plugin can only be called once the platform is ready
          platform.ready().then(() => { 
            console.log("platform ready");
  
            // This is used to unload the track. It's useful if you're experimenting with track locations
            this.nativeAudio.unload('trackID').then(function() {
                console.log("unloaded audio!");
            }, function(err) {
                console.log("couldn't unload audio... " + err);
            });
  
            // 'trackID' can be anything
            this.nativeAudio.preloadComplex('trackID', 'assets/like_sound.mp3', 1, 1, 0).then(function() {
                console.log("audio loaded!");
            }, function(err) {
                console.log("audio failed: " + err);
            });
        });

  }


  gotoPhoto(id,type,i,list) {
    console.log("list=",list);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentPost');
    this.imageserachwithpagination()
  }



  ionViewDidEnter(){
    console.log(document.getElementById('myMap'))
}



  ionViewWillLeave(){
    let videos = document.getElementsByClassName("videocont")
   console.log(videos)
   for (var i = 0; i < videos.length; i++) {
    this.vids=document.getElementById(videos[i].id)
    console.log(this.vids)
    this.vids.pause()
    }
  }

  imageserachwithpagination() {
    // this.galleryid=this.photo.id
    // var firstDataRequired=true
    this.webservice.presentLoading();

        // if(this.token==null||this.token==undefined) {
        //   this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
        // } else {
        //   this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
        // }

        this.webservice.getData('users/feedList/'+'?page='+ this.page+'&limit='+ this.limit+'&token='+ this.token,).then((res:any) => {
          if(res){
            console.log("response=",res);
            this.webservice.hideLoader();
            if(res.data.length == 0){
              console.log('no image')
              this.hasMoreData = false;
            } else {
              this.hasMoreData = true;
              if(res.likeList!=null||res.likeList!=undefined && res.flagList !=null || res.flagList !=undefined ){
                this.imageID=res.likeList
                this.reportid=res.flagList
              }

              for (var i = 0; i < res.data.length; i++) {
                let obj = {...res.data[i]};
                console.log("Imgobj=",obj._id);

               
                if(String(res.data[i].gallery.userid.profilePicture).includes('.jpg') || String(res.data[i].gallery.userid.profilePicture).includes('.png') || String(res.data[i].gallery.userid.profilePicture).includes('.JPEG')) {
                  obj.datatype = "file"

                } else {
                  obj.datatype = "base64"
                }

                let data={
                  'imageid':obj._id 
                }

                this.webservice.postData('users/showallcomment/'+'?token='+ this.token,data).then((response:any) => {
                  console.log("comment response=",response);

                  this.ImageArr = response.data.reverse()
                  obj.commentData = this.ImageArr[0]
                })


                this.imageList.push(obj)
                console.log("this.imageList=",this.imageList);
              }
            }
          } else {
            this.webservice.presentToast(res);
          }
        })
  }






  


    doInfinite(infiniteScroll) {
    
      if(this.checkscroll==true){
      
      this.galleryid=this.imageList[this.imageList.length - 1]._id;//localStorage.getItem('lastid')
      console.log(this.galleryid)
      // var firstDataRequired=false
      return new Promise(resolve => {
            this.checkscroll=false

            // if(this.token==null||this.token==undefined) {
            //   this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
            // } else {
            //   this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
            // }

            this.webservice.getData('users/feedList/'+'?page='+ this.page+'&limit='+ this.limit+'&token='+ this.token,).then((res:any) => {
            console.log('work',res)
            this.checkscroll=true
            if(res.success){ 
              if(res.data.length == 0){
                console.log('no image')
                this.hasMoreData = false;
              }

              else {
                this.hasMoreData = true;
                if(res.likeList!=null||res.likeList!=undefined && res.flagList !=null || res.flagList !=undefined ){
                  this.imageID=res.likeList
                  this.reportid=res.flagList
                }
  
                for (var i = 0; i < res.data.length; i++) {
                  let obj = {...res.data[i]};
                  console.log("Imgobj=",obj._id);
  
                 
                  if(String(res.data[i].gallery.userid.profilePicture).includes('.jpg') || String(res.data[i].gallery.userid.profilePicture).includes('.png') || String(res.data[i].gallery.userid.profilePicture).includes('.JPEG')) {
                    obj.datatype = "file"
  
                  } else {
                    obj.datatype = "base64"
                  }
  
                  let data={
                    'imageid':obj._id 
                  }
  
                  this.webservice.postData('users/showallcomment/'+'?token='+ this.token,data).then((response:any) => {
                    console.log("comment response=",response);
  
                    this.ImageArr = response.data.reverse()
                    obj.commentData = this.ImageArr[0]
                  })
  
  
                  this.imageList.push(obj)
                  console.log("this.imageList=",this.imageList);
                }resolve();
              }
        //       else{
        //         this.hasMoreData = true;
                
        //        // setTimeout(() => {
        //           for (var i = 0; i < res.data.length; i++) {
        //             this.imageList.push(res.data[i])
                    
        // }
        //      resolve();
        //       //}, 500);
        //       }
              
              } 
              else{
                this.webservice.presentToast(res.message);
              }
              infiniteScroll.complete();
          }, (error) => {
            //this._utilityService.hideLoading();
          console.log("error ts: ", error);
          })
        });
      }
     
    }






//         gotoPhoto(id,type,i,list) {
//           console.log("list=",list);
//           if(this.userid != list.userid._id){
//             this.gotoPhotoModal(list,i)
//           }else{
//           //  this.viewCount(list._id)
//           this.gotoPhotoModal(list,i)
//           // this.selectoption(id,type,i,list)
//           }
//         }

//         ///// GO TO PHOTO MODAL ////
// gotoPhotoModal(list,i){
//   let data = {
//     'id':list._id,
//     'url':list.path,
//     'profile':list.userid,
//     'type':list.type,
//     'index':i,
//     'createdAt':list.createdAt
//   }

//   console.log("gotoPhotoModal=",data);
//   // this.viewCount(list._id)

//   if(this.token==null){
//     this.navCtrl.push(ExplorePage,{"photolist": data})
//   }else{
//   //  this.viewCount(list._id)
//    this.navCtrl.push(ExplorePage,{"photolist": data})
//   }
// }


















  // OpenCommentMordal(image) {
  //   this.videos.pause()
  //   const modal = this.modalControler.create(CommentmodalPage,{"imageId":image});
  //   modal.present();
  // }

  OpenCommentMordal(image) {
    // this.videos.pause()
    // const modal = this.modalControler.create(CommentmodalPage,{"imageId":image});
    // modal.present();
    this.navCtrl.push(CommentmodalPage,{"imageId":image});
  }



    scrollHandler(event){
      for (var v in this.imageList) {  
        this.vids = this.imageList[v]._id
        console.log("this.vids=",this.vids)
        
        this.panelObj = document.getElementById(this.vids);

        console.log("this.panelObj=",this.panelObj);
        
        this.exactTop = this.panelObj.getBoundingClientRect().top;
        this.videos = document.getElementById('video_'+this.vids);
        this.images=document.getElementById('image_'+this.vids);
       
        
         if(this.exactTop <150 && this.exactTop >-450 && this.videos !=null && this.images==null){
          console.log("get1",this.exactTop)
              this.videos.play()
              
              if(this.token !=null){
                // this.viewCount(this.vids)
              }
              console.log( this.videos)
          }else if(this.exactTop <250 && this.exactTop >-450 && this.videos ==null && this.images !=null){
            console.log("get2",this.exactTop)
            if(this.token !=null){
              // this.viewCount(this.vids)
            }
               
          }else if(this.videos !=null && this.images==null){
            console.log("get3",this.exactTop)
            this.videos.pause()
            localStorage.removeItem('videoid')
            if(this.token !=null){
              // this.viewCount(this.vids)
            }
          }
    }
  }

  // viewCount(id){
  //   this.webservice.getData('users/createView/'+id + "/" +  this.token).then((response:any) => {
  //  console.log('res',response)
  //   })
  // }








  // share(images){
  //   console.log('images',images)
  //   var message="Share from i'llTip"
  //  // var image:string =images
  //  var file:string=images
  //   var subject : string = '';
  //   var url:string=null
  //  // http://162.243.110.92:6018/users/shareImageDetails/'+id[1]
  //  this.webservice.presentLoading();
  //   this.socialSharing.share(message,subject, file, url).then((data) => {
  //     // Sharing via email is possible
  //     this.webservice.hideLoader();
  //     console.log('ok',data)
  //   }).error((error)=>{
  //     console.log('error',error)
  //   })
  // }


  // share(images){
  //   console.log('images',images)
  //   var message="Share from i'llTip"
  //  // var image:string =images
  //  var file:string=images
  //   var subject : string = '';
  //   var url:string=null
  //  this.webservice.presentLoading();
  //   this.socialSharing.share(message,subject, file, url).then((data) => {
  //     this.webservice.hideLoader();
  //     console.log('ok',data)
  //   }).catch((error) => {
  //     console.log('no=',error)
  //     this.webservice.hideLoader();
  //   });
  // }

  share(images) {
    console.log('images',images)
  //   var message="Share from i'llTip"
  //  var file:string=images
  //   var subject : string = '';
  //   var url:string=null
  //   this.webservice.presentLoading();
  //   this.socialSharing.share(message, subject, file, url).then((data) => {
  //     // Sharing via email is possible
  //     console.log('ok',data)
  //     this.webservice.hideLoader();
  //   }).catch((error) => {
  //     console.log('no=',error)
  //     this.webservice.hideLoader();
  //     // Sharing via email is not possible
  //   });
  }

}
