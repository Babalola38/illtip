import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { LoginPage } from '../login/login';

/**
 * Generated class for the TokenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-token',
  templateUrl: 'token.html',
})
export class TokenPage {

  public phoneno = this.navParams.get('phonenumber');

  email = this.navParams.get('email')
  password = this.navParams.get('password')

  VerifyDetails:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private alerCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenPage');
    console.log("phoneno=",this.phoneno);
    
  }
  dynamicArr:any=[
   1,2,3,4,5,6
  ]
  abc:any="";
  dataloops:any=[1,2,3,4]
  onInputEntry(event, id, nextInputIndex) {
    // let input = event.target;
    this.abc=this.abc+event.target.value
    let nexInput = +nextInputIndex + 1;
    let newID = id + nexInput;
    console.log(this.abc.length);
    // if(this.abc.length!=6){
    //   document.getElementById(newID).focus();
    // }
    if(this.abc.length!=6){
      document.getElementById(newID).focus(); 
    }
  }


  verify() {
    console.log("phoneno=",this.phoneno);
    console.log("abc=",this.abc)

    if(this.abc == null) {
      this.doNotpAlart();
    }else{
      this.VerifyDetails = {
        phoneno:this.phoneno,
        verification_code:this.abc
      }
      this.webservice.presentLoading();
      this.webservice.postData('users/verify-account', this.VerifyDetails).then((res:any) => {
        this.webservice.hideLoader();
        
        console.log("VerifyDetails res data..=",res);
  
        if(res.success == true) {
          this.doSuccessAlert(res);
          this.navCtrl.setRoot(LoginPage,{email:this.email,password:this.password});
        }else {
          this.navCtrl.setRoot(TokenPage);
          this.doAlert(res);
        }
      }, (err) => {
        console.log(err); 
      });
    }

    // this.VerifyDetails = {
    //   phoneno:this.phoneno,
    //   verification_code:this.abc
    // }

    // this.webservice.postData('users/verify-account', this.VerifyDetails).then((res:any) => {
    //   console.log("VerifyDetails res data..=",res);

    //   if(res.success == true) {
    //     this.doSuccessAlert(res);
    //     this.navCtrl.setRoot(LoginPage,{email:this.email,password:this.password});
    //   }else {
    //     this.navCtrl.setRoot(TokenPage);
    //     this.doAlert(res);
    //   }
    // }, (err) => {
    //   console.log(err); 
    // });

  }

  doNotpAlart() {
    const alert = this.alerCtrl.create({
      title: "Hi",
      message:"Please provide a valid OTP",
      buttons: ['Ok']
    });
    alert.present()
  }

  doSuccessAlert(res) {
    const alert = this.alerCtrl.create({
      title: "Hi",
      message: "‘i’llTip will help you profit from your data by turning your data into money",
      buttons: ['Ok']
    });
    alert.present()
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
