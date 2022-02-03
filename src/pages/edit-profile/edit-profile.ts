import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountrymodalPage } from '../countrymodal/countrymodal';
import { LanguagemodalPage } from '../languagemodal/languagemodal';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ProfilePage } from '../profile/profile';
import { EditservicepagemodalPage } from '../editservicepagemodal/editservicepagemodal';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  profileDetails:any;
  public token = localStorage.getItem('access-token-illTip');

  profilePicture:any;
  base64Data:any;
  converted_image:any;
  ProfilePicture:any;

  changeprofileData: FormGroup;
  Service:any;
  tiptag:any;
  Country:any;
  language:any;
  isNotify:any;
  isFriend:any;
  gender:any;
  About:any;
  public userid=localStorage.getItem("loginuserId");
  hideimage:any;
  categoryList:any;
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long');
  uploadImage:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private _formBuilder: FormBuilder,
    private modalControler:ModalController,
    private events: Events,
    private camera: Camera,
    private alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');

    // this.events.subscribe('service', service => {
    //   console.log("service=",service);
    //   this.Service = service
    // })

    this.events.subscribe('country', country => {
      console.log("country=",country);
      this.Country = country
    })

    this.events.subscribe('language', language => {
      console.log("language=",language);
      this.language = language
    })
  }

  ngOnInit(): any {
    this.changeprofileData = this._formBuilder.group({
      full_Name: ['', Validators.compose([Validators.required, Validators.pattern (/^[^-\s][a-zA-Z\s]*$/)])],
      phoneno: ['',Validators.required],
      address:[],
      skill: ['',Validators.required],
      country:['',Validators.required],
      language:['',Validators.required],
      isVolunteer:[],
      isNotify:[],
      about:[],
      services:[],
      tiptag:[]
    });
    this.getprofiledetails();
    this.getCategoryList()
  }

  validation_messages = {
    'full_Name': [      
      { type: 'required', message: 'Enter your full name.' }, 
      { type: 'pattern', message: 'Special characters are not allowed.' }          
    ],
    'phoneno': [      
      { type: 'required', message: 'Enter your phone number.' }, 
    ],
    'skill': [      
      { type: 'required', message: 'Enter your skill.' }, 
    ],
    'country': [      
      { type: 'required', message: 'Enter your country.' },          
    ],
  }


    //// GET CATEGORY LIST ///
 getCategoryList(){
  // var arrayId={}
  //this._utilityService.showLoading();
  // this.webservice.getcategoryList(this.token,this.lat,this.long).subscribe((response) => {
  this.webservice.getData('services/categorylist10/'+'?lat='+this.lat+'&long='+this.long+'&token='+ this.token).then((res:any) => {
    console.log("response category list", res);
    if(res.success){ 
      console.log("response category list", res); 
      this.categoryList = res.data
      // for(var i = 0;i<this.categoryList.length;i++){
      //  this.services=this.categoryList[i]._id
      //  console.log("profile details",this.services);
      // }
   }  
},(error) => {
   console.log("error ts: ", error);
})
}


  getprofiledetails() {
    
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token,).then((res:any) => {
      console.log("Service data..=",res);
      this.profileDetails = res.data;
      this.tiptag = this.profileDetails.tiptag;
      // this.language = this.profileDetails.language;
      this.isNotify = this.profileDetails.isNotify;

      this.isFriend = this.profileDetails.isFriend;
      this.ProfilePicture = this.profileDetails.profilePicture
 

      if(this.profileDetails.gender == null){
        this.gender = "male"
      }else{
        this.gender = this.profileDetails.gender
      }

      if(this.profileDetails.about == null){
        this.About = ""
      }else{
        this.About = this.profileDetails.about
      }

      if(this.profileDetails.country == null && this.profileDetails.language == null && this.profileDetails.tiptag == null){
        this.changeprofileData.setValue({
          full_Name : this.profileDetails.fullName,
          // services : this.Service,
          phoneno: this.profileDetails.phoneno,
          skill:this.profileDetails.skill,
          address:this.profileDetails.address,
          country:"select country",
          language:"select language",
          isVolunteer:this.profileDetails.isVolunteer,
          isNotify:this.profileDetails.isNotify,
          about:this.About,
          services:this.profileDetails.services,
          tiptag:""
        });
      }else{
        this.changeprofileData.setValue({
          full_Name : this.profileDetails.fullName,
          // services : this.Service,
          phoneno: this.profileDetails.phoneno,
          skill:this.profileDetails.skill,
          address:this.profileDetails.address,
          country:this.profileDetails.country,
          language:this.profileDetails.language,
          isVolunteer:this.profileDetails.isVolunteer,
          isNotify:this.profileDetails.isNotify,
          about:this.About,
          services:this.profileDetails.services,
          tiptag:this.profileDetails.tiptag
        });
      }
      



      this.profilePicture = this.profileDetails.profilePicture;
      

      if(this.profilePicture != null) {
        var Purl = this.profilePicture
        var extension = this.profilePicture.split('.').pop();
        console.log("Extension =>"+extension);
        if(extension== 'jpg' || extension== 'png' || extension== 'JPEG'){
          console.log('ok')
          this.converted_image=this.profilePicture
          this.uploadImage = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
         console.log("this.uploadImage=",this.uploadImage);
        }else{
         console.log('no')
         this.converted_image = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
         this.base64Data = this.converted_image;
         this.converted_image = "data:image/jpeg;base64,"+this.base64Data;
         this.uploadImage = Purl.substring(Purl.lastIndexOf('http://18.224.123.52:6018/uploads/users/')+40);
         console.log("this.uploadImage=",this.uploadImage);
         
        }
      } else {
        console.log("profile pictur null");
      }

      
  
      console.log('convert',this.converted_image);

    }, (err) => {
      console.log(err); 
    });
  }







  /////////////UPLOAD PROFILE PHOTO////////////////
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


  openCamera() {
    console.log("Open Camera");

  this.hideimage = false;
    
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

    this.ProfilePicture = imageData;

    this.base64Data=this.ProfilePicture;
    this.converted_image= "data:image/jpeg;base64,"+this.base64Data;

    console.log("this.converted_image=",this.converted_image);
    
    console.log("own img=",this.ProfilePicture)

    this.uploadImage = this.ProfilePicture

    }, (err) => {
     // Handle error
     console.log("error in image uplode=",err);
    });
  }


  openGalery() {
    console.log("Open Galery");

  this.hideimage = false;

    const option: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    console.log("img=",option);
    this.camera.getPicture(option).then((photo) => {
      this.ProfilePicture = photo;

      this.base64Data=this.ProfilePicture;
      this.converted_image= "data:image/jpeg;base64,"+this.base64Data;

      console.log("this.converted_image=",this.converted_image);
      
      console.log("own img=",this.ProfilePicture);

    this.uploadImage = this.ProfilePicture

      
    }, (err) => {
      console.log("error in image uplode=",err);
    })
  }

  // openServiceMordal() {
  //   const modal = this.modalControler.create(ServicepagemodalPage);
  //   modal.present();
  // }

  openCountryMordal() {
    const modal = this.modalControler.create(CountrymodalPage);
    modal.present();
  }

  openLanguageMordal() {
    const modal = this.modalControler.create(LanguagemodalPage);
    modal.present();
  }

  doChangeprofiledata() {
    console.log(this.changeprofileData.value);
    let frm_data_value = this.changeprofileData.value;
    let data={
      fullName:frm_data_value.full_Name,
      id:this.profileDetails._id,
      contact:frm_data_value.phoneno,
      tiptag:frm_data_value.tiptag,
      skill:frm_data_value.skill,
      address:frm_data_value.address,
      about:frm_data_value.about,
      notify:this.isNotify,
      volunteer:frm_data_value.isVolunteer,
      isFriend:this.profileDetails.isFriend,
      gender:this.gender,
      country:frm_data_value.country,
      language:frm_data_value.language,
      ProfilePicture:this.uploadImage,
      services:frm_data_value.services,
      // "identityImage":this.changeprofileData.upimage,
    }
    console.log("change profile data=",data);

    this.webservice.postData('users/edituser/'+'?token='+ this.token,data).then((res:any) => {
      console.log("update data res=", res);
      if(res.success == true){
        this.navCtrl.setRoot(ProfilePage);
      }else{
        console.log(res.message);
      }
    },(err) => {
      console.log(err); 
    })
    
  }

  doNotify() {
    this.isNotify = "false"
    console.log(this.isNotify);
  }

  doNotify2() {
    this.isNotify = "true"
    console.log(this.isNotify);
  }

  openServiceMordal() {
    const modal = this.modalControler.create(EditservicepagemodalPage,{'skill':this.categoryList});
    modal.onDidDismiss(data => {
      console.log('choose service',data);


      if(this.profileDetails.country == null && this.profileDetails.language == null && this.profileDetails.tiptag == null){
        this.changeprofileData.setValue({
          full_Name : this.profileDetails.fullName,
          // services : this.Service,
          phoneno: this.profileDetails.phoneno,
          skill:this.profileDetails.skill,
          country:"select country",
          language:"select language",
          isVolunteer:this.profileDetails.isVolunteer,
          isNotify:this.profileDetails.isNotify,
          about:this.About,
          services:data,
          tiptag:""
        });
      }else{
        this.changeprofileData.setValue({
          full_Name : this.profileDetails.fullName,
          // services : this.Service,
          phoneno: this.profileDetails.phoneno,
          skill:this.profileDetails.skill,
          country:this.profileDetails.country,
          language:this.profileDetails.language,
          isVolunteer:this.profileDetails.isVolunteer,
          isNotify:this.profileDetails.isNotify,
          about:this.About,
          services:data,
          tiptag:this.profileDetails.tiptag
        });
      }
      
      
    });
    modal.present();

  } 


}
