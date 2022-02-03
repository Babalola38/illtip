import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,  Events } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { Registration1Page } from '../registration1/registration1';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  EMAIL = this.navParams.get('email')
  PASSWORD = this.navParams.get('password')

  Email:any;
  Password:any;

  token:any;

  loginDetails:FormGroup

  openalart:any = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alerCtrl: AlertController,
    private webservice:WebserviceProvider,
    private _formBuilder: FormBuilder,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit(): any {
    this.loginDetails = this._formBuilder.group({

      email: ['',Validators.compose([Validators.pattern (/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/), Validators.required ])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  validation_messages = {
    'email': [    
      { type: 'required', message: 'Enter your email address.'},
      { type: 'pattern', message: 'Email format should be as user@abc.com.' }     
    ],   
    'password': [      
      { type: 'required', message: 'Enter your password.' }
    ]   
  
  };

  doLogin() {
    const alert = this.alerCtrl.create({
      title: '‘i’llTip will be collecting users data in an effort to help Users monetize their data',
      // subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: [
        {
          text: 'Ok',
          // handler: data => {
          //   this.dologin();
          // }
        },
      ]
    });
    alert.present();
  }

  dologin() {
    console.log( this.loginDetails.value);

    let data={
      'email':this.loginDetails.value.email,
      'password':this.loginDetails.value.password,
      'latitude':localStorage.getItem('search_lat'),
      'longitude':localStorage.getItem('search_long'),
      'device_token':localStorage.getItem('deviceToken')
    }
    console.log('login data',data);
    this.webservice.presentLoading();

    this.webservice.postData('users/login', data).then((res:any) => {
      console.log("login res data..=",res);
      this.webservice.hideLoader();

      if(res.success){
        ///SET USER DATA TO LOCAT STORAGE!
         localStorage.setItem('access-token-illTip', res.token);
         localStorage.setItem("loginuserId", res.data._id);
         localStorage.setItem("First_name", res.data.fullName);
         //localStorage.setItem("last_name", response.last_name);
         localStorage.setItem("email", res.data.email);
         localStorage.setItem("radius", res.radius);
         this.token = localStorage.getItem('access-token-illTip');

         localStorage.setItem('password', this.loginDetails.value.password);
          // this.getcallToken(res.data._id,res.data.fullName);
          // this.chatnewuser(res.data._id,res.data.fullName,res.token,res.data.email,res.data.profilePicture)

         this.events.publish('openalart',this.openalart);

        //  this.doLogin()

         this.navCtrl.setRoot(TabsPage);
         
    }else{
      console.log("Login message", res.message);
      this.doAlert(res);
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


  forgotPass(){
    let prompt = this.alerCtrl.create({
      title: '<img src="../../assets/imgs/logo2.png">',
      message: "Forgot your Password?",
      cssClass:"frgt-alert",
      inputs: [
        {
          name: 'title',
          type:'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
 
        {
          text: 'SUBMIT',
          handler: data => {

            console.log(data.title);

            if(!data.title || data.title==''){
               console.log("response pass", data.title)
              //  this._utilityService.displayToast("Please enter registered email");
            }else{

                 let emaildata = {
                     'email': data.title
                 } 

                 this.webservice.presentLoading();
                 this.webservice.postData('users/forgetpassword', emaildata).then((res:any) => {
                  this.webservice.hideLoader();
                  console.log("forgot password res data..=",res);
                  if(res.success == false) {
                    console.log(res. message);
                    this.doForgotAlert(res);
                  } else {
                    this.navCtrl.setRoot(LoginPage);
                  }
                }, (err) => {
                  console.log(err); 
                }); 
            }
          }
        }
      ]
    });
    prompt.present();
  }


  doForgotAlert(res) {
    const alert = this.alerCtrl.create({
      title: "I'm sorry",
      message: res.message,
      buttons: ['Ok']
    });
    alert.present()
  }

 


  doSignUp() {
    this.navCtrl.setRoot(Registration1Page);
  }

}
