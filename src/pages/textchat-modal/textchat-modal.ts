// import { Component , ViewChild} from '@angular/core';
// import { IonicPage, NavController, NavParams,Content,ActionSheetController,ModalController} from 'ionic-angular';

// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { FileTransfer } from '@ionic-native/file-transfer2';
// import { File } from '@ionic-native/file';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
// import * as io from 'socket.io-client';
// // import { Pipe, PipeTransform } from '@angular/core';
// //APP SERVICES

// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';
// import { Diagnostic } from '@ionic-native/diagnostic';
// import { WebserviceProvider } from '../../providers/webservice/webservice';
// import { UserprofilePage } from '../userprofile/userprofile';
// import { ProfilePage } from '../profile/profile';
// import { SharePreviewPage } from '../share-preview/share-preview';
// //import * as moment from 'moment';
// //import { Pipe, PipeTransform } from '@angular/core';

// //@Pipe({name: 'linkify'})
// @Component({
//   selector: 'page-textchat-modal',
//   templateUrl: 'textchat-modal.html',
//   providers:[Camera,FileTransfer,File,Diagnostic,InAppBrowser],

// })


// export class TextchatModalPage {
//   public token = localStorage.getItem('access-token-illTip');
//   public userid=localStorage.getItem("loginuserId");

//   @ViewChild(Content) content: Content;
//   stream:any
//   iosCordova = false; // I use these for easy if-else logic later
//  androidCordova = false; // but I want you to see how I handle the logic
//  user_deatils:any;
//  socket: any;
//  userInput:any={};
//  itemsSubscription: Subscription;
//  chatHistoryListing: any=[];
//  loginuserID:any;
//  profileDetails:any;
//  chat_id:any;
//  page=1;
//   hasMoreData: any;
//   limit=100000;
//   redirect:boolean
//   res =(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//   selectchat:any;
//   chatID:any=[];
//   url:any
//   URL:any
//   constructor(public navCtrl: NavController,
//      public navParams: NavParams,
//     //  private platform:Platform,
//      private webservice:WebserviceProvider,
//      public actionSheetCtrl: ActionSheetController,
//      private camera: Camera,
//     //  private transfer: FileTransfer,
//     //  private file: File,
//      public modalCtrl: ModalController,
//      public diagnostic :Diagnostic,
//     //  private iab: InAppBrowser

//      ) {
//        this.url = webservice.apiUrl+'uploads/users/'

//       this.user_deatils=this.navParams.get('data')
//       //console.log('this.user_deatils', this.user_deatils)
//       var param={
//         query: 'userid=' +  localStorage.getItem('loginuserId') + '&sessionid=' + localStorage.getItem('access-token-illTip')  + '&chatToken=' + localStorage.getItem('access-token-illTip')
//       }
//      this.socket = io.connect(webservice.chat_apiUrl,param);

//       var data = {
//         remoteuserid:this.user_deatils.id,
//         userid:this.userid
//       };
//       ////console.log('peerconnection',data)
//       this.socket.emit('peerConnectRequest',data);


//   }
//   ngAfterViewInit(){

//   }

//   ngOnInit() {
//     this.getotherprofileDetils()
//       this.getprofiledetails()


//     this.itemsSubscription= this.getMessages().subscribe(message => {

//       ////console.log('message',message)
//       this.chatHistoryListing.push(message);
//       //this.scrollToBottom(200)
//       //this.content.scrollToBottom(200)


//     });
//     this.socket.on('peerRequest', (data) => {
//      // //console.log('observer 2',data)
//       //observer.next(data);
//     });

//   }

//   ionViewDidLeave(){
//     this.itemsSubscription.unsubscribe()
//     //console.log( this.itemsSubscription)
//     this.chatreading()
//   }



//   ///// DELETE PROFILE COMMENT ///////
//   chathistory(){

//     return new Promise(resolve => {
//   //this.webservice.presentLoading();
//   // this.webservice.chathistory(this.token,this.user_deatils.id,this.page,this.limit).subscribe((response) => {
//   this.webservice.chathistory('api/chatHistory?remoteUserId='+this.user_deatils.id+'&page='+ this.page+'&limit='+ this.limit+'&token='+ this.token,).then((response:any) => {
//   //this.webservice.hideLoader();
//   console.log("chat history", response);
//   var chatHistory=[],senderImage
//   //console.log("chatHistory=",chatHistory);

//   if (response.success) {
//     // load chat
//     if(response.Chats.docs.length == 0){
//       ////console.log('no image')
//       //this.webservice.presentToast('No more result');
//       this.hasMoreData = false;
//       ////console.log('this.listLentgh2',this.hasMoreData)
//     }else{
//       this.hasMoreData = true;
//      // //console.log('this.listLentgh1',this.hasMoreData)
//       for (var i = 0; i < response.Chats.docs.length; i++) {

//         if( response.Chats.docs[i].userId===this.userid){
//           senderImage=this.profileDetails
//           //senderImage=this.user_deatils.userimage
//           ////console.log('ok1',senderImage,this.userid)

//         }else if(response.Chats.docs[i].userId !=this.userid){
//          senderImage=this.user_deatils.profile_pic
//          //senderImage=this.user_deatils.remoteuserImage
//          ////console.log('ok2',senderImage)
//         }

//         var data = {
//           chatid: response.Chats.docs[i]._id,
//           remoteuserid: response.Chats.docs[i].remoteUserId,
//           userid: response.Chats.docs[i].userId,
//           chatText: response.Chats.docs[i].chatText,
//           attachment: response.Chats.docs[i].attachment,
//           size: response.Chats.docs[i].size,
//           filename: response.Chats.docs[i].chatFileName,
//           type: response.Chats.docs[i].chatType,
//           progressshow: 0,
//           time:response.Chats.docs[i].chatDate,
//           randomid: response.Chats.docs[i].randomid,
//           receiver_seen: response.Chats.docs[i].receiver_seen,
//           senderImage:senderImage,
//           thumbnail:response.Chats.docs[i].thumbnail,
//           remoteUserName:response.Chats.docs[i].remoteusername,
//            UserName:response.Chats.docs[i].username,
//         };

//         this.chat_id=response.Chats.docs[i]._id
//         this.chatreading()
//         this.chatHistoryListing.unshift(data);

//       }
//     }

//   }
//   //this.content.scrollToBottom(800)
//   this.scrollToBottom(100);
//   }, (error) => {
//  //this.webservice.hideLoader();
//   //console.log("error ts: ", error);
//   })
// });
//   }

//   doInfinite(infiniteScroll) {
//     this.page++
//     //console.log('doInfinite page,',this.page);
//     this.chathistory().then((data)=>{
//       //console.log("data scroll", data);
//       infiniteScroll.complete();
//   });
//   }


//   getMessages() {
//     let observable = new Observable(observer => {
//       this.socket.on('chatReciveRemoteuser', (data) => {
//         ////console.log('observer',data)
//         observer.next(data);
//       });
//     })
//     return observable;
//   }

//   scrollToBottom(time){
//     setTimeout(() => {
//       this.content.scrollToBottom();
//     }, 200);

//   }

//   // sendChatText() {
//   //  // alert("user texted message is "+this.userInput.message);
//   //   if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
//   //     this.webservice.presentToast("Can't send empty message");
//   //     return false;
//   //   }else{
//   //     var time = new Date();
//   //     let headers = new Headers({
//   //                   'Authorization': this.token,
//   //                  });
//   //     // let file : Blob;

//   //     let formdata = new FormData;
//   //     formdata.append("receiver_id",this.user_deatils.id);
//   //     formdata.append("chat_content",this.userInput.message);
//   //     formdata.append("chat_files",new File([],"demo"));
//   //     this.webservice.postApi(this.webservice.apiUrl + '/singleChat/createChat',formdata).then((response:any) => {
//   //       console.log("send group message=",response);
//   //       if(response.success == true) {
//   //         this.userInput.message = "";
//   //         // this.getgroupMessageDetails();
//   //       }
//   //     })
//   //   }
//   // }

//   sendChatText() {
//     console.log(this.userInput.message);

//     var res =(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//     if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
//       this.webservice.presentToast("Can't send empty message");
//       return false;
//     }else{
//       var time = new Date();
//       let formdata = new FormData;
//       formdata.append("receiver_id",this.chatdata.id);
//       formdata.append("chat_content",this.userInput.message);
//       formdata.append("chat_files",new File([],"demo"));

//       console.log("formdata=",formdata);


//       this.webservice.sendMessage('singleChat/createChat/',formdata).then((response:any) => {
//         console.log("send group message=",response);
//         if(response.success == true) {
//           this.userInput.message = "";
//         }
//       })
//     }
//   }

//   sendChatTextold() {
//     var res =(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
//     if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
//       this.webservice.presentToast("Can't send empty message");
//       return false;
//     }else{

//       var time = new Date();
//     let data={
//       //chat_id: data.chat_id.toString(),
//       type: 'text',
//       chatMode:'Chat',
//       //roomId: data.roomId,
//       jsonWebToken:this.token,
//       chatText: this.userInput.message,
//       chatFile: '',
//       thumbnail: '',
//       chatFileName: '',
//       chatFileSize:'data.size',
//       chatDate: new Date(),
//       userid: this.userid,
//       senderImage:this.profileDetails,
//       //jsonWebToken: data.jsonWebToken,
//       username: localStorage.getItem('First_name'),
//       userimage: this.profileDetails,
//       remoteusername: this.user_deatils.fullName,
//       remoteuserimage: this.user_deatils.profile_pic,
//       remoteuserid:this.user_deatils.id,
//       messagedelete: '',
//       chattime:time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
//     }

//     // console.log("text data=",data);

//     if(res.test(data.chatText) == false){
//       this.redirect=false
//       //console.log('no',this.redirect)
//       console.log("if text data=",data);
//      }else{
//       this.redirect=true
//       //console.log('yes',this.redirect)
//       console.log("else text data=",data);
//      }
//     this.socket.emit('sendchat', data);
//     console.log('text data',data)
//     this.chatHistoryListing.push(data);
//     this.scrollToBottom(100);
//       this.userInput.message='';
//     this.chatreading()

//     // this.message = '';
//     }

//   }



// //// CHAT READ ///
// chatreading(){
//   let data={
//       //  userid:localStorage.getItem("loginuserId"),
//       //  remoteuserid:this.user_deatils.id,
//       //  chat_id:this.chat_id
//       userid:this.user_deatils.id,
//       remoteuserid:localStorage.getItem("loginuserId"),
//       chat_id:this.chat_id
//   }
//   this.webservice.charead('api/messageread/',data).then((response:any) => {
//   console.log("chat read", response);

//   }, (error) => {

//   console.log("error ts: ", error);
//   })
//   }


// ////// FILE SHARE ////
// // sharefile(){
// //   let actionSheet = this.actionSheetCtrl.create({
// //     // title: 'Modify your album',
// //     buttons: [
// //       {
// //         text: 'Gallery',
// //         role: 'destructive',
// //         handler: () => {
// //           this.uploadimage()
// //         }
// //       },
// //       {
// //         text: 'Video',
// //         role: 'destructive',
// //         handler: () => {
// //           this.uploadVideo()
// //         }
// //       },
// //       {
// //         text: 'Cancel',
// //         role: 'cancel',
// //         handler: () => {
// //           //console.log('Cancel clicked');
// //         }
// //       }
// //     ]
// //   });

// //   actionSheet.present();

// // }



// // sharefile() {

// //   let  actionSheet = this.actionSheetCtrl.create({
// //       buttons: [
// //       {
// //         text: 'Gallery',
// //         role: 'destructive',
// //         handler: () => {
// //           this.uploadimage()
// //         }
// //       },
// //       {
// //         text: 'Video',
// //         role: 'destructive',
// //         handler: () => {
// //           this.uploadVideo()
// //         }
// //       },
// //       {
// //         text: 'Cancel',
// //         role: 'cancel',
// //         handler: () => {
// //           //console.log('Cancel clicked');
// //         }
// //       }
// //     ]
// //     });
// //     actionSheet.present();


// // }




// sharefile() {

//   const actionSheet = this.actionSheetCtrl.create({
//     // title: 'Modify your album',
//     buttons: [
//       {
//         text: 'Gallery',
//         handler: () => {
//           //console.log('Destructive clicked');
//           this.uploadimage()
//         }
//       },{
//         text: 'Video',
//         handler: () => {
//           //console.log('Archive clicked');
//         }
//       },{
//         text: 'Cancel',
//         handler: () => {
//           //console.log('Cancel clicked');
//         }
//       }
//     ]
//   });
//   actionSheet.present();


// }

// uploadimage(){
//   const options: CameraOptions = {
//     quality: 50,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     encodingType: this.camera.EncodingType.PNG,
//     allowEdit : true
//   }
//   this.camera.getPicture(options).then((imageData) => {

//     //console.log("imageData", imageData)
//     let data={
//       'imageData': imageData,
//       'type':'image'
//     }

//     let profileModal = this.modalCtrl.create('ImageSharePage', { 'fileData': data });
//     profileModal.onDidDismiss(data => {
//       //console.log('image',data);
//       if(data==undefined){

//       }else{
//         var share=false
//         this.sendimage(data,share)
//       }

//     });
//     profileModal.present();

//   }, (err) => {

//   });
// }

// //// UPLOAD VIDEO ////
// uploadVideo(){
//   const options: CameraOptions = {
//     quality: 30,
//     destinationType: this.camera.DestinationType.FILE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     mediaType: this.camera.MediaType.VIDEO,
//   }
//   this.camera.getPicture(options).then((imageData) => {

//     //console.log("imageData", imageData)
//     let data={
//       'imageData': imageData,
//       'type':'video'
//     }
//     let profileModal = this.modalCtrl.create('ImageSharePage', { 'fileData': data })
//     profileModal.onDidDismiss(data => {
//       //console.log('image',data);
//       if(data==undefined){

//       }else{
//         var share=false
//         this.sendvideo(data,share)
//       }

//     });
//     profileModal.present();

//   }, (err) => {

//   });
// }


// //// UPLAOD PDF ////
// uploadpdf(){

//   const options: CameraOptions = {
//     quality: 30,
//     destinationType: this.camera.DestinationType.NATIVE_URI,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//     mediaType: this.camera.MediaType.ALLMEDIA,
//   }
//   this.camera.getPicture(options).then((imageData) => {

//     //console.log("imageData", imageData)
//     let data={
//       'imageData': imageData,
//       'type':'pdf'
//     }

//     let profileModal = this.modalCtrl.create('ImageSharePage', { 'fileData': data })
//     profileModal.onDidDismiss(data => {
//       //console.log('image',data);
//       this.senddoc(data)
//     });
//     profileModal.present();

//   }, (err) => {

//   });

// }


// //// Other profile ////
// getotherprofileDetils(){
//   if(this.token == null) {
//     this.URL = 'users/userdetails30/'+this.user_deatils.id
//   } else {
//     this.URL = 'users/userdetails30/'+this.user_deatils.id+'/?token='+ this.token
//   }
//         this.webservice.otheruserProfile(this.URL).then((response:any) => {
//           //console.log("getotherprofileDetils=",response);
//           if(response.success != false && response.data.profilePicture !=null){
//             var Purl =response.data.profilePicture

//           this.user_deatils.profile_pic=Purl.substring(Purl.lastIndexOf('/')+1);
//           }

//           setTimeout(() => {
//           this.chathistory();
//           //this.getprofiledetails();
//           },500)
//            //console.log("other profile details",  this.user_deatils.profile_pic);
//         }, (error) => {
//         this.webservice.hideLoader();
//         //console.log("error ts: ", error);
//         })
//     }
// /// OWN PROFILE DETAILS /////
// getprofiledetails(){
//   this.webservice.getProfileDetails('users/viewDetails10/'+'?token='+ this.token).then((response:any) => {
//     if(response.data.profilePicture !=null){
//       var Murl =response.data.profilePicture
//     this.profileDetails=Murl.substring(Murl.lastIndexOf('/')+1);
//     }

//     setTimeout(() => {
//       if(this.user_deatils.photopath ==null||this.user_deatils.photopath ==undefined||this.user_deatils.photopath ==""){
//         //console.log('ok33')
//       }else{
//         //console.log('ok22')
//         if(this.user_deatils.sharetpes=='image'){
//           var share=true
//           //console.log('image')
//          this.sendimage(this.user_deatils.photopath,share)
//         }else if(this.user_deatils.sharetpes=='video'){
//           //console.log('video')
//          this.sendvideo(this.user_deatils.photopath,share)
//         }
//       }
//     },500)

//  }, (error) => {
//  //console.log("error ts: ", error);
//  })

// }
// //// SEND IMAGE ////
// sendimage(image,share) {
//     var time = new Date();
//   let data={
//     //chat_id: data.chat_id.toString(),
//     isShare:share,
//     type: 'image',
//     chatMode:'Chat',
//     //roomId: data.roomId,
//     jsonWebToken:this.token,
//     //chatText: this.userInput.message,
//     chatFile: image,
//     thumbnail: image,
//     chatFileName: '',
//     chatFileSize:'data.size',
//     chatDate: new Date(),
//     userid: this.userid,
//     senderImage:this.profileDetails,
//     //jsonWebToken: data.jsonWebToken,
//     username: localStorage.getItem('First_name'),
//     userimage: this.profileDetails,
//     remoteusername: this.user_deatils.fullName,
//     remoteuserimage: this.user_deatils.profile_pic,
//     remoteuserid:this.user_deatils.id,
//     messagedelete: '',
//     chattime:time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
//   }
//   this.socket.emit('sendchat', data);
//   // this.webservice.sendchat(this.token,data).subscribe((response) => {
//   //   //console.log('text data',response)
//   // })
//   //console.log('text data',data)
//   this.chatHistoryListing.push(data);
//   ////console.log('this.chatHistoryListing',this.chatHistoryListing)
//   this.scrollToBottom(100);
//     this.userInput.message='';
//   this.chatreading()
//   // this.message = '';
// }

// //// SEND IMAGE ////
// sendvideo(image,share) {
//   //console.log('video image',this.user_deatils.profile_pic)
//     var time = new Date();
// let data={
//   //chat_id: data.chat_id.toString(),
//   isShare:share,
//   type: 'video',
//   chatMode:'Chat',
//   //roomId: data.roomId,
//   jsonWebToken:this.token,
//   //chatText: this.userInput.message,
//   chatFile: image,
//   thumbnail: image,
//   chatFileName: '',
//   chatFileSize:'data.size',
//   chatDate: new Date(),
//   userid: this.userid,
//   senderImage:this.profileDetails,
//   //jsonWebToken: data.jsonWebToken,
//   username: localStorage.getItem('First_name'),
//   userimage: this.profileDetails,
//   remoteusername: this.user_deatils.fullName,
//   remoteuserimage: this.user_deatils.profile_pic,
//   remoteuserid:this.user_deatils.id,
//   messagedelete: '',
//   chattime:time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
// }
// this.socket.emit('sendchat', data);
// //console.log('text data',data)
// this.chatHistoryListing.push(data);
// this.scrollToBottom(100);
//   this.userInput.message='';
// this.chatreading()
// //this.message = '';
// }

// //// SEND DOC ////
// senddoc(doc){

//   var time = new Date();
// let data={
//   //chat_id: data.chat_id.toString(),
//   type: 'pdf',
//   chatMode:'Chat',
//   //roomId: data.roomId,
//   jsonWebToken:this.token,
//   //chatText: this.userInput.message,
//   chatFile: doc,
//   thumbnail: doc,
//   chatFileName: '',
//   chatFileSize:'data.size',
//   chatDate: new Date(),
//   userid: this.userid,
//   senderImage:this.profileDetails,
//   //jsonWebToken: data.jsonWebToken,
//   username: localStorage.getItem('First_name'),
//   userimage: this.profileDetails,
//   remoteusername: this.user_deatils.fullName,
//   remoteuserimage: this.user_deatils.profile_pic,
//   remoteuserid:this.user_deatils.id,
//   messagedelete: '',
//   chattime:time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
// }
// this.socket.emit('sendchat', data);
// //console.log('text data',data)
// this.chatHistoryListing.push(data);
// this.scrollToBottom(100);
//   this.userInput.message='';
// this.chatreading()
// // this.message = '';
// }


// //// DOWNLOAD FILE /////
// // download(url,type) {
// //   const fileTransfer: FileTransferObject = this.transfer.create();
// //   var name=url.split('/')
// //   var randname=Math.random();
// //   var filename=name[3]
// //   //console.log(filename,name)
// //   //http://162.243.110.92:6018/uploads/images/1545138748268.mp4
// //   //console.log('url',url+type)
// //   if(type=='image'){
// //     this.webservice.presentLoading();
// //     //const url = 'http://www.example.com/file.pdf';
// //     let targetPath = this.file.externalRootDirectory+ "i'llTip/"+ filename;
// //     fileTransfer.download(url, targetPath,true).then((entry) => {
// //     //console.log('download complete: ' + entry.toURL());
// //     this.webservice.hideLoader();
// //   }, (error) => {
// //     this.webservice.hideLoader();
// //     // handle error
// //   });
// //   }else if(type=='video'){
// //     this.webservice.presentLoading();
// //     let targetPath = this.file.externalRootDirectory+ "i'llTip/" + filename; //this.cordova.file.dataDirectory
// //     this.diagnostic.requestCameraAuthorization().then((status:any) => {
// //       fileTransfer.download(url, targetPath, true).then((entry) => {
// //         //console.log('download complete: ' + entry.toURL());
// //         this.webservice.hideLoader();
// //         // env.isDownloadPopupVisible = true;
// //         // cordova.plugins.MediaScannerPlugin.scanFile(targetPath,function () {
// //         //     //console.log("WIN");
// //         //                 },error=>{
// //         //                     //console.log("LOSE");
// //         //                 });


// //     }, (error) => {
// //       this.webservice.hideLoader();
// //         //env.canDownloadFile = false;
// //         //console.log("download error source " + error.source);
// //         //console.log("download error target " + error.target);
// //         //console.log("upload error code" + error.code);
// //     });


// //     }, function(error){
// //       console.error(error);
// //   })
// //   }

// // }

// ///// GO TO PROFILE /////
// gotoProfile(id,fullName){
//   //console.log('id',id,fullName)
//   if(id !=this.userid){
//     let data={
//       'userid':id,
//       'fullName':fullName
//     }
//     this.navCtrl.push(UserprofilePage,{'data':data})
//   }else{
//     let data={
//       'userid':id,
//       'fullName':fullName
//     }
//     this.navCtrl.push(ProfilePage,{'data':data})
//   }
// }

// //// IMAGE ENLARGE ///
// viewimage(thumbnail,type){
//   let data={
//     'type':type,
//     'attach':thumbnail
//   }
//   this.navCtrl.push(SharePreviewPage, { 'enlarge': data })

//   // let profileModal = this.modalCtrl.create(SharePreviewPage, { 'enlarge': data })
//   //   profileModal.onDidDismiss(data => {
//   //     //console.log('image',data);
//   //     //this.senddoc(data)
//   //   });
//   //   profileModal.present();

// }





// //// DELETE MY CHAT /////
// DelMychat(id,i){

//   //console.log(id,i)
//   this.selectchat=i
//   this.chatID.push(id)
//   let actionSheet = this.actionSheetCtrl.create({
//     // title: 'Modify your album',
//     buttons: [
//       {
//         text: 'DELETE FOR ME',
//         role: 'destructive',
//         handler: () => {
//           this.deleteforme(this.chatID,i)
//         }
//       },
//       {
//         text: 'CANCEL',
//         role: 'cancel',
//         handler: () => {
//           //console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'DELETE FOR EVERY ONE',
//         role: 'destructive',
//         handler: () => {
//           this.deletefromall(this.chatID,i)
//           //console.log('Cancel clicked');
//         }
//       }

//     ]
//   });

//   actionSheet.present();


// }

// deleteforme(chatID,i){
//   //console.log(chatID)

//   let data={
//     'id':chatID,
//     'deleteForMe':true
//   }
//   //console.log('true',data)
//   this.webservice.chatDelete('api/chatDelete/'+'?token='+ this.token,data).then((response:any) => {
//     //console.log(response,'chat')
//     if(response.success){
//       this.chatHistoryListing.splice(i)
//     }
//   })
// }

// deletefromall(chatID,i){
//   //console.log(chatID)
//   let data={
//     'id':chatID,
//     'deleteForMe':false
//   }
//   //console.log('true',data)
//   this.webservice.chatDelete('api/chatDelete/'+'?token='+ this.token,data).then((response:any) => {
//     //console.log(response,'chat')
//     if(response.success){
//       this.chatHistoryListing.splice(i)
//     }
//   })
// }
// //// DELETE OTHER CHAT ////
// DelMychatother(chatid,i){
//   //console.log(chatid,i)
//   this.selectchat=i
//   this.chatID.push(chatid)
//   let actionSheet = this.actionSheetCtrl.create({
//     // title: 'Modify your album',
//     buttons: [
//       {
//         text: 'DELETE FOR ME',
//         role: 'destructive',
//         handler: () => {
//           this.deleteforme(this.chatID,i)
//         }
//       },
//       {
//         text: 'CANCEL',
//         role: 'cancel',
//         handler: () => {
//           //console.log('Cancel clicked');
//         }
//       }

//     ]
//   });

//   actionSheet.present();
// }


// // redirectpage1(link: string): string {
// //         //return this.linkify(link);
// //       }

// // linkify(plainText){
// //         let replacedText;
// //         let replacePattern1;
// //         let replacePattern2;
// //         let replacePattern3;

// //         //URLs starting with http://, https://, or ftp://
// //         replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
// //         if(replacePattern1.test(plainText) == true){
// //           //console.log('yes')
// //         }

// //         return replacedText;
// //        }

// }






import { HttpHeaders } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { ActionSheetController, Alert, IonicPage, ModalController, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ContactPage } from '../contact/contact';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path/ngx';
import { ModalPicPage } from '../modal-pic/modal-pic';
import { ViewChild } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';

import { FileUploadOptions, FileTransferObject,FileTransfer } from '@ionic-native/file-transfer2';
import { GetVideoInfoOptions } from '@ionic-native/video-editor';
import {createViewChild} from "@angular/compiler/src/core";


// import { CreateThumbnailOptions, GetVideoInfoOptions, VideoEditor } from '@ionic-native/video-editor';


@Component({
  selector: 'page-textchat-modal',
  templateUrl: 'textchat-modal.html',
  providers: [FileTransfer]
})


export class TextchatModalPage {

  @ViewChild('myInput') myInput  ;
  @ViewChild('content') private content: any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  showpop : boolean = false;
  chatdata = this.navParams.get('data');
  shareImageme = this.navParams.get('shareImageme');
  editchatdata : any ;
  replychatdata : any;
  oldid : any ='';
  userInput:any={};
  user_deatils:any;
  chatHistoryListing: any=[];
  replyItems : any =[] ;
  postMedia: string;
  postMediaVideo : string;
  win: any = window

  url:any;
  editFlag : boolean = false;
  replyFlag : boolean = false;
  replytext: any;

  reply:any;

  timezone:any = "";

  interval:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public file: File,
    private platform: Platform,
    // public filePath: FilePath,
    private zone: NgZone,
    private modal: ModalController,
    private viewCtrl: ViewController,
    private globalization: Globalization,
    // private videoEditor: VideoEditor,
    private transfer: FileTransfer,
    ) {
    }
    // UploadFile(filetype)
  ionViewDidLoad() {
    console.log('ionViewDidLoad TextChatPage');

    console.log("shareImageme=",this.shareImageme);
    if(this.shareImageme == undefined) {
      console.log("no share Imageme");
    } else {
      console.log("yes share Imageme");
      this.UploadshareImageme();
    }


    if(localStorage.getItem("editflag") === 'true')
    {
      this.myInput.setFocus();
      localStorage.setItem("editflag",'false')
     // this.editFlag = false;
    }
    this.scrollToBottomOnInit();
  }

  ionViewDidEnter() {
    console.log("chat data is ",this.chatdata)
    this.url = this.webservice.chat_apiUrl;
    // this.interval= setInterval(()=> { this.getChatHistory() }, 100);
      this.getChatHistory();
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(30000);
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(10000);
      }
    }, 5000);
  }

  markAsRead(_id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token) ;
    let formdata = new FormData;
    formdata.append("chat_id",_id);
    this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/markAsRead',formdata,headers).then((response:any) => {
      //  alert("send group message"+JSON.stringify(response))
        console.log("send group message=",response);
        if(response.success == true) {

        }
      },(err) => {
        // alert("sendChatText Error is "+ JSON.stringify(err))
      })
  }

  sendChatText() {

    if(this.editFlag === true) {

      console.log("edit chat id is ",this.editchatdata.id)
      let headers = new HttpHeaders();
        headers = headers.set('Authorization', this.token) ;

        // let data = JSON.stringify( {
        //   chat_content : this.userInput.message
        // })
        let data = {
          "chat_content":this.userInput.message
        }

      this.webservice.putApi(this.webservice.chat_apiUrl + 'singleChat/editChat/'+ this.editchatdata.id,data,headers).then((response:any) => {
        console.log("edit chat history message eidt....",response);
        //alert("response edit "+ JSON.stringify(response));
        this.chatHistoryListing= response.data.conversation;
        this.userInput.message = "";
        this.editFlag = false;
        this.getChatHistory();
        console.log("chat history edit....", this.chatHistoryListing)
      });

    }
    else {
    if( this.replyFlag === true)
    {
        this.replyMessage();
    }
    else{

         // alert("user texted message is "+this.userInput.message);
    if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
      this.webservice.presentToast("Can't send empty message");
      return false;
    }else{
      var time = new Date();

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.token)

      let formdata = new FormData;
      formdata.append("receiver_id",this.chatdata.id);
      formdata.append("chat_content",this.userInput.message);
      // if(this.postMedia)
      // {
      //   //alert("inside if ")
      //   let today: any = new Date();
      //   let fileNameSet: string =  'pro_' + today.getTime() + '.jpeg' ;
      //   formdata.append("chat_files",this.postMedia,fileNameSet);
      // }

      this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/createChat',formdata,headers).then((response:any) => {
      //  alert("send group message"+JSON.stringify(response))
        console.log("send group message=",response);
        if(response.success == true) {
          this.userInput.message = "";
          this.getChatHistory();
          // this.getgroupMessageDetails();
        }
      },(err) => {
        alert("sendChatText Error is "+ JSON.stringify(err))
      })
    }

    }

  }
  }

  getChatHistory() {


    this.globalization.getDatePattern (
      { formatLength: 'short', selector: 'date and time'} )
      .then(res => {
        this.timezone = res.iana_timezone ;
         console.log( "time zone=",res );
         console.log("chat id is ",this.chatdata.id)
         let headers = new HttpHeaders();
           headers = headers.set('Authorization', this.token) ;
         this.webservice.getApi(this.webservice.chat_apiUrl + 'singleChat/getChatDetails/'+ this.chatdata.id+"?timezone="+this.timezone,headers).then((response:any) => {
           console.log("chat history message",response);
           this.chatHistoryListing= response.data.conversation.reverse();
           this.replyItems =  this.chatHistoryListing.filter(item => item.type === 'REPLY' );
           console.log("chat history ", this.chatHistoryListing);
           this.scrollToBottomOnInit();
         });
      });

  //  let  timezone = 'Asia/Kolkata' ;

  //   console.log("chat id is ",this.chatdata.id)
  //   let headers = new HttpHeaders();
  //     headers = headers.set('Authorization', this.token) ;
  //   this.webservice.getApi(this.webservice.chat_apiUrl + 'singleChat/getChatDetails/'+ this.chatdata.id+"?timezone="+timezone,headers).then((response:any) => {
  //     console.log("chat history message",response);
  //     this.markAsRead(response.data._id);
  //     this.chatHistoryListing= response.data.conversation;
  //     this.replyItems =  this.chatHistoryListing.filter(item => item.type === 'REPLY' )
  //     console.log("Reply Items are ", this.replyItems)
  //     console.log("chat history ", this.chatHistoryListing)
  //   });

  }

  gotoBack() {
    // this.navCtrl.pop();
    this.navCtrl.push(ContactPage)
  }

  statuspop_old(id) {
    if(this.oldid != '') {
    let oldpopid = this.oldid;
    var oldpop = document.getElementById(oldpopid);
    if( oldpop.style.display = 'block') {
      oldpop.style.display = 'none';
    }
   }
    // alert("id "+id);
    var mydiv = document.getElementById(id);
    mydiv.style.display = 'block';
     this.oldid = id;
    // if( mydiv.style.display = 'block') {
    //   mydiv.style.display = 'none';
    // }
  }

  ////// FILE SHARE ////
sharefile(){
  let actionSheet = this.actionSheetCtrl.create({
    // title: 'Modify your album',
    buttons: [
      {
        text: 'Photo',
        role: 'destructive',
        handler: () => {
         this.proImgUploadGallery('image')
        }
      },
      {
        text: 'Video',
        role: 'destructive',
        handler: () => {
          this.proVideoUploadGallery('video')
           // this.proVideoUploadGallery()
          // this.uploadVideo();
        }
      }
     ]
  });

  actionSheet.present();

}


  proVideoUploadGallery(filetype) {
    // alert("Inside photo upload ... ")

    var randname=Math.random();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO,
    }

    this.camera.getPicture(options).then((postMedia) => {
      //  alert("before getpicture photo upload ... "+JSON.stringify(postMedia));
      console.log("coming1...",postMedia);
      if (postMedia) {
        let fileUri = 'file://' + postMedia;
        console.log('imageData', postMedia)
        console.log('info', fileUri)

        this.webservice.presentLoading();
        this.file.resolveLocalFilesystemUrl(fileUri).then(entry => (entry as FileEntry).file(fileData => {
          console.log("coming2...", fileData);

          //    alert("Inside resolve photo upload ... "+JSON.stringify(fileData));
          this.readandStoreasFile(fileData, filetype);

          /*anuvab 31.12.21*/
          //use promise
          // var promise = new Promise(this.readandStoreasFile(fileData, filetype)).then(function() {
          //   // Here you can pass the bytes to another function.
          //   console.log("coming5...",this.postMedia);
          //   this.UploadFile(filetype);
          //   this.webservice.hideLoader();
          // }).catch(function(err) {
          //   console.log('Error: ',err);
          // });
          /*anuvab 31.12.21*/

        }));

      }else{
        this.webservice.hideLoader();
        alert('Video not uploaded from your device');
      }
    }, (err) => {
      // alert("IN get picture "+JSON.stringify(err))
      console.log(JSON.stringify(err));
    });
  }


  checkFileType(string){
    let arr=[];
    arr= string.split('.', 2);
    return arr[1];
  }

readandStoreasVideoFile(getFile: any,filetype) {
  console.log("getFile 1235=",getFile);
  console.log("filetype 1236=",filetype);


  this.postMedia = '';
  const reader = new FileReader();
 // alert("Inside read and store photo upload ... ")
  console.log("coming2...",getFile);
  reader.onload  = () => {
    let fileBlob: any = new Blob([reader.result], { type: getFile.type });
    this.postMedia = fileBlob;
    console.log("coming3...",this.postMedia);
    //alert("Inside onload photo upload ... "+JSON.stringify(this.postMedia))
  };

  reader.onerror = error => {
    alert('Error: '+ JSON.stringify(error));
  };

  console.log("coming4...",this.postMedia);
  reader.readAsArrayBuffer(getFile);
  setTimeout(() => {
    console.log("coming5...",this.postMedia);
   this.UploadFile(filetype);
    //this.uploadFile();
  }, 500);
}

//Upload video from gallery
// proVideoUploadGallery() {
//   let options: CameraOptions = {
//      quality: 50,
//      destinationType: this.camera.DestinationType.DATA_URL,
//     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
//     , mediaType: this.camera.MediaType.VIDEO
//     , targetHeight: 800
//     , targetWidth: 600
//   };
//   this.camera.getPicture(options).then(async (videoData) => {
//       //await this.uploadVideo(videoUrl);

//             //  alert("file Entery is before resolve locale " + JSON.stringify(videoData));
//               let path = 'file://' + videoData
//               this.webservice.presentLoading();
//               this.file.resolveLocalFilesystemUrl( path).then(entry => (entry as FileEntry).file(fileData => {
//              //   alert("file Entry is "+JSON.stringify(fileData));
//               // this.readandStoreasFile(fileData,'video');
//               this.UploadVideoFile(fileData,'video');
//               }));
//      }, (err) => {
//     // alert("err is "+ JSON.stringify(err))
//     this.webservice.presentToast("Error" + ',' + "Something went wrong." );
//   });
// }




// UploadVideoFile(fileData,filetype) {
//   // alert("user texted message is "+this.userInput.message);
//      var time = new Date();

//      let headers = new HttpHeaders();
//      headers = headers.set('Authorization', this.token)

//      let formdata = new FormData;
//      formdata.append("receiver_id",this.chatdata.id);
//      formdata.append("chat_content",this.userInput.message);
//        console.log("come inside if 1241");
//        let today: any = new Date();
//        let fileNameSet: string =  'pro_' + today.getTime() + (filetype == 'video' ?  'any.mp4' :'.jpeg') ;
//        formdata.append("chat_files",fileData,fileNameSet);
//        console.log("coming3... uploadfile ",fileData);

//      this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/createChat',formdata,headers).then((response:any) => {
//        //alert("send group message"+JSON.stringify(response))
//        console.log("send group message=",response);
//        if(response.success == true) {
//          this.userInput.message = "";
//          this.zone.run(() => {
//          this.getChatHistory();
//          this.webservice.hideLoader();
//          // this.getgroupMessageDetails();
//          });
//        }
//      },(err) => {
//        alert("sendChatText Error is "+ JSON.stringify(err))
//      })

//  }


//Upload photo from gallery

proImgUploadGallery(filetype) {
 // alert("Inside photo upload ... ")
  let options: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI
    , correctOrientation: true
    , allowEdit : true
    , targetHeight: 800
    , targetWidth: 600
  };

  this.camera.getPicture(options).then((postMedia) => {
   //  alert("before getpicture photo upload ... "+JSON.stringify(postMedia));
      console.log("coming...1342",postMedia);


    // this._crop.crop(postMedia, { quality: 100, targetHeight: 400, targetWidth: 400 }).then((cropedImage) => {
      this.webservice.presentLoading();
    this.file.resolveLocalFilesystemUrl(postMedia).then(entry => (entry as FileEntry).file(fileData => {
      console.log("coming...1348",fileData);

//    alert("Inside resolve photo upload ... "+JSON.stringify(fileData));
      this.readandStoreasFile(fileData,'image');

    }));

//   },
//   error => console.error('Error cropping image', error)
// );

  }, (err) => {
    alert("IN get picture "+JSON.stringify(err))
    console.log(JSON.stringify(err));
  });
}


async readandStoreasFile(getFile: any,filetype) {
  this.postMedia = '';
  const reader = new FileReader();
 // alert("Inside read and store photo upload ... ")
  console.log("coming2...",getFile);
  reader.onload  = async () => {
    let fileBlob: any = new Blob([reader.result], { type: getFile.type });
    /*anuvab 31.12.21*/
    this.postMedia = await fileBlob;
    console.log("coming3...",this.postMedia);
    // alert("Inside onload photo upload ... "+JSON.stringify(this.postMedia))
    await this.UploadFile(filetype);
    /*anuvab 31.12.21*/
  };

  reader.onerror = error => {
    alert('Error: '+ JSON.stringify(error));
  };

  console.log("coming4...",this.postMedia);
  reader.readAsArrayBuffer(getFile);
  // setTimeout(() => {
  //   console.log("coming5...",this.postMedia);
  //  this.UploadFile(filetype);
  //   //this.uploadFile();
  // }, 500);
}



UploadFile(filetype) {
  // alert("user texted message is "+this.userInput.message);
     var time = new Date();

     let headers = new HttpHeaders();
     headers = headers.set('Authorization', this.token)

     let formdata = new FormData;
     formdata.append("receiver_id",this.chatdata.id);
     formdata.append("chat_content",this.userInput.message);
    //  if(this.postMedia)
    //  {
      // alert("inside if ")
       console.log("come inside if");
       let today: any = new Date();
       let fileNameSet: string =  'pro_' + today.getTime() + (filetype == 'video' ?  'any.mp4' :'.jpeg') ;
       formdata.append("chat_files",this.postMedia,fileNameSet);
       console.log("coming3... uploadfile ",this.postMedia);
     //  alert("Inside onload photo upload ... upload file "+JSON.stringify(this.postMedia))
    //  }

     this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/createChat',formdata,headers).then((response:any) => {
       //alert("send group message"+JSON.stringify(response))
       console.log("send single message=",response);
       this.webservice.hideLoader();
       if(response.success == true) {
         this.userInput.message = "";
         this.zone.run(() => {
         this.getChatHistory();
         this.webservice.hideLoader();
         // this.getgroupMessageDetails();
         });
       }
     },(err) => {
       alert("sendChatText Error is "+ JSON.stringify(err))
     })

 }



//  UploadshareImagemeStoreasFile(getFile: any,filetype) {
//   this.postMedia = '';
//   const reader = new FileReader();
//  // alert("Inside read and store photo upload ... ")
//   console.log("coming2...",getFile);
//   reader.onload  = () => {
//     let fileBlob: any = new Blob([reader.result], { type: getFile.sharetpes });
//     this.postMedia = fileBlob;
//     console.log("coming3...",this.postMedia);
//     //alert("Inside onload photo upload ... "+JSON.stringify(this.postMedia))
//   };

//   reader.onerror = error => {
//     alert('Error: '+ JSON.stringify(error));
//   };

//   console.log("coming4...",this.postMedia);
//   reader.readAsArrayBuffer(getFile);
//   setTimeout(() => {
//     console.log("coming5...",this.postMedia);
//    this.UploadshareImageme(filetype);
//     //this.uploadFile();
//   }, 500);
// }




//  UploadshareImageme(filetype) {
//   // alert("user texted message is "+this.userInput.message);
//      var time = new Date();

//      let headers = new HttpHeaders();
//      headers = headers.set('Authorization', this.token)

//      let formdata = new FormData;
//      formdata.append("receiver_id",this.chatdata.id);
//      formdata.append("chat_content",this.userInput.message);
//     //  if(this.postMedia)
//     //  {
//       // alert("inside if ")
//        console.log("come inside if");
//        let today: any = new Date();
//        let fileNameSet: string =  'pro_' + today.getTime() + (filetype == 'video' ?  'any.mp4' :'.jpeg') ;
//        formdata.append("chat_files",this.postMedia,fileNameSet);
//        console.log("coming3... uploadfile ",this.postMedia);
//      //  alert("Inside onload photo upload ... upload file "+JSON.stringify(this.postMedia))
//     //  }

//      this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/createChat',formdata,headers).then((response:any) => {
//        //alert("send group message"+JSON.stringify(response))
//        console.log("send group message=",response);
//        if(response.success == true) {
//          this.userInput.message = "";
//          this.zone.run(() => {
//          this.getChatHistory();
//          this.webservice.hideLoader();
//          // this.getgroupMessageDetails();
//          });
//        }
//      },(err) => {
//        alert("sendChatText Error is "+ JSON.stringify(err))
//      })

//  }

//uploadFile() {
  // this.commonService.showLoader();
  // const frmData = new FormData();
  // if (this.postMedia != '') {
  //   let today: any = new Date();
  //   let fileNameSet: string = (this.postMedia.type).indexOf("image") > -1 ? 'pro_' + today.getTime() + '.jpeg' : 'pro_' + today.getTime() + 'any.mp4';
  //   frmData.append("upload", this.postMedia, fileNameSet);
  //   frmData.append("token", localStorage.getItem('liteensocialToken'));
  //   frmData.append("media_type", 'post');

  //   this.apiService.fileUploadBlob('common/fileUpload', frmData).subscribe(resp => {
  //     // alert("image upload api call: " + JSON.stringify(resp))

  //     if (resp.success) {
  //       this.postData.media = resp.media;
  //       this.postData.media_type = 'image';
  //       this.changeRef.detectChanges();
  //       // this.viewBeforePostStory();
  //       setTimeout(() => {
  //         // this.commonService.dismissLoader();
  //         this.commonService.showToast(resp.message);
  //       }, 500)
  //     } else {
  //       // this.commonService.dismissLoader();
  //       this.commonService.showToast(resp.message);
  //     }
  //       this.commonService.dismissLoader();
  //   }, error => {
  //     this.commonService.dismissLoader();
  //     this.commonService.showToast('Connection problem, please try again');
  //   });
  // }
//}









UploadshareImageme() {
  this.webservice.presentLoading()

      console.log('strat upload');

      //var targetPath = this.pathForFile(this.videoId);
      var targetPath = this.shareImageme.photopath;

      let headers = new Headers({Authorization: this.token});
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Connection', 'close');

      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
      fileKey: 'photo',
      fileName: targetPath,
      chunkedMode: false,
      headers: { Authorization: this.token },
      mimeType: "multipart/form-data",
      params : {'receiver_id': this.chatdata.id, 'chat_content':''}
      }

      //console.log('destination : ', this.videoId);

      console.log('targetPath : ',targetPath);
      console.log('options1 : ',options1);

      fileTransfer.upload(targetPath, this.webservice.chat_apiUrl+'singleChat/createChat', options1)
      .then((result) => {
        console.log("upload result=",result);
        // let response: any  = result.response;
        // response = JSON.parse(response);
        // console.log('after json parse : ',response);
        this.getChatHistory();
        // this.webservice.hideLoader();

      }, (err) => {
        console.log(err);
      this.webservice.hideLoader();
      this.webservice.presentToast('Error while uploading file.');

      });

}




UploadshareImageme1() {
  this.webservice.presentLoading()

      console.log('strat upload');

      //var targetPath = this.pathForFile(this.videoId);
      var targetPath = this.shareImageme.photopath;

      let headers = new Headers({Authorization: this.token});
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Connection', 'close');

      const fileTransfer: FileTransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
      fileKey: 'photo',
      fileName: targetPath,
      chunkedMode: false,
      headers: { Authorization: this.token },
      mimeType: "multipart/form-data",
      params : {'receiver_id': this.chatdata.id, 'chat_content':''}
      }

      //console.log('destination : ', this.videoId);

      console.log('targetPath : ',targetPath);
      console.log('options1 : ',options1);

      fileTransfer.upload(targetPath, this.webservice.chat_apiUrl+'singleChat/createChat', options1)
      .then((result) => {
        console.log("upload result=",result);
        // let response: any  = result.response;
        // response = JSON.parse(response);
        // console.log('after json parse : ',response);
        this.getChatHistory();
        // this.webservice.hideLoader();

      }, (err) => {
        console.log(err);
      this.webservice.hideLoader();
      this.webservice.presentToast('Error while uploading file.');

      });

}
























showpopuplargeimg(url) {
    const mymodal = this.modal.create(ModalPicPage, {"url": url},{cssClass : 'my-custom-class'});
  mymodal.present();
}

//End of Upload photo from gallery
statuspop(chat,type) {
  if(type === 'text' && this.chatdata.id === chat.receiver_id )
  {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Reply',
          role: 'destructive',
          handler: () => {
            this.replyMessageFlag(chat,type);
          }
        },
        {
          text: 'Edit',
          role: 'destructive',
          handler: () => {
               this.editMessage(chat);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            //this.uploadVideo()
            console.log(chat);
            this.deleteMessageForMe(chat);
            // k
          },
        },
        {
          text: 'Delete everyone',
          role: 'destructive',
          handler: () => {
            this.deleteMessage(chat);
          },
        }
       ]
    });

    actionSheet.present();
  }
 else {
  if(type === 'text' && this.chatdata.id != chat.receiver_id )
  {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Reply',
          role: 'destructive',
          handler: () => {
            this.replyMessageFlag(chat,type);
          }
        },
        // {
        //   text: 'Edit',
        //   role: 'destructive',
        //   handler: () => {
        //        this.editMessage(chat);
        //   }
        // },
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   handler: () => {
        //     this.deleteMessage(chat);
        //   },
        // }
       ]
    });

    actionSheet.present();
  }else {
    if(type === 'image' && this.chatdata.id === chat.receiver_id )
    {
      let actionSheet = this.actionSheetCtrl.create({
        // title: 'Modify your album',
        buttons: [
          {
            text: 'Reply',
            role: 'destructive',
            handler: () => {
              this.replyMessageFlag(chat,type);
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.deleteMessage(chat);
            },
          }
         ]
      });

      actionSheet.present();
    }
    else {
      if(type === 'image' && this.chatdata.id != chat.receiver_id ) {
        let actionSheet = this.actionSheetCtrl.create({
          // title: 'Modify your album',
          buttons: [
            {
              text: 'Reply',
              role: 'destructive',
              handler: () => {
                this.replyMessageFlag(chat,type);
              }
            }
           ]
        });

        actionSheet.present();
      }
    }
  }
}



}

replyMessageFlag(chat,type) {
this.replyFlag = true;
this.replychatdata = chat;
console.log(type);
console.log(chat);


if(type === 'text') {
  this.reply = "text";
  this.replytext = chat.chat_content ;
} else{
    if(type === 'image') {
  this.reply = "image";

      this.replytext = this.url+chat.chat_files[0].file_link;
      console.log(this.replytext);

    }
}
}

replyMessage() {
  var time = new Date();

  let headers = new HttpHeaders();
  headers = headers.set('Authorization', this.token)

  let formdata = new FormData;
  formdata.append("receiver_id",this.replychatdata.id);
  formdata.append("chat_content",this.userInput.message);
  // if(this.postMedia)
  // {
  //   //alert("inside if ")
  //   let today: any = new Date();
  //   let fileNameSet: string =  'pro_' + today.getTime() + '.jpeg' ;
  //   formdata.append("chat_files",this.postMedia,fileNameSet);
  // }

  this.webservice.postApi(this.webservice.chat_apiUrl + 'singleChat/replyToChat/'+this.replychatdata.id,formdata,headers).then((response:any) => {
   //alert("send group message"+JSON.stringify(response))
    console.log("send group message=",response);
    if(response.success == true) {
      this.replyFlag = false ;
      this.userInput.message = "";
      this.getChatHistory();
      // this.getgroupMessageDetails();
    }
  },(err) => {
    alert("sendChatText Error is "+ JSON.stringify(err))
  })
}

editMessage(chat) {

  // this.navCtrl.setRoot(this.navCtrl.getActive().component);
   this.editFlag = true;
   //this.viewCtrl._didLoad();
   this.userInput.message  = chat.chat_content ;
   this.editchatdata = chat ;
   localStorage.setItem("editflag",'true')
   this.myInput.setFocus()
}

deleteMessage(chat) {

  console.log("edit chat id is ",chat.id)
  let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token) ;

   this.webservice.delApi(this.webservice.chat_apiUrl + 'singleChat/deleteChat/'+ chat.id,headers).then((response:any) => {
    console.log("edit chat history message eidt....",response);
    //alert("response edit "+ JSON.stringify(response));
    this.chatHistoryListing= response.data.conversation;
    this.userInput.message = "";
    this.getChatHistory();
    console.log("chat history edit....", this.chatHistoryListing)
  });

}

deleteMessageForMe(chat) {

  console.log("delete chat",chat);
  console.log("delete chat id",chat.id);
  console.log("userid",this.userid);

  let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token) ;

   this.webservice.delApi(this.webservice.chat_apiUrl + 'singleChat/deleteChatFor/'+ chat.id+'?users='+this.userid,headers).then((response:any) => {
    console.log("edit chat history message eidt....",response);
    console.log("delete message response=",response);
    this.getChatHistory();
    console.log("chat history edit....", this.chatHistoryListing)
  });

}

setFocus() {
  if(this.editFlag === true)
  this.myInput.setFocus()
}

}



