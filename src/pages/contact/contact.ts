import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

//APP SERVICES
// import { AppService } from '../../services/app.service';
// import { UtilityService } from '../../services/utility.service';
// import { CONFIG } from '../../config';
import * as _ from 'underscore';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { CreategroupchatPage } from '../creategroupchat/creategroupchat';
import { FriendlistPage } from '../friendlist/friendlist';
import { FriendsPage } from '../friends/friends';
import { GroupchatPage } from '../groupchat/groupchat';
import { TextchatModalPage } from '../textchat-modal/textchat-modal';
import { UserprofilePage } from '../userprofile/userprofile';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  chatuserlist:any=[];
  chat_search:any=[];
  temp_chat_search:any=[];
  private page:number=1;
  private limit:number=10;
   hasMoreData: any;
  messageDataObj:any;
  url:any;
  searchTerm: any;

  searchfriendother:any

  nochat: boolean = false;

  GroupChat:any=[];
  GroupChatUrl:any;
  haveGroup:boolean = false;
  searchFlag: boolean = false;
  isSearchbarOpend: boolean;
  // url=CONFIG.API_ENDPOINT+'users/userThumb/'
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private webservice: WebserviceProvider,
  public actionSheetCtrl: ActionSheetController,
  private alertController: AlertController) {
    this.searchTerm = '';
  }
   ionViewDidLoad() {
    // this.GroupChatUrl = this.webservice.chat_apiUrl+'/groupChatImage/'
    // this.url = this.webservice.apiUrl+'users/userThumb/'
    // this.chatuserlist=[];
    // this.getChatlist();
    // this.getGroupChatList();
    // this.temp_chat_search = [];
    // console.log("temp chat search is "+ JSON.stringify(this.temp_chat_search));
  }
  ionViewWillEnter() {
    this.GroupChatUrl = this.webservice.chat_apiUrl+'/groupChatImage/'
    this.url = this.webservice.apiUrl+'users/userThumb/'
    this.chatuserlist=[];
    this.getChatlist();
    this.getGroupChatList();
    this.temp_chat_search = [];
    console.log("temp chat search is "+ JSON.stringify(this.temp_chat_search));
  }

 
  // getChatlist(){
  //   this.chat_search=[];

  //   var list =[];
  //   var limits =[]
  //   var name,image,userId,type
  //   let data={
  //     'userId':this.userid
  //   }
  //   console.log(this.page)
  //  // return new Promise(resolve => {
  //   this.webservice.presentLoading();
  //     this.webservice.messageList('api/chatListUser/',data).then((response:any) => {
  //       this.webservice.hideLoader();
  //        console.log("chat lsit", response);
  //        //this.chatuserlist=response.Chats
  //        if(response.success){
  //         if(response.Chats.length===0){
  //           this.webservice.presentToast('No Converstion')
  //           //console.log('no image')
  //           this.hasMoreData = false;
  //         }else{
  //           this.hasMoreData = true;
  //           this.chatuserlist = response.Chats;
  //           console.log("chats=",this.chatuserlist);







  //           for(let row of response.Chats){
  //             if(row.userId==this.userid){
  //               if(row.remoteUserId !=null||row.remoteUserId !=""){
  //                 this.getotherprofileDetils(row.remoteUserId).then((data:any)=>{
  //                 console.log('row1',data)
  //                 if(data.success == true) {
  //                   this.messageDataObj = {
  //                     'name': data.data.fullName,
  //                     'image': data.data.profilePicture,
  //                     'created_date': row.updatedAt,
  //                     'date':row.time,
  //                     'userId':row.remoteUserId,
  //                     'unreadcount':row.unreadcount,
  //                     'type':row.type,
  //                     'msg':row.msg,
  //                 } 
  
  //                 this.chat_search.push(this.messageDataObj);
  //                 this.temp_chat_search.push(this.messageDataObj)
  //                 //list.push(this.messageDataObj);
  //                 // this.chatuserlist = _.sortBy(list,function(node){
  //                 //   return (node.date) * -1;
  //                 // });
  //                 this.chatuserlist.push(this.messageDataObj)
  //                 console.log('sorted',this.chatuserlist)
  
  //                 return this.chatuserlist.sort((a, b) => {
  //                   return <any>new Date(b.created_date) - <any>new Date(a.created_date);
  //                 });
  //                 } else {
  //                   this.nochat = true;
  //                 }
  //               })
  //               }
                
  //             }else{
  //               if(row.remoteUserId !=null||row.remoteUserId !=""){
  //               this.getotherprofileDetils(row.userId).then((data:any)=>{
  //                 console.log('chat data2',data)
  //                 if(data.success == true) {
  //                   this.messageDataObj = { 
  //                     'name': data.data.fullName,
  //                     'image': data.data.profilePicture,
                      
  //                     'created_date': row.updatedAt,
  //                      'date':row.time,
  //                     'userId':row.userId,
  //                     'unreadcount':row.unreadcount,
  //                     'type':row.type,
  //                     'msg':row.msg,
  //                 } 
  //                 this.chat_search.push(this.messageDataObj);
  //                 this.temp_chat_search.push(this.messageDataObj)
  //                 // list.push(this.messageDataObj);
  //                 // this.chatuserlist = _.sortBy(list,function(node){
  //                 //   return (node.date) * -1;
  //                 // });
  //                 this.chatuserlist.push(this.messageDataObj)
  //                 return this.chatuserlist.sort((a,b) => {
  //                   return <any>new Date(b.created_date) - <any>new Date(a.created_date);
  //                 });
  //                 } else {
  //                   this.nochat = true;
  //                 }
  //               })
  //             }
  //             }
  //           }
            
  //         }
  //        }
      
  //     }, (error) => {
  //   this.webservice.hideLoader();
  //     console.log("error ts: ", error);
  //     })
  //     ////Pagination
  //   //});
  // }



  getChatlist(){
    this.chat_search=[]
    let data={
      'search_key':""
    }
    console.log(this.page)
   // return new Promise(resolve => {

    
    this.webservice.presentLoading();
      this.webservice.RecentChatUserList('singleChat/getRecentChatUserList/',data).subscribe((response:any) => {
        this.webservice.hideLoader();
         console.log("chat lsit", response);
         //this.chatuserlist=response.Chats
         if(response.success){
          if(response.data.length===0){
            this.webservice.presentToast('No Converstion')
            //console.log('no image')
            this.hasMoreData = false;
          }else{
            this.hasMoreData = true;
            this.chatuserlist=response.data
            console.log("chats=",this.chatuserlist);




            for(let row of this.chatuserlist) {
              console.log("row=",row.last_conversation.chat_content);
              
              if(row.chatUserId==this.userid) {
                console.log("my profile");
              } else {
                this.getotherprofileDetils(row.chatUserId).then((data:any)=>{
                  
                  if(data.success == true) {
                    this.messageDataObj = {
                      '_id':row._id,
                      'complete_chat_id':row.complete_chat_id,
                      'name': data.data.fullName,
                      'image': data.data.profilePicture,
                      'created_date': row.last_conversation.createdAt,
                      'date':row.last_conversation.updatedAt,
                      'userId':row.chatUserId,
                      // 'unreadcount':row.unreadcount,
                      'type':row.last_conversation.type,
                      'msg':row.last_conversation.chat_content,
                      'unread_message_count':row.unread_message_count,
                  } 
                  this.chat_search.push(this.messageDataObj)
                  console.log("this.chat_search=",this.chat_search);
                  
                  }
                })
              }
            }
            
          }
         }
      
      }, (error) => {
    this.webservice.hideLoader();
      console.log("error ts: ", error);
      })
      ////Pagination
    //});
  }

  GoFriendList() {
    this.navCtrl.push(FriendsPage,{'id':this.userid});
  }

  // /groupchat/getGroupChatDetails?id=6032529ed920aa1e600698c3
  // http://18.191.93.75:3001/groupchat/getGroupListFromAdmin?userId=5c596eeb759cf9195c90280a
  getGroupChatList() {
    this.webservice.getGroupChata('groupchat/getGroupListByUserId',this.userid).then((response:any) => {
      console.log(response);
      if(response.success == true) {
        this.GroupChat = response.result;
        this.haveGroup = true;
      } else {
        this.haveGroup = false;
      }
      
    })
  }

  // doInfinite(infiniteScroll) {
  //   console.log('doInfinite page,  '+ this.page);
  //   this.page++;
   
  //   this.getChatlist().then((data)=>{
  //       console.log("data", data);
  //       infiniteScroll.complete();
  //  });
   
  //  }


  ///// TEXT CHAT ////
gotoChat(id,fullName,remoteuserImage,userimage){
  let chatdata={
    'id':id,
    'fullName':fullName,
    'remoteuserImage':remoteuserImage,
    'userimage':userimage
  }
  console.log('datas',chatdata)
  if(this.searchFlag === true)
  { 
    this.searchFlag = false;
    this.chat_search =  this.temp_chat_search;
    this.searchTerm = '';
  }
 
  this.navCtrl.push(TextchatModalPage,{'data':chatdata})
}
/////// USER DETAILS ///
getotherprofileDetils(userid){
 // console.log('hello',userid)
  if(userid !=null || userid !=""){
    console.log('hello',userid)
    return this.webservice.OtheruserProfile(this.token,userid).then()
  }
    
}


///// GOTO OTHER PROFILE //////
goOtherProfile(id,fullName){
  console.log('id',id)
      let data={
        'userid':id,
        'fullName':fullName
      }
      this.navCtrl.push(UserprofilePage,{'data':data})
}


    getItems(ev: any) {
      // Reset items back to all of the items
      // this.initializeItems();
      
     
     this.chatuserlist=this.chat_search
      // set val to the value of the searchbar
      let val = ev.target.value;
      if (val && val.trim() === '') {
        return;
      }
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.chatuserlist = this.chatuserlist.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }


    createChat() {
      const actionSheet = this.actionSheetCtrl.create({
        // title: 'Modify your album',
        buttons: [
          {
            text: 'New Chat',
            handler: () => {
              console.log('Destructive clicked');
              this.getFriendlist();
              // this.permission()
            }
          },{
            text: 'Create Group',
            handler: () => {
              console.log('Archive clicked');
              this.createGroupChat();
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


    getFriendlist() {
      this.navCtrl.push(FriendlistPage);
    }

    createGroupChat() {
      this.navCtrl.push(CreategroupchatPage);
    }


    goGroupChat(groupChat) {
      console.log(groupChat);
      
      this.navCtrl.push(GroupchatPage,{'groupChat':groupChat});
    }


    deleteGroup(groupChat) {
      this.remove_group_alart(groupChat)
    }


    remove_group_alart(groupChat) {
      
        let alert = this.alertController.create({
          title: 'Confirm Remove Group',
          message: 'Do you want to delete this group?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                //console.log('Cancel clicked');
              }
            },
            {
              text: 'Delete',
              handler: () => {
                //console.log('Delete clicked');
                this.remove_group(groupChat);
              }
            }
          ]
        });
        alert.present();
    }


    remove_group(groupChat) {
      console.log(groupChat);

      this.webservice.presentLoading();
      this.webservice.deleteGroup('groupchat/deleteGroupById',groupChat.groupId._id).then((response:any) => {
        console.log("response=",response);
        if(response.success == true) {
          this.getGroupChatList();
          this.webservice.hideLoader();
          this.webservice.presentToast("Successfully delete group");
        } else {
          this.webservice.hideLoader();
          this.webservice.presentToast("This group didn't delete");
        }
      })
    }

 
    /* Fetch Data for Search by name */
    onFocus() { 
      this.searchFlag = true;
      if (this.searchTerm === '' || this.searchTerm === null) {
        this.chat_search = this.temp_chat_search;
      } else {
        this.chat_search = this.temp_chat_search.filter(e => (e.name != null && e.name != '' && e.name.toUpperCase().startsWith(this.searchTerm.toUpperCase())));
      }
    }
   
    onBlur() {
      this.searchFlag = false;
       this.chat_search = this.temp_chat_search ; 
       this.searchTerm = '';
    }















    // deleteUserChat(chat) {
    //   this.remove_user_alart(chat)
    // }


    deleteUserChat(chat) {
      console.log(chat);
      
      
        let alert = this.alertController.create({
          title: 'Confirm Remove User',
          message: 'Do you want to delete this user?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                //console.log('Cancel clicked');
              }
            },
            {
              text: 'Delete',
              handler: () => {
                //console.log('Delete clicked');
                // this.deleteChatUser(chat);
                let headers = new HttpHeaders();   
                headers = headers.set('Authorization', this.token) ;
            
               this.webservice.delApi(this.webservice.chat_apiUrl + 'singleChat/deleteChatThread/'+ chat.complete_chat_id,headers).then((response:any) => {
                console.log("delete chat user....",response);
                if(response.success == true) {
                  this.webservice.presentToast("Successfully delete user");
                  this.getChatlist();
                } else {
                  this.webservice.hideLoader();
                  this.webservice.presentToast("This user didn't delete");
                }
              });
              }
            }
          ]
        });
        alert.present();
    }

    // deleteChatUser(chat) {
   
    //   console.log("edit chat id is ",chat.id)
    //   let headers = new HttpHeaders();   
    //     headers = headers.set('Authorization', this.token) ;
    
    //    this.webservice.delApi(this.webservice.chat_apiUrl + 'singleChat/deleteChatThread/'+ chat.userId,headers).then((response:any) => {
    //     console.log("delete chat user....",response);
    //   });
    
    // }

    // remove_user(chat) {
    //   console.log("delete chat user=",chat);
    //   let headers = new HttpHeaders();   
    //   headers = headers.set('Authorization', this.token) ;

    //   this.webservice.presentLoading();
    //   this.webservice.delChatUserApi(this.webservice.chat_apiUrl + 'singleChat/deleteChatThread/'+ chat.userId,headers).then((response:any) => {
    //     console.log("response=",response);
    //     // if(response.success == true) {
    //     //   this.getChatlist();
    //     //   this.webservice.hideLoader();
    //     //   this.webservice.presentToast("Successfully delete user");
    //     // } else {
    //     //   this.webservice.hideLoader();
    //     //   this.webservice.presentToast("This user didn't delete");
    //     // }
    //   })
    // }

}
