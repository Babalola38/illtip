import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Registration2Page } from '../registration2/registration2';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the Registration1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration1',
  templateUrl: 'registration1.html',
})
export class Registration1Page {

  registrationDetails:FormGroup

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration1Page');
  }

  ngOnInit(): any {
    this.registrationDetails = this._formBuilder.group({

      email: ['',Validators.compose([Validators.pattern (/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/), Validators.required ])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  validation_messages = {
    'email': [    
      { type: 'required', message: 'Enter your email address.'},
      { type: 'pattern', message: 'Email format should be as user@abc.com' }     
    ],   
    'password': [      
      { type: 'required', message: 'Enter your password.' }
    ]   
  
  };

  goRegistration() {
    console.log( this.registrationDetails.value);
    this.navCtrl.push(Registration2Page,{email:this.registrationDetails.value.email,password:this.registrationDetails.value.password,tabsHideOnSubPages: true});
  }

  // goRegistration(email,password) {
  //   this.navCtrl.setRoot(Registration2Page,{email:email,password:password});
  // }

  goLoginPage() {
    this.navCtrl.push(LoginPage,{ tabsHideOnSubPages: true })
  }

}
