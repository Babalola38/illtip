import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  password = localStorage.getItem('password');

  change: any = {};
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  pattern=/06([0-9]{8})/;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    private alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
    console.log("password=",this.password);
  }

  changepassword() {
    if(this.change.current_password != this.password){
      const alert = this.alerCtrl.create({
        title: "I'm sorry",
        message: "Your old password is wrong!",
        buttons: ['Ok']
      });
      alert.present()
    } else {
      this.ChangePassword();
    }
  }



  ChangePassword(){
    var pass = /^[a-zA-Z0-9\-_]{0,40}$/;

    // if(!this.change.current_password){
    // console.log("pass not ")
    // this.webservice.presentToast("Enter your current password");
    // }else 
    if(!this.change.new_password){
    console.log("pass not ")
    this.webservice.presentToast("Enter your new password");
    } else if(pass.test(this.change.new_password) == false){
    this.webservice.presentToast("Enter Valid password");
    }
    else if(this.change.new_password.length < 6){
    console.log("pass 6")
    this.webservice.presentToast("Password  minimum 6 characters");
    }else if(this.change.new_password != this.change.confirm_password){
    console.log("pass not match")
    this.webservice.presentToast("Password does not match the confirm password");
    }else{
    let data={
      "id":this.userid,
      "npass":this.change.new_password,
      "opass":this.change.confirm_password
    }
    console.log("change password",data,this.token)
    this.webservice.presentLoading();
    this.webservice.postData('users/changepassword/'+'?token='+ this.token,data).then((response:any) => {
    console.log("response pass", response)
    this.webservice.hideLoader();
    if(response.success == true){
    // this.webservice.presentToast(response.message);
    this.ChangePassAlert(response);
    localStorage.setItem('password', this.change.confirm_password);
    }else{
    console.log("response pass", response);
    this.webservice.presentToast(response.message);
    }
    }) 
    }

}



ChangePassAlert(response) {
  const alert = this.alerCtrl.create({
    title: "Your password was changed",
    message: response.message,
    buttons:[
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.push(HomePage);
        }
      }
    ]
  });
  alert.present()
}

}
