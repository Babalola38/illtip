import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events, ActionSheetController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { TokenPage } from '../token/token';

import { CameraOptions, Camera } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicepagemodalPage } from '../servicepagemodal/servicepagemodal';
import { CountrymodalPage } from '../countrymodal/countrymodal';
import { LanguagemodalPage } from '../languagemodal/languagemodal';
import { HomePage } from '../home/home';
import { FileUploadOptions,FileTransferObject,FileTransfer } from "@ionic-native/file-transfer2";
// import { ProfilepictureuploadPage } from '../profilepictureupload/profilepictureupload';








/**
 * Generated class for the Registration2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html',
  providers:[FileTransfer]
})
export class Registration2Page {

  SignUpDetails:any;

  imageData:any;

  base64Data:any;
  converted_image:any;

  hideimage:any = true;

  email = this.navParams.get('email');
  password = this.navParams.get('password');

  registrationDetails:FormGroup;

  geoLatitude:any;
  geoLongitude:any;
  public token = localStorage.getItem('access-token-illTip');
  // categoryList:any;
  // locations:any;
  // clusterStyles:any;
  // servicecount:any;
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long')
  servicelist:any;

  Country:any;

  Service:any;

  Language:any;

  serviceValue:any;

  win: any = window

  Image:any;

  

  // String locale = context.getResources().getConfiguration().locale.getCountry();


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private camera: Camera,
    private _formBuilder: FormBuilder,
    private alerCtrl: AlertController,
    private modalControler:ModalController,
    private events: Events,
    private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController) {
  }

  doSkeep() {
    this.navCtrl.setRoot(HomePage);
  }


  openServiceMordal() {
    const modal = this.modalControler.create(ServicepagemodalPage);
    modal.present();
  }

  openCountryMordal() {
    const modal = this.modalControler.create(CountrymodalPage);
    modal.present();
  }

  openLanguageMordal() {
    const modal = this.modalControler.create(LanguagemodalPage);
    modal.present();
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration2Page');
    // this.getGeolocation();
    // this.getCategoryList(this.lat,this.long);

    // fetch('../assets/country/countrycode.json').then(res => res.json()).then(json => {
    //   console.log("country list=",json);
    //   this.country = json
    // });


    this.events.subscribe('service', service => {
      console.log("service=",service);
      this.Service = service.name;
      this.serviceValue = service.value
    })

    this.events.subscribe('country', country => {
      console.log("country=",country);
      this.Country = country
    })

    this.events.subscribe('language', language => {
      console.log("language=",language);
      this.Language = language
    })

  }

  // getCategoryList(lat,long) {

  //   this.webservice.getData('services/categorylist10/'+'?lat='+lat+'&long='+long,).then((res:any) => {
  //     console.log("Service data..=",res);
  //     this.servicelist = res.data;
  //     console.log("this.servicelist=",this.servicelist);
  //   }, (err) => {
  //     console.log(err); 
  //   });
  // }



  


  /////////////UPLOAD PROFILE PHOTO////////////////
  // UploadProfilePic() {
  //   const alert = this.alerCtrl.create({
  //     cssClass: 'photo-video-alert',
  //     title: 'Select option!',
  //     // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
  //     buttons: [
  //       {
  //         text: '',
  //         cssClass: 'camera-btn button',
  //         handler: data => {
  //           console.log('Galery clicked');
  //           this.openGalery();
  //         }
  //       },
  //       {
  //         text: '',
  //         cssClass: 'photo-btn button',
  //         handler: data => {
  //           console.log('Camera clicked');
  //           this.openCamera();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  UploadProfilePic() {
    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Destructive clicked');
            this.openCamera();
            // this.permission()
          }
        },
        // {
        //   text: 'Video',
        //   handler: () => {
        //     console.log('Archive clicked');
        //   }
        // },
        {
          text: 'Gallery',
          handler: () => {
            console.log('Archive clicked');
            this.openGalery();
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

  // UploadProfilePic() {
  //   const modal = this.modalControler.create(ProfilepictureuploadPage); 
  // }


  // OpenCamera() {
  //   console.log("Open Camera");

  // this.hideimage = false;
    
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
    
  //   this.camera.getPicture(options).then((imageData) => {
  //    // imageData is either a base64 encoded string or a file URI
  //    // If it's base64 (DATA_URL):

  //   //  this.converted_image = 'data:image/jpeg;base64,' + imageData;
  //   //  console.log("this.converted_image=",this.converted_image);

  //   this.ProfilePicture = imageData;

  //   this.base64Data=this.ProfilePicture;
  //   this.converted_image= "data:image/jpeg;base64,"+this.base64Data;

  //   console.log("this.converted_image=",this.converted_image);
    
  //   console.log("own img=",this.ProfilePicture)

  //   }, (err) => {
  //    // Handle error
  //    console.log("error in image uplode=",err);
  //   });
  // }

  openCamera() {
     console.log("Open Camera");
   this.hideimage = false;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      allowEdit : true,
      correctOrientation:true
    }

  this.camera.getPicture(options).then((imageData) => {
    console.log('imageData',imageData);
    this.imageData = imageData;


    this.Image = this.win.Ionic.WebView.convertFileSrc(imageData);
    console.log("Image=",this.Image);


    // this.base64.encodeFile(imageData).then((base64File: string) => {
    //   this.base64Image =base64File;
    // }

  }, (err) => {
    // Handle error
    console.log("error in image uplode=",err);
   }) 
  }

  // OpenGalery() {
  //   console.log("Open Galery");

  // this.hideimage = false;

  //   const option: CameraOptions = {
  //     quality:100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum:false
  //   }
  //   console.log("img=",option);
  //   this.camera.getPicture(option).then((photo) => {
  //     this.ProfilePicture = photo;

  //     this.base64Data=this.ProfilePicture;
  //     this.converted_image= "data:image/jpeg;base64,"+this.base64Data;

  //     console.log("this.converted_image=",this.converted_image);
      
  //     console.log("own img=",this.ProfilePicture);
      
  //   }, (err) => {
  //     console.log("error in image uplode=",err);
  //   })
  // }

  openGalery() { 
  console.log("Open Galery");
  this.hideimage = false;

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    allowEdit : true,
    correctOrientation:true

  }

  this.camera.getPicture(options).then((imageData) => {
    console.log('imageData',imageData);
    this.imageData = imageData;


    this.Image = this.win.Ionic.WebView.convertFileSrc(imageData);
    console.log("Image=",this.Image);


    // this.base64.encodeFile(imageData).then((base64File: string) => {
    //   this.base64Image =base64File;
    // }

  }, (err) => {
    // Handle error
    console.log("error in image uplode=",err);
   }) 

  }


  
  ngOnInit(): any {
    this.registrationDetails = this._formBuilder.group({
      fullname: ['', Validators.compose([Validators.required, , Validators.pattern (/^[^-\s][a-zA-Z\s]*$/)])],
      // isd: ['',Validators.required,],
      number: ['',Validators.required,],
      tiptag: ['',Validators.required,],
      language: ['',Validators.required,],
      country:['',Validators.required,],
      services:['',Validators.required,]
    });
  }

  validation_messages = {
    'fullname': [      
      { type: 'required', message: 'Enter your full name.' }, 
      { type: 'pattern', message: 'Special characters are not allowed.' }          
    ], 
    // 'isd': [      
    //   { type: 'required', message: 'Enter your ISD code.' },      
    // ],  
    'number': [      
      { type: 'required', message: 'Enter your phone number.' },       
    ],  
    'tiptag': [      
      { type: 'required', message: 'Enter your tiptag.' },          
    ], 
    'language': [      
      { type: 'required', message: 'Enter your language.' },          
    ],  
    'country': [      
      { type: 'required', message: 'Enter your country.' },          
    ],
    'services': [      
      { type: 'required', message: 'Enter your service.' },          
    ],
  };



  doRegistration() {
    console.log( this.registrationDetails.value);

    this.SignUpDetails = {
      deviceId:"",
      email:this.email,
      password:this.password,
      fullName:this.registrationDetails.value.fullname,
      // phoneno:this.registrationDetails.value.isd + this.registrationDetails.value.number,
      phoneno:this.registrationDetails.value.number,
      services:this.serviceValue,
      tiptag:this.registrationDetails.value.tiptag,
      country:this.registrationDetails.value.country,
      language:this.registrationDetails.value.language,
      // ProfilePicture:this.ProfilePicture
    }

    let  options : FileUploadOptions = {
      fileKey: 'image',
      fileName : 'jpg',
      mimeType : "multipart/form-data",
      httpMethod : "POST",
      chunkedMode: false,
      params:this.SignUpDetails
    };
    console.log(options);
    const fileTransfer: FileTransferObject = this.transfer.create();

    console.log(" this.SignUpDetails=", this.SignUpDetails);
    this.webservice.presentLoading();
    // this.webservice.postData('users/createuser', this.SignUpDetails).then((res:any) => {
      fileTransfer.upload(this.imageData, this.webservice.apiUrl + 'users/createuser', options).then((res:any)=>{ 
      this.webservice.hideLoader();
      console.log("SignUp res data..=",res)
      if(res.success == false) {
        console.log(res.message);
        this.doAlert(res)
      } else {
        this.navCtrl.setRoot(TokenPage,{phonenumber:this.SignUpDetails.phoneno,email:this.email,password:this.password});
      }
    }, (err) => {
      console.log(err); 
    });
  }


  doAlert(res) {
    const alert = this.alerCtrl.create({
      title: "I'm sorry",
      message: res.message,
      buttons: ['Ok']
    });
    alert.present()
  }
  

}
