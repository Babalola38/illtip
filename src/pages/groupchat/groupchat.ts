import { HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, NgZone } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { GroupchatditailsPage } from '../groupchatditails/groupchatditails';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
import { Globalization } from '@ionic-native/globalization';
//import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GroupchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
//@Pipe({name: 'linkify'})
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {

  @ViewChild('myInput') myInput  ;
  @ViewChild('content') private content: any;
  public token = localStorage.getItem('access-token-illTip');
  GroupChat = this.navParams.get('groupChat');
  public userid=localStorage.getItem("loginuserId");
  // public userid="60ae535481f7dd6493484027";

  //pipes: [linkify];


  GroupChatUrl:any;

  groupUser:any=[];
  //GroupUser:any=[];
  GroupUsersList : any = '';
  zoom_Item:boolean = false;

  userInput:any={};

  chatHistoryListing: any=[];
  chatData:any =[];
  page=1;
  editFlag : boolean = false;
  editchatdata : any ;
  postMedia: string;
  url:any;
  replychatdata : any;
  replyFlag : boolean = false;
  replytext: any;

  reply:any;
  replyItems : any =[] ;

  Users:any;

  GroupChatUsers:any =[] ;

  interval:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private webservice: WebserviceProvider,
              private platform:Platform,
              private camera: Camera,
              public file: File,
              private zone: NgZone,
              private globalization: Globalization,
              public actionSheetCtrl: ActionSheetController,)
  {
  }


  ionViewDidLoad() {
    this.url = this.webservice.chat_apiUrl
    if(localStorage.getItem("editflag") === 'true')
    {
      this.myInput.setFocus();
      localStorage.setItem("editflag",'false')
      // this.editFlag = false;
    }
    // console.log('ionViewDidLoad GroupchatPage');
    // this.groupUsers();
    // this.GroupChatUrl = this.webservice.chat_apiUrl+'groupChatImage/'
    // console.log(this.GroupChat.groupId._id);
  }

  ionViewWillEnter() {
    this.groupUser =[];
    this.GroupChatUsers = [];

    console.log('ionViewDidLoad GroupchatPage');
    this.groupUsers();
    this.GroupChatUrl = this.webservice.chat_apiUrl+'groupChatImage/'
    console.log(this.GroupChat);
    console.log("Group Name ", this.GroupChat.groupId.groupName);
    console.log("Group User List is .......in viewwillenter", this.GroupUsersList);
    console.log(this.userid);

    this.getgroupMessageDetails();
    // this.interval= setInterval(()=> { this.getgroupMessageDetails() }, 1000);

    // this.getgroupMessageDetails();


    this.markAsRead();

    this.GroupChatUser();
    this.scrollToBottomOnInit();
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(30000);
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(10000);
      }
    }, 3000);
  }

  GroupChatUser() {
    this.webservice.GroupUser('groupchat/getGroupChatDetails/',this.GroupChat.groupId._id).then((response:any) => {
      console.log("GroupChatUser response 108=",response);
      // this.GroupChatUsers = response.result;

      // let Names = '' ;
      for(var i=0; i <response.result.length; i++) {
        console.log("in for ........", response.result[i].groupUser.name)
        // if(response.result[i].groupUser.name)
        // Names= Names + response.result[i].groupUser.name  + ((i === (response.result.length -1)) ? '' : ',');
        // console.log("names are ", Names);
        let chatUserId = response.result[i].groupUser.chatUserId;
        this.webservice.OtheruserProfile(this.token,chatUserId).then((data:any)=>{
          this.GroupChatUsers.push(data.data);
        })
      }
    });
  }

  groupUsers() {
    this.webservice.presentLoading();
    this.webservice.GroupUser('groupchat/getGroupChatDetails/',this.GroupChat.groupId._id).then((response:any) => {
      this.webservice.hideLoader();
      console.log("response=",response);
      this.Users = response.result;
      this.groupUser = response.result;
      console.log("group Users List ", this.groupUser);

      let names = '' ;
      for(var i=0; i <response.result.length; i++) {
        console.log("in for ........", response.result[i].groupUser.name)
        if(response.result[i].groupUser.name)
          names= names + response.result[i].groupUser.name  + ((i === (response.result.length -1)) ? '' : ',');
        console.log("names are ", names);
        this.GroupUsersList = names;
        // this.GroupUsersList = this.GroupUsersList + (response.result[i].groupUser.name) + ',';
        let chatUserId = response.result[i].groupUser.chatUserId;
        // console.log("chatUserId=",chatUserId);
        this.webservice.OtheruserProfile(this.token,chatUserId).then((data:any)=>{
          this.groupUser.push(data.data);
          // console.log("this.GroupUser=",this.GroupUser);
        })
      }
      console.log("Group User List is .......", this.GroupUsersList);
    })
  }



  // zoomImage(image: string): void {
  //   console.log("come=",image);

  //   var PhotoViewer: any;
  //   this.platform.ready()
  //   .then(()=>{
  //      if(PhotoViewer) // make sure it's loaded (works only on Android and iOS)
  //       PhotoViewer.show(image);
  //   });
  // }


  zoomImage(image) {
    this.zoom_Item = true;
  }

  dozoomOut() {
    this.zoom_Item = false;
  }


  doGroupChatDetails() {
    console.log("this.GroupChatUsers=",this.GroupChatUsers);

    this.navCtrl.push(GroupchatditailsPage,{'groupChat':this.GroupChat,'groupUsers':this.GroupChatUsers,'groupChatId':this.GroupChat.groupId._id});
  }


  // getgroupMessageDetails() {
  //   this.webservice.GroupUser('groupchat/groupMessageDetails/',this.GroupChat._id).then((response:any) => {
  //     console.log("group chat message details=",response);
  //   })
  // }

  markAsRead() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token) ;
    let formdata = new FormData;
    formdata.append("groupId",this.GroupChat.groupId._id);
    this.webservice.postApi(this.webservice.chat_apiUrl + 'groupChat/markAsRead',formdata,headers).then((response:any) => {
      //  alert("send group message"+JSON.stringify(response))
      console.log("send group message=",response);
      if(response.success == true) {

      }
    },(err) => {
      alert("sendChatText Error is "+ JSON.stringify(err))
    })
  }

  async getgroupMessageDetails() {



    return new Promise(resolve => {


      let timezone  = '';
      this.globalization.getDatePattern (
        { formatLength: 'short', selector: 'date and time'} )
        .then(res => {
          timezone = res.iana_timezone ;

          // this.webservice.groupMessageDetails('groupchat/groupMessageDetails/',"60ae535481f7dd6493484027").then((response:any) => {
          this.webservice.groupMessageDetails('groupchat/groupMessageDetails/',this.GroupChat.groupId._id,timezone).then((response:any) => {
            // console.log("group chat message details==",response);
            // this.chatHistoryListing.push(response.result);
            this.chatData = [];
            for (var i = 0; i < response.result.length; i++) {
              // if(response.result[i]._id == this.userid) {

              // }

              var data = {
                chatDate: response.result[i].chatDate,
                chatText: response.result[i].chatText,
                contentType: response.result[i].contentType,
                id: response.result[i]._id,
                senderId: response.result[i].senderId,
                senderUser: response.result[i].senderUser,
                chatFiles : response.result[i].chatFiles,
                parentChatId : response.result[i].parentChatId
              };
              this.chatData.push(data);
              // this.chatHistoryListing = this.chatData;
              this.chatHistoryListing = this.chatData;
              this.replyItems =  this.chatHistoryListing.filter(item => (item.contentType === 'REPLY' && item.parentChatId != null) )
              console.log("reply Items are ",this.replyItems)
              // console.log("group chat message details==",this.chatHistoryListing);
              this.scrollToBottomOnInit();
            }
          })
        })


      //   let  timezone = 'Asia/Kolkata' ;

      // this.webservice.groupMessageDetails('groupchat/groupMessageDetails/',this.GroupChat.groupId._id,timezone).then((response:any) => {
      //   console.log("group chat message details=",response);
      //   this.chatData = [];
      //   for (var i = 0; i < response.result.length; i++) {

      //     var data = {
      //       chatDate: response.result[i].chatDate,
      //       chatText: response.result[i].chatText,
      //       contentType: response.result[i].contentType,
      //       id: response.result[i]._id,
      //       senderId: response.result[i].senderId,
      //       senderUser: response.result[i].senderUser,
      //       chatFiles : response.result[i].chatFiles,
      //       parentChatId : response.result[i].parentChatId
      //     };
      //     this.chatData.push(data);
      //     // this.chatHistoryListing = this.chatData.reverse()
      //     this.chatHistoryListing = this.chatData;
      //     this.replyItems =  this.chatHistoryListing.filter(item => (item.contentType === 'REPLY' && item.parentChatId != null) )
      //     console.log("reply Items are ",this.replyItems)
      //   console.log("group chat message details=",this.chatHistoryListing);

      //   }
      // })

    });
  }

  doInfinite(infiniteScroll) {
    this.page++
    //console.log('doInfinite page,',this.page);
    this.getgroupMessageDetails().then((data)=>{
      //console.log("data scroll", data);
      infiniteScroll.complete();
    });
  }

  sendChatText() {
    if(this.editFlag === true)  {
      if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
        this.webservice.presentToast("Can't send empty message");
        return false;
      }else{
        // formdata.append("chatFiles",new File([],"demo"));
        //  let data = {
        //   "groupId":this.GroupChat._id,
        //   "senderId":this.userid,
        //   "contentType":"text",
        //   "chatText":this.userInput.message,
        //   "chatFiles": ''
        // }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', this.token) ;

        // let data = JSON.stringify( {
        //   chat_content : this.userInput.message
        // })
        let data = {
          "contentType":'text',
          "chatText" : this.userInput.message
        }
        this.webservice.putApi(this.webservice.chat_apiUrl + 'groupchat/editChat/'+ this.editchatdata.id,data,headers).then((response:any) => {
          console.log("send group message=",response);
          if(response.success == true) {
            this.editFlag = false;
            this.chatData = [];
            this.chatHistoryListing = []
            this.userInput.message = "";
            // this.groupUsers();
            this.getgroupMessageDetails();
          }
        })
      }

    }
    else {
      if( this.replyFlag === true)
      {
        this.replyMessage();
      }
      else{
        var res =(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(!this.userInput.message || this.userInput.message.length<1 || this.userInput.message.trim()==""){
          this.webservice.presentToast("Can't send empty message");
          return false;
        }else{
          var time = new Date();
          let formdata = new FormData;
          formdata.append("groupId",this.GroupChat.groupId._id);
          formdata.append("senderId",this.userid);
          formdata.append("contentType","text");
          formdata.append("chatText",this.userInput.message);
          // formdata.append("chatFiles",new File([],"demo"));
          //  let data = {
          //   "groupId":this.GroupChat._id,
          //   "senderId":this.userid,
          //   "contentType":"text",
          //   "chatText":this.userInput.message,
          //   "chatFiles": ''
          // }
          this.webservice.sendGroupMessage('groupchat/sendGroupMessage/',formdata).then((response:any) => {
            console.log("send group message=",response);
            if(response.success == true) {
              this.chatData = [];
              this.chatHistoryListing = []
              this.userInput.message = "";
              this.getgroupMessageDetails();
            }
          })
        }
      }
    }


  }

  gotoBack() {
    this.navCtrl.pop();
  }

  statuspop(chat,type) {
    console.log("chat=",chat);

    if(type === 'text' && chat.senderId != this.userid )
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
          }
        ]
      });

      actionSheet.present();
    }
    else {
      if(type === 'text' && chat.senderId === this.userid)
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
            // {
            //   text: 'Copy',
            //   role: 'destructive',
            //   handler: () => {
            //     //this.uploadVideo()
            //   },
            // },
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
        if(type === 'image'  && chat.senderId === this.userid) {
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
              //   text: 'Copy',
              //   role: 'destructive',
              //   handler: () => {
              //     //this.uploadVideo()
              //   },
              // },
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
          if(type === 'image'  && chat.senderId != this.userid) {
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
      this.replytext = chat.chatText ;
    } else{
      if(type === 'image') {
        this.reply = "image";

        this.replytext = this.url+chat.chatFiles[0].filePath;
        console.log(this.replytext);

      }else{
        this.reply = "video";

        this.replytext = this.url+chat.chatFiles[0].filePath;
        console.log(this.replytext);
      }
    }
  }

  replyMessage() {
    var time = new Date();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token)

    let formdata = new FormData;
    formdata.append("groupId",this.GroupChat.groupId._id);
    formdata.append("contentType",'REPLY');
    formdata.append("chatText",this.userInput.message);
    // if(this.postMedia)
    // {
    //   //alert("inside if ")
    //   let today: any = new Date();
    //   let fileNameSet: string =  'pro_' + today.getTime() + '.jpeg' ;
    //   formdata.append("chat_files",this.postMedia,fileNameSet);
    // }

    this.webservice.postApi(this.webservice.chat_apiUrl + 'groupchat/replyToChat/'+this.replychatdata.id,formdata,headers).then((response:any) => {
      //alert("send group message"+JSON.stringify(response))
      console.log("reply chat send group message=",response);
      if(response.success == true) {
        this.replyFlag = false ;
        this.userInput.message = "";

        this.getgroupMessageDetails();
        //this.getChatHistory();
        // this.getgroupMessageDetails();
      }
    },(err) => {
      alert("sendChatText Error is "+ JSON.stringify(err))
    })
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
            // this.proImgUploadGallery('video')
            this.proVideoUploadGallery('video')
            //this.uploadVideo()
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
          // @ts-ignore
          // var promise = new Promise(this.readandStoreasFile(fileData, filetype)).then(function() {
          //   // Here you can pass the bytes to another function.
          //   console.log("coming5...",this.postMedia);
          //   this.UploadFile(filetype);
          //   this.webservice.hideLoader();
          // }).catch(function(err) {
          //   console.log('Error: ',err);
          // });
          // this.webservice.hideLoader();
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
      console.log("coming...",postMedia);


      // this._crop.crop(postMedia, { quality: 100, targetHeight: 400, targetWidth: 400 }).then((cropedImage) => {
      this.webservice.presentLoading();
      this.file.resolveLocalFilesystemUrl(postMedia).then(entry => (entry as FileEntry).file(fileData => {
        console.log("coming...",fileData);

        //    alert("Inside resolve photo upload ... "+JSON.stringify(fileData));
        this.readandStoreasFile(fileData, filetype);

        /*anuvab 31.12.21*/
        //use promise
        // @ts-ignore
        // var promise = new Promise(this.readandStoreasFile(fileData, filetype)).then(function() {
        //   // Here you can pass the bytes to another function.
        //   console.log("coming5...",this.postMedia);
        //   this.UploadFile(filetype);
        //   this.webservice.hideLoader();
        // }).catch(function(err) {
        //   console.log('Error: ',err);
        // });
        // this.webservice.hideLoader();
        /*anuvab 31.12.21*/

      }));

      //   },
      //   error => console.error('Error cropping image', error)
      // );

    }, (err) => {
      // alert("IN get picture "+JSON.stringify(err))
      console.log(JSON.stringify(err));
    });
  }


  async readandStoreasFile(getFile: any,filetype) {
    this.postMedia = '';
    const reader = new FileReader();
    // alert("Inside read and store photo upload ... ")
    console.log("coming2...",getFile);
    console.log("filereader...",reader);
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
    //  await this.UploadFile(filetype);
    //   //this.uploadFile();
    // }, 5000);

  }

  UploadFile(filetype) {
    // alert("user texted message is "+this.userInput.message);
    var time = new Date();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token)

    let formdata = new FormData;
    formdata.append("groupId",this.GroupChat.groupId._id);
    formdata.append("senderId",this.userid);
    formdata.append("contentType","files");
    formdata.append("fileType",filetype);
    formdata.append("chatText",'');
    //  if(this.postMedia)
    //  {
    // alert("inside if ")
    console.log("come inside if");
    let today: any = new Date();
    let fileNameSet: string =  'pro_' + today.getTime() + (filetype == 'video' ?  'any.mp4' :'.jpeg') ;
    formdata.append("chatFiles",this.postMedia,fileNameSet);
    console.log("coming3... uploadfile ",this.postMedia);
    //  alert("Inside onload photo upload ... upload file "+JSON.stringify(this.postMedia))
    //  }

    this.webservice.postApi(this.webservice.chat_apiUrl + 'groupchat/sendGroupMessage',formdata,headers).then((response:any) => {
      // alert("Upload File send group message"+JSON.stringify(response))
      console.log("send group message UPload File =",response);
      if(response.success === true) {
        this.userInput.message = "";
        this.webservice.hideLoader();
        this.zone.run(() => {
          // this.groupUsers();
          // this.getChatHistory();
          // this.chatHistoryListing = []
          this.getgroupMessageDetails();
        });
      }
    },(err) => {
      alert("sendChatText Error is "+ JSON.stringify(err))
    })

  }

  checkFileType(string){
    let arr=[];
    arr= string.split('.', 2);
    return arr[1];
  }

  editMessage(chat) {
    console.log("chat data is group ", JSON.stringify(chat))
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.editFlag = true;
    //this.viewCtrl._didLoad();
    this.userInput.message  = chat.chatText ;
    this.editchatdata = chat ;
    localStorage.setItem("editflag",'true')
    // this.userInput.setFocus()
  }



  deleteMessage(chat) {

    console.log("edit chat id is ",chat)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token) ;


    this.webservice.delApi(this.webservice.chat_apiUrl + 'groupchat/deleteChat/'+ chat.id,headers).then((response:any) => {
      console.log("edit chat history message eidt....",response);
      //alert("response edit "+ JSON.stringify(response));
      this.chatData = [];
      this.chatHistoryListing = []
      this.userInput.message = "";
      this.getgroupMessageDetails();

      console.log("chat history edit....", this.chatHistoryListing)
    });

  }

  setFocus() {
    if(this.editFlag === true)
      this.myInput.setFocus()
  }
}
