import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Contact } from '@ionic-native/contacts';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the CreategroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-creategroup',
  templateUrl: 'creategroup.html',
})
export class CreategroupPage {

  groupUser:any =[];
  GroupUsersId = this.navParams.get('GroupUserId');
  public userid=localStorage.getItem("loginuserId");
  // groupUser = this.navParams.get('groupUser');
  // urls='http://18.191.93.75:6018/uploads/users/'
  urls:any;

  base64Data:any;
  converted_image:any;
  GroupPicture:any;
  uploadImage:any;

  hideimage:boolean = false;

  groupName:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    private alerCtrl: AlertController,
    private camera: Camera,
    public alertController: AlertController) {
  }

  ionViewDidLoad() {
    this.urls = this.webservice.apiUrl+'uploads/users/' 
    console.log('ionViewDidLoad CreategroupPage');
    this.groupUser = this.navParams.get('groupUser');
    console.log(this.groupUser);
  }



  UploadProfilePic() {
    const alert = this.alerCtrl.create({
      title: 'Select option!',
      // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Galery',
          handler: data => {
            console.log('Galery clicked');
            this.openGalery();
          }
        },
        {
          text: 'Camera',
          handler: data => {
            console.log('Camera clicked');
            this.openCamera();
          }
        }
      ]
    });
    alert.present();
  }
  
  
  openGalery() {
    console.log("Open Galery");
  
  
    const option: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    console.log("img=",option);
    this.camera.getPicture(option).then((photo) => {
      this.hideimage = true;

      this.GroupPicture = photo;
  
      this.base64Data=this.GroupPicture;
      this.converted_image= "data:image/jpeg;base64,"+this.base64Data;
  
      console.log("this.converted_image=",this.converted_image);
      
    //   console.log("own img=",this.GroupPicture);
  
    // this.uploadImage = this.GroupPicture
  
      
    }, (err) => {
      console.log("error in image uplode=",err);
    })
  }
  
  
  openCamera() {
    console.log("Open Camera");
  
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
  
    //  this.converted_image = 'data:image/jpeg;base64,' + imageData;
    //  console.log("this.converted_image=",this.converted_image);
    this.hideimage = true;
  
    this.GroupPicture = imageData;
  
    this.base64Data=this.GroupPicture;
    this.converted_image= "data:image/jpeg;base64,"+this.base64Data;
  
    console.log("this.converted_image=",this.converted_image);
    
    // console.log("own img=",this.GroupPicture)
  
    // this.uploadImage = this.GroupPicture
  
    }, (err) => {
     // Handle error
     console.log("error in image uplode=",err);
    });
  }

  alart() {
    const alert =  this.alertController.create({
      message: 'Please add group image and group name',
      buttons: ['Cancel']
    });
  
   alert.present();
  }


  AddGroup() {
    // console.log(this.groupName);
    // console.log("this.converted_image=",this.converted_image);
    // console.log("this.GroupUsersId=",this.GroupUsersId);

    if(this.groupName == undefined) {
      this.alart();
    } else {
      if(this.converted_image == undefined) {
        this.converted_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACqCAMAAAAKqCSwAAAAP1BMVEX///+rq6uqqqr5+fn8/Py3t7f09PSurq68vLzg4ODa2tqysrLf39/AwMDy8vLQ0NDKysro6Ojr6+vU1NTMzMyk0bFSAAAIB0lEQVR4nO1bi5KrKBCNgKLgA9T//9alHygYk0nm7l6tWk5NTQwKOYEGuk+Tx6OgoKCgoKCgoKCgoKCgoKCgoKCgoKDgU0i/TBmMV1dzOsforMhR2am5mtUZmkFUz3Dyal4nMCdEq0p3V/N6hmzPOrUS7n7m2unTXq3sfDWzCDn7DnFqqWitdN+P13av8oOteLa/BN3XtfNXMl3sO45Hxra/jmqvPyaKZO1l/drUXzENXIerVtkXk/6N7V62HJgzPkLbOsCe2sZlG8JywqZeu7mRspl7Z+9MVeh1Xz3V7J569jZURd1ly7w0VtyTqqhpLZJjAE511R+43oUqrZqNGazWdjBItte3pLrA6M9DJchsHXjVyon7URX1CEwTV3DAAns/qtUUSmTmX63q2K33oIosfGaauDdlwcE9qCKvKbde8KSy3fcmVGEWrTlVE4p8ul7dhOr4iurtelXDqppHrUisv58BYBfO6WiLFmxiut8KgFG0WpICDeTz5esmVHFflWv0poTG3SvfWe9BlaMRudQYBlS1AaZje8ONNfDAbnyMxjm39rAgPKSrqjtSDVwpylMBeNGs+qZUqxAEpPfnQ5/eiWoIrUyMWNQcrPbOVMN0ckvnfb+AQnQfqueKqqh0wAnPire0K+CPUd5PEHb8udX/BPKlUPkK62XC5fydaCWGC5MYfqjEx9DuquFHNMa1H8L1VydbVPMZ5P3SFwUFBQUFBX8LsjPGUBJC9uGSXWI1Q/lTEroxUKoeCu4aOrHS9Hg9J+2ZNKvReCyZOXKkmoyvEnFNDa4QyCMg7gjhiDTlqW3t8sY8OE6DBAcWUIOv15PPZfgJPNay51jHqcamtB2Qv2xTH2z6kipo5sAInFKxQpkLjcMfJKFN2rG+IsWCfW0ISxSLgkRVkXIlJq7loSe4KQ1N0RmN31MlXzhSlSiVa1uDCil0mjA/UK2W0ECbUuXEMfV3jHR0TU2BiExUMeUZsHxPFbMmkSqqT9Y0cnZ6/9RnqmFgh1BLh2+1UYW6NvCjL0j5gcHLxg9Ca7swVesl4St/MVK1XaSqgAZZLzJK4+SUqh4w2RKiWQuPUQXgNoV/dOgGpE1KyDzmqfeQjiOqv8prR6qiHZkqlMSIE6JqNN8zqpMV4Wu4MM9cpAoZIe0hK7BlMjazJSBV3Q6I9atwAalaGEHniSp8nGipka7KTyVlVE1YBqYxzJtlilTDRaja1GTGpA7DjcUhFplPq/qraBH7cFhCP2hnv6PaTeG610L7SBUbm5hxs1NVvEKFsj+l6pqojwWqIxoYUe2R6v50TjUMtEWDjVRh5PXadWtFJg4CkliYKgnxZADD1stfU1VRyQ1UeY7i3TWO4ClVHGiozVQ5IUhnRGAwgDoKx9Mw1AnV32kvRFU+OtJ6YA7hsEHeVHVgw+l0zakyNfNgqnmaNdTDiYBirJLLv0aV8xBAdcRFoZ0WPOkhUk0np/rAOnqOVJdqM0PeH1CX08O0rINODcAtBPOa2GuqfNQTVybsYfrAsBKlPXCgCpsRzECiivuWdWuA45GXruKm4EVPhxVAtN/sAeiuYB5ihiuaQ37Q3JZds0mauiuBKlZeVbBVcFfQb6E5iE4JTKyY3ICmnFdHd+U7qqDv0Crdg4pDu7L0ywCSjpnztmZ4JCzccg2vYeYt4SUQMuGlV/Cm5a0NSloc3tGsWImbkpme9N1BUrXlHtLLw5unp59fVFZDHd/kLWz4hmlBQUFBwf8UYw8n+SlOC5c9+3tN13c97NjKQ2nHHrAMz2IxPNvlHjw9GX8g1HQbPD2HVXbPB98y+k+CwuBwAjDOM1X0W+DAMsgJCv1B8DtYKxk1BRlYrcoP1LOqwp/a71ku3aLoAR6NWA4fzPjEE6BzPRTijBio4keBiyeSw3PRZR1ZFiCXOqMaVZUlUk1Sg6gJ4P2UavLAJ1TBF44hiZo2jQQDQagfRRQK5d9RjapK2+xUtbVWVzFkOaFqGR8kZJFJHc/NwOkzkEu4L3suAq2Ew6s3VElV2fQNDB+HpmkMVjmnqvuYlPu5U+G4ZG0sh0/bsIO8gkYBoyoc/CMbfk1V5arKHun6OEBnVD8/M6CwaQxUUJEzbAFowVAyQkTaYdf691RJVQldy9aOVG0In6GFejuaeTCAlkLs9eegEIQfbR5LNDGcWKH/TJXoOPUI0RCpOa+pUhubqkK2yiEVnSE/oxojmZ8XK0OnITAk7mNzdsbxhxFHiwiDt8RDyy+pNi2pKqtgXSalqiGy+TOqNKk639dxOuGxTjPaZFJVzntUicw7qqiqTN5HVWU3AIypwQL+yACyM8j7xBqWap9U+9oH3fyK6vMqSSsANAmNsIz162l1OB2PEysuOTyp0gdgYuVUDS816qiqjKnWBb/U2SSbKVb5jioyEVELoYm16cJ4mlZv5lRRz+RUNa3fYXQPqophqrUxZrJV0quxCktILiZaftgCcGkia6mjifHZr21SsWQ3MMWcKo+39ayqbE+G2rSxxm9p5+wgrohqV/QB7Ps9AFUOnnvkqbAiDs3j0WkdCyn1E2wzc1e2z/FdtbkcTUveTeKucJJmSgqQavrAe6pzW9c1//h4hGvUpqSDvAcePTJwxfIXXk+qaemmmuodrV/ghVWVhfImfr/tlnlrYquStVD/8Os8lSY49mwHFsvjA7E03lQygXp6UqUPZE1sZdnbqw8QFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/DX8AwPBZjzDX2+vAAAAAElFTkSuQmCC"
      } else {
        let data = {
          'groupAdminId':this.userid,
          'groupname':this.groupName,
          'groupCover':this.converted_image,
          'groupUser':this.GroupUsersId
      }
      console.log("create group data=",data);
      
      this.webservice.CreateGroup('groupchat/createGroupchat',data).then((response:any) => {
        console.log(response);
        if(response.success = true) {
          this.navCtrl.setRoot(ContactPage);
        } else {
          console.log("add again");
          
        }
      })
      }
    }


  }

}
