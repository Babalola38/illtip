import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, App, ActionSheetController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { LoginPage } from '../login/login';
import { CommentmodalPage } from '../commentmodal/commentmodal';
import { DotsmodalPage } from '../dotsmodal/dotsmodal';
import { NativeAudio } from "@ionic-native/native-audio";
import { UserprofilePage } from '../userprofile/userprofile';
import { ProfilePage } from '../profile/profile';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FriendforsharePage } from '../friendforshare/friendforshare';

/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
  providers:[SocialSharing]
})
export class ExplorePage {

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

  page:any;

  // url='http://18.191.93.75:6018/'+'users/userThumb/'
  url:any;
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
   CommentData:any
   ImageType:boolean;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private modalControler:ModalController,
    private nativeAudio: NativeAudio,
    platform: Platform,
    public app :App,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing
    ) {
    this.photo = navParams.get('photolist');
    this.id = this.photo.id;
    this.page = navParams.get('page');
    console.log("this.page=",this.page);



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


  likepost() {
    console.log("playing audio");

    this.nativeAudio.play('trackID').then(function() {
        console.log("playing audio!");
    }, function(err) {
        console.log("error playing audio: " + err);
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
    this.imageserachwithpagination()
    this.url = this.webservice.apiUrl+'uploads/users/'
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
    this.galleryid=this.photo.id
    var firstDataRequired=true
    this.webservice.presentLoading();

    if(this.page == 'home') {
      if(this.token==null||this.token==undefined) {
        this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
      } else {
        this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
      }
    } else if (this.page == 'profile') {
      this.API_URL = 'users/ownGalleryListWithPaginate/'+this.photo.profile+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
    }



        this.webservice.getData(this.API_URL).then((res:any) => {
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


                if(String(res.data[i].userid.profilePicture).includes('.jpg') || String(res.data[i].userid.profilePicture).includes('.png') || String(res.data[i].userid.profilePicture).includes('.JPEG')) {
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
                  this.CommentData = this.ImageArr[0]
                  console.log("this.CommentData=",this.CommentData);
                  if(this.CommentData == undefined) {
                    this.ImageType = false
                  } else if((this.CommentData.user_id.profilePicture).includes('.jpg') || (this.CommentData.user_id.profilePicture).includes('.png') || (this.CommentData.user_id.profilePicture).includes('.JPEG')) {
                    this.ImageType = true
                  } else {
                    this.ImageType = false
                  }

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






  // imageserachwithpagination(){

  //   this.galleryid=this.photo.id
  //   var firstDataRequired=true
  //   setTimeout(() => {
  //     this.show=false
  //     this.show_other =true
  //    },10000)
  //   return new Promise(resolve => {
  //       var title
  //       var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  //       this.webservice.presentLoading();

  //       if(this.token==null||this.token==undefined) {
  //         this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
  //       } else {
  //         this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
  //       }

  //       this.webservice.getData(this.API_URL).then((res:any) => {


  //         console.log('work',this.galleryid,res)
  //         if(res){
  //           console.log("response=",res);

  //           this.webservice.hideLoader();


  //           if(res.data.length == 0){
  //             console.log('no image')
  //             //this._utilityService.displayToast('No more result');
  //             this.hasMoreData = false;
  //           }else{
  //             this.hasMoreData = true;
  //             if(res.likeList!=null||res.likeList!=undefined && res.flagList !=null || res.flagList !=undefined ){
  //               this.imageID=res.likeList
  //               this.reportid=res.flagList
  //             }

  //           //  setTimeout(() => {
  //             for (var i = 0; i < res.data.length; i++) {
  //               let obj = {...res.data[i]};
  //               console.log("Imgobj=",obj._id);


  //               if(String(res.data[i].userid.profilePicture).includes('.jpg') || String(res.data[i].userid.profilePicture).includes('.png') || String(res.data[i].userid.profilePicture).includes('.JPEG')) {
  //                 obj.datatype = "file"

  //               } else {
  //                 obj.datatype = "base64"
  //               }

  //               let data={
  //                 'imageid':obj._id
  //               }

  //               this.webservice.postData('users/showallcomment/'+'?token='+ this.token,data).then((response:any) => {
  //                 console.log("comment response=",response);
  //                 this.ImageArr = response.data

  //                 obj.commentData = this.ImageArr
  //               })

  //               this.imageList.push(obj)
  //               console.log("this.imageList=",this.imageList);
  //             }

  //             resolve();
  //          // }, 500);
  //           }

  //           }
  //           else{
  //             this.webservice.presentToast(res);
  //           }

  //       }, (error) => {
  //         //this._utilityService.hideLoading();
  //       console.log("error ts: ", error);
  //       })
  //     });
  //   }


    doInfinite(infiniteScroll) {

      if(this.checkscroll==true){

      this.galleryid=this.imageList[this.imageList.length - 1]._id;//localStorage.getItem('lastid')
      console.log(this.galleryid)
      var firstDataRequired=false
      return new Promise(resolve => {
            this.checkscroll=false

            if(this.page == 'home') {
              if(this.token==null||this.token==undefined) {
                this.API_URL = 'users/galleryListWithPaginate20/'+'?galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
              } else {
                this.API_URL = 'users/galleryListWithPaginate20/'+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
              }
            } else if (this.page == 'profile') {
              this.API_URL = 'users/ownGalleryListWithPaginate/'+this.photo.profile+'?token='+ this.token+'&galleryId='+this.galleryid+'&firstDataRequired='+firstDataRequired
            }

         this.webservice.getData(this.API_URL).then((res:any) => {
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


                  if(String(res.data[i].userid.profilePicture).includes('.jpg') || String(res.data[i].userid.profilePicture).includes('.png') || String(res.data[i].userid.profilePicture).includes('.JPEG')) {
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



    otherProfile(id,fullName){

        console.log('hi')
        if(this.token==null){
        let data={
        'userid':id,
        'fullName':fullName
        }
        this.navCtrl.push(UserprofilePage,{'data':data})
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











    checkLikes(image_id) {
      if(this.token !=null){
        let check = this.imageID.find(x => x.image_id == image_id);
      if(!check) {
        return false;
      } else {
          return true;
      }
      }

    }


    like(id){
      var likepost = new Audio("assets/like_sound.mp3");

      if(this.token==null){
        this.navCtrl.push(LoginPage);
      }else {
        let data={
          'imageid':id
        }
        this.webservice.postData('users/userliking/'+'?token='+ this.token,data).then((response:any) => {
            console.log("like", response);
            setTimeout(()=>{
              if(response.success){
                likepost.play();
                document.getElementById('count_'+id).innerHTML = response.count;
                if(response.message=="Like given successfully"){
                //  document.getElementById('txt2_'+id).classList.remove('isLike');
                //  document.getElementById('txt2_'+id).classList.add('noLike');

                document.getElementById('txt2_'+id).classList.remove('noLike');
                document.getElementById('txt2_'+id).classList.add('isLike');
                 this.noLike = true
                 this.isLike = false
                }else{
                  // this.likepost();

                //  document.getElementById('txt2_'+id).classList.remove('noLike');
                //  document.getElementById('txt2_'+id).classList.add('isLike');

                document.getElementById('txt2_'+id).classList.remove('isLike');
                document.getElementById('txt2_'+id).classList.add('noLike');
                 this.isLike = true
                 this.noLike = false
                }
                 }
            },50)

          }, (error) => {
              console.log("error ts: ", error);
      })
      }

    }




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
      console.log("scroll evevt=",event);

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


  doDots(image) {

    console.log("userid1=",this.userid);
    console.log("userid2=",image.userid._id);
    var user_id = image.userid._id
    if(user_id == this.userid) {
      const modal = this.modalControler.create(DotsmodalPage,{"user":true,"image":image,"reportid":this.reportid});
      modal.present();
    } else {
      const modal = this.modalControler.create(DotsmodalPage,{"user":false,"image":image,"reportid":this.reportid});
      modal.present();
    }

  }




  async presentActionSheet(images,sharetypes) {
    if(this.token==null){
      this.app.getRootNav().push(LoginPage);
    }else{
      const actionSheet = await this.actionSheetController.create({
        //header: 'Albums',
        buttons: [{
          text: 'Share with my friends',
          handler: () => {
            console.log('FriendforsharePage clicked');
            let data={
              'photopath':images,
              'sharetypes':sharetypes
            }
            this.navCtrl.push(FriendforsharePage,{'data':data})
          }
        }, {
          text: 'External Share',
          handler: () => {
            console.log('Share clicked');
            this.share(images)
          }
        }]
      });
      await actionSheet.present();
    }

  }


  // share(images) {
  //   let imageName = "FreakyJolly.jpg";
  //   const ROOT_DIRECTORY = 'file:///sdcard//';
  //   const downloadFolderName = 'tempDownloadFolder';

  //   //Create a folder in memory location
  //   this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
  //     .then((entries) => {

  //       //Copy our asset/img/FreakyJolly.jpg to folder we created
  //       this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName, ROOT_DIRECTORY + downloadFolderName + '//', imageName)
  //         .then((entries) => {

  //           //Common sharing event will open all available application to share
  //           this.socialSharing.share("Message","Subject", ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
  //             .then((entries) => {
  //               console.log('success ' + JSON.stringify(entries));
  //             })
  //             .catch((error) => {
  //               alert('error ' + JSON.stringify(error));
  //             });
  //         })
  //         .catch((error) => {
  //           alert('error ' + JSON.stringify(error));
  //         });
  //     })
  //     .catch((error) => {
  //       alert('error ' + JSON.stringify(error));
  //     });
  // }


  share(images){
    console.log('images',images)
    var message="Share from i'llTip"
   // var image:string =images
   var file:string=images
    var subject : string = '';
    var url:string=null
   // http://162.243.110.92:6018/users/shareImageDetails/'+id[1]
   this.webservice.presentLoading();
    this.socialSharing.share(message,subject, file, url).then((data) => {
      // Sharing via email is possible
      this.webservice.hideLoader();
      console.log('ok',data)
    }).catch((data) => {
      console.log('no',data)
      this.webservice.hideLoader();
    });
  }


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

  // share(images) {
  //   console.log('images',images)
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
  // }

}
