import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Contacts } from "@ionic-native/contacts";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SMS } from '@ionic-native/sms';
import { WebserviceProvider } from '../../providers/webservice/webservice';


/**
 * Generated class for the ShareAndEarnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-share-and-earn',
  templateUrl: 'share-and-earn.html',
  providers:[Contacts,SMS,AndroidPermissions]
})
export class ShareAndEarnPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  contact = {
    displayName:null, 
    phoneNumbers:null, 
    birthday:null
 };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    private contacts: Contacts,
    private androidPermissions: AndroidPermissions,
    private sms: SMS,
    private webservice:WebserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareAndEarnPage');
  }

  shareANdroid(){
    var message="https://play.google.com/store/apps/details?id=com.org.illtip.android"
    this.getcontact(message)
  }

  shareios(){
    var message="https://itunes.apple.com/us/app/illtip-social-media-freelance/id1451821058?ls=1&mt=8"
    this.getcontact(message)
  }


  getcontact(message){
    this.contacts.pickContact().then((contact)=>{
      this.contact.displayName = contact.displayName; 
      this.contact.phoneNumbers = contact.phoneNumbers[0].value; 
      console.log("contacts:-->"+ this.contact.phoneNumbers);
      this.sendsms(this.contact.phoneNumbers,this.contact.displayName,message)
   });
  }


  // getcontact(message){

  //   var options = {
  //     replaceLineBreaks: false, // true to replace \n by a new line, false by default
  //     android: {
  //         intent: '' 
  //         //intent: '' // send SMS without opening any other app
  //     }
  //   }
  //   this.contacts.pickContact().then((contact)=>{
  //     this.contact.displayName = contact.displayName; 
  //     this.contact.phoneNumbers = contact.phoneNumbers[0].value; 
  //     console.log("contacts:-->"+ this.contact.phoneNumbers);
  //     // this.sendsms(this.contact.phoneNumbers,this.contact.displayName,message)
  //     this.sms.send(this.contact.phoneNumbers,message,options).then((res)=>{
  //       console.log('send',res)
  //       this.getpointForsahrelink(this.contact.phoneNumbers,this.contact.displayName)
        
        
  //     }).catch((error)=>{
  //       console.log("The Message is Failed",error);
  //     })
  //  });
  // }

  



  sendsms(phoneNumbers,displayName,message){
    console.log("comeing=",phoneNumbers,displayName,message);
    
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
      result => {
        console.log('Has permission?',result.hasPermission);
    
        if(result.hasPermission){
          var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' 
                //intent: '' // send SMS without opening any other app
            }
        };
          this.sms.send(phoneNumbers,message,options).then((res)=>{
            console.log('send',res)
            this.getpointForsahrelink(phoneNumbers,displayName)
            
            
          }).catch((error)=>{
            console.log("The Message is Failed",error);
          })
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
    ); 
  }


  getpointForsahrelink = (phoneNumbers,displayName) => {
    this.webservice.getData('users/getLinkSharePoint/'+'?mobileNo='+phoneNumbers+'&token='+ this.token).then((response:any)=>{
      console.log('share point',response)
      if(response.success){
        this.webservice.presentToast('Share link with' + ' ' + displayName +' ' +'successfully & earn 10 tips' )
      }else{
        this.webservice.presentToast(response.message)
      }
    })
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      //header: 'Albums',
      buttons: [{
        text: 'Share Google Play link',
        handler: () => {
          console.log('Delete clicked');
          this.shareANdroid()
        }
      }, {
        text: 'Share App Store link',
        handler: () => {
          console.log('Share clicked');
          this.shareios()
        }
      }]
    });
    await actionSheet.present();
  }

}
