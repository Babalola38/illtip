import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { Stripe } from "@ionic-native/stripe";
import { InAppBrowser } from "@ionic-native/in-app-browser";

/**
 * Generated class for the ServiceApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-service-apply',
  templateUrl: 'service-apply.html',
  providers:[Stripe,InAppBrowser]
})
export class ServiceApplyPage {

  payment: string = "bank";
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  getJobdetails:any={};
  job:any={};
  stripeBankToken:any;
  bankDetails:any=[]

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider,
     private stripe: Stripe) {
       
    this.getJobdetails=this.navParams.get('data')
    console.log('get',this.getJobdetails)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceApplyPage');
  }
  choosePayment(){
    console.log('payment',this.job.bank)
  }

  applyjob(){
    //console.log('payment',this.token)
    var bankDeatils,paypalDetails
    let re = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
    var isSplChar_name = re.test(this.job.name);
    // var isSplChar_Pname = re.test(this.job.Pname);
    // if(!this.job){
    //   console.log("Please select any payment option")
    //   this.webservice.presentToast("Please select any payment option");
    // }else{
      
      if(this.job.bank==true){
        console.log("bank")
        if(!this.job.name){
          console.log("Please input your name on bank account")
          this.webservice.presentToast("Please input your name on bank account");
        }else if(this.job.name.trim() == ""){
          console.log("Enter Valid name")
          this.webservice.presentToast("Enter Valid name");
        }else if(isSplChar_name == true){
          console.log("special characters")
          this.webservice.presentToast("Special characters are not allowed");
        }else if(this.job.name.length <3){
          console.log("Name minimum 3 characters")
          this.webservice.presentToast("Name minimum 3 characters");
        }else if(!this.job.number){
          console.log("Enter Account number")
          this.webservice.presentToast("Please input your bank account number");
        }else if(this.job.number.length < 10 ||this.job.number.length > 17){
          this.webservice.presentToast("Enter Valid Account number");
        }else if(!this.job.rounting){
          this.webservice.presentToast("Plaese enter your routing number");
      }else{
          this.webservice.presentLoading();
        //// NEW BANK ACCOUNT PAYMENT /////
        let bankInfo = {
          country: 'US',
          currency: 'usd',
          routing_number: this.job.rounting, // 110000000
          account_number:this.job.number, // 000123456789
          account_holder_name: this.job.name,
          account_holder_type: 'individual'
        }
        this.stripe.setPublishableKey(this.webservice.STRIPE_KEY)
  
        this.stripe.createBankAccountToken(bankInfo)
          .then((stripe_bank_token:any) => {
            this.stripeBankToken = stripe_bank_token.id
            localStorage.setItem('stripe_bank_token', stripe_bank_token.id)
            console.log(stripe_bank_token)
          bankDeatils={
            // "title":this.job.title,
            "id":this.getJobdetails.id,
            "payment":this.job.payment,
            "paypal":null,
            "name":this.job.name,
            "number":this.job.number,
            "routing": this.job.rounting,
            "stripe_bank_token":this.stripeBankToken
          }
         // this.jobapply(data)
              
          })
          .catch(error =>
            this.webservice.presentToast(error));
             //console.error(error))
        }
      }
      if(this.job.paypal==true){
        console.log("Paypal")
       
        if(!this.job.Pemail){
          console.log("Please input your paypal email id")
        this.webservice.presentToast("Please input your paypal email id");
        
      }else{
        paypalDetails ={
          "id":this.getJobdetails.id,
          "payment":this.job.payment,
          "paypal_email":this.job.Pemail

        }
        console.log('Pdata',paypalDetails)
     // this.jobapply(data)
      }

        
      }
      if(this.job.cash==true){
        console.log("cash")
       let cashDetails ={
          "id":this.getJobdetails.id,
          "payment":this.job.payment,
          'paypalEmail':this.job.paypalEmail,
          'paypalId':this.job.paypalId
        }
        //this.jobapply(data)
        console.log(cashDetails);
      }
      
      console.log(bankDeatils,paypalDetails)
    //} 
   

  }
  jobapply(data){
    
    // this.webservice.presentLoading();
              this.webservice.postData('services/applyservice/'+'?token='+ this.token,data).then((response:any) => {
                console.log("bank response",response)
              //this.webservice.hideLoading();
                if(response.success){ 
                    console.log("response update", response);
                      this.webservice.presentToast("You applied successfully"); 
                      this.navCtrl.pop();
                      //this.navCtrl.parent.select(0)
                  }else{
                    this.webservice.presentToast(response.message);
                  }  
              }, (error) => {
                  //this.webservice.hideLoading();
                  console.log("error ts: ", error);
              })
              
  }

  apply(){
    var paypal
    if(this.job.paypal==true){
      console.log("Paypal")
     
      if(!this.job.Pemail){
        console.log("Please input your paypal email id")
      this.webservice.presentToast("Please input your paypal email id");
      
    }else{
      // paypalDetails ={
      //   "paypal_email":this.job.Pemail

      // }
      paypal={
        "paypal_email":this.job.Pemail
      }
      console.log('Pdata',paypal)
   // this.jobapply(data)
    }
  }
  let data={
    "id":this.getJobdetails.id,
    "paypal":paypal,
    "bank":this.bankDetails,
    'cash':this.job.cash
  }
console.log('Application detils',data)
this.webservice.postData('services/applyservice/'+'?token='+ this.token,data).then((response:any) => {
    console.log("bank response",response)
  //this.webservice.hideLoading();
    if(response.success){ 
        console.log("response update", response);
        this.job.Pemail=""
          this.webservice.presentToast("You applied successfully"); 
          this.navCtrl.pop();

          //this.navCtrl.parent.select(0)
      }else{
        this.webservice.presentToast(response.message);
      }  
  }, (error) => {
      //this.webservice.hideLoading();
      console.log("error ts: ", error);
  })
  
 
  }



  doPaypal() {
    var paypal
    paypal={
      "paypal_email":this.job.Pemail
    }
    let data={
      "id":this.getJobdetails.id,
      "paypal":paypal,
      "bank":this.bankDetails,
      'cash':this.job.cash
    }
  console.log('Application detils',data)
  this.webservice.postData('services/applyservice/'+'?token='+ this.token,data).then((response:any) => {
      console.log("bank response",response)
    //this.webservice.hideLoading();
      if(response.success){ 
          console.log("response update", response);
          this.job.Pemail=""
            this.webservice.presentToast("You applied successfully"); 
            this.navCtrl.pop();
  
            //this.navCtrl.parent.select(0)
        }else{
          this.webservice.presentToast(response.message);
        }  
    }, (error) => {
        //this.webservice.hideLoading();
        console.log("error ts: ", error);
    })
  }


  doCash() {
    var paypal
    paypal={
      "paypal_email":this.job.Pemail
    }
    let data={
      "id":this.getJobdetails.id,
      "paypal":paypal,
      "bank":this.bankDetails,
      'cash':true
    }
  console.log('Application detils',data)
  this.webservice.postData('services/applyservice/'+'?token='+ this.token,data).then((response:any) => {
      console.log("bank response",response)
    //this.webservice.hideLoading();
      if(response.success){ 
          console.log("response update", response);
          this.job.Pemail=""
            this.webservice.presentToast("You applied successfully"); 
            this.navCtrl.pop();
  
            //this.navCtrl.parent.select(0)
        }else{
          this.webservice.presentToast(response.message);
        }  
    }, (error) => {
        //this.webservice.hideLoading();
        console.log("error ts: ", error);
    })
  }

  savebankDeatils(){
    console.log('bank')

    var paypal
    paypal={
      "paypal_email":this.job.Pemail
    }
   
    let re = /[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
    var isSplChar_name = re.test(this.job.name);
    // var isSplChar_Pname = re.test(this.job.Pname);
      if(!this.job.name){
        console.log("Please input your name on bank account")
        this.webservice.presentToast("Please input your name on bank account");
      }else if(this.job.name.trim() == ""){
        console.log("Enter Valid name")
        this.webservice.presentToast("Enter Valid name");
      }else if(isSplChar_name == true){
        console.log("special characters")
        this.webservice.presentToast("Special characters are not allowed");
      }else if(this.job.name.length <3){
        console.log("Name minimum 3 characters")
        this.webservice.presentToast("Name minimum 3 characters");
      }else if(!this.job.number){
        console.log("Enter Account number")
        this.webservice.presentToast("Please input your bank account number");
      }else if(this.job.number.length < 10 ||this.job.number.length > 17){
        this.webservice.presentToast("Enter Valid Account number");
      }else if(!this.job.rounting){
        this.webservice.presentToast("Plaese enter your routing number");
    }else{
        this.webservice.presentLoading();
      //// NEW BANK ACCOUNT PAYMENT /////
      let bankInfo = {
        country: 'US',
        currency: 'usd',
        routing_number: this.job.rounting, // 110000000
        account_number:this.job.number, // 000123456789
        account_holder_name: this.job.name,
        account_holder_type: 'individual'
      }
      this.stripe.setPublishableKey(this.webservice.STRIPE_KEY)

      this.stripe.createBankAccountToken(bankInfo)
        .then((stripe_bank_token:any) => {
          this.stripeBankToken = stripe_bank_token.id
          localStorage.setItem('stripe_bank_token', stripe_bank_token.id)
          console.log(stripe_bank_token)
        let data={
          "number":this.job.number,
          "routing": this.job.rounting,
          "name":this.job.name,
          "stripe_bank_token":this.stripeBankToken
        }
        this.job.name="";
        this.job.number="";
        this.job.rounting="";

        this.bankDetails=data
        console.log(this.bankDetails)


        let pay={
          "id":this.getJobdetails.id,
          "paypal":paypal,
          "bank":this.bankDetails,
          'cash':this.job.cash
        }
      console.log('Application detils',pay)
        this.webservice.postData('services/applyservice/'+'?token='+ this.token,data).then((response:any) => {
          console.log("bank response",response)
        //this._utilityService.hideLoading();
          if(response.success){ 
              console.log("response update", response);
              this.job.Pemail=""
                this.webservice.presentToast("You applied successfully"); 
                this.navCtrl.pop();
      
                //this.navCtrl.parent.select(0)
            }else{
              this.webservice.presentToast(response.message);
            }  
        }, (error) => {
            //this._utilityService.hideLoading();
            console.log("error ts: ", error);
        })
       
        })
        

        .catch(error =>
          this.webservice.presentToast(error));
           //console.error(error))
      }
    
  }



  

}
