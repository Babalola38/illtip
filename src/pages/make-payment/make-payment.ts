import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { CONFIG } from '../../config';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { WebserviceProvider } from '../../providers/webservice/webservice';

//APP SERVICES


@Component({
  selector: 'page-make-payment',
  templateUrl: 'make-payment.html',
  providers: [Stripe,PayPal]
})

export class MakePaymentPage {
  Payment:any
  
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  payment:any ={};
  stripeToken: any;
  stripeBankToken: any;
  data:any;
  postdetils:any;
  paypalAdmin:any;
  currentYear : any = (new Date()).getFullYear();
   endyear:any=(new Date()).getFullYear()+15;
  public mask = [/[0-9]/, /[0-9]/,/[0-9]/,/[0-9]/,'-', /[0-9]/, /[0-9]/, /[0-9]/,/[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/,/[0-9]/,'-' ,/[0-9]/,/[0-9]/, /[0-9]/,/[0-9]/]
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private stripe: Stripe,
     private webservice:WebserviceProvider,
     private payPal: PayPal) {
       this.postdetils = this.navParams.get('data');
       console.log('postdetils',this.postdetils)
       if(this.postdetils.confirm.name != null) {
        this.Payment = "card"
      } else if(this.postdetils.paypal.paypal_email !==null) {
        this.Payment = "paypal"
      } else {
        this.Payment = "cash"
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakePaymentPage');
    this.adminpaypal()
  }


  makepayment(){
    // let re2=/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
    // var isSplChar_cardname = re2.test(this.payment.cardname);
      console.log('clid',this.paypalAdmin)
      this.payPal.init({
        PayPalEnvironmentProduction:this.paypalAdmin,
        PayPalEnvironmentSandbox:this.paypalAdmin,
      }).then(() => {

        this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(this.postdetils.tip, 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            // Successfully paid
            console.log("paypal res",res)
                let data={
                  // 'sender_id':this.loginuserId,
                  // 'receiver_id':id,
                  // 'type':res.response_type,
                  // 'transaction_id':res.response.id,
                  // 'amount_paid':fee,
                  // 'description':"Payment successfull",
                  // 'transaction_date':res.response.create_time,
                  // 'bookings_id':booking_id,

                'amount_paid':this.postdetils.tip,
                'job_id':this.postdetils.Job_id,
                'job_completed_by':this.postdetils.userid,
                'transaction_date':res.response.create_time,
                'payment_type':'paypal',
                'sender_id':this.userid,
                'description':"Payment successfull",
                'transaction_id':res.response.id
              
                }
                this.dopaypalmakepayment(data) 
          }, () => {
          });
        }, () => {
        });
      }, () => { 
      });
    
     
    }


bankpayment(){
  let re2=/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/0123456789]/gi;
    var isSplChar_cardname = re2.test(this.payment.cardname);
  if(!this.payment.cardname){
    console.log('32')
    this.webservice.presentToast("Plaese input name on card");
  }else if(this.payment.cardname.trim() == ""){
    console.log('33')
    this.webservice.presentToast("Enter Valid name");
    }else if( isSplChar_cardname == true){
    console.log('34')
    this.webservice.presentToast("Special characters are not allowed");
    }else if(this.payment.cardname <3){
    console.log('35')
    this.webservice.presentToast("Name minimum 3 characters");
    }else if(!this.payment.cardno){
      console.log('27')
      this.webservice.presentToast("Plaese input your 16 digit card number");
     }else if(!this.payment.exmonth){
      console.log('28')
      this.webservice.presentToast("Plaese input your card expiry month");
    }else if(!this.payment.cvv){
      console.log('30')
      this.webservice.presentToast("Plaese input your cvv number");
    }else if(this.payment.cvv.length < 3 || this.payment.cvv.length > 4){
      console.log('31')
      this.webservice.presentToast("Plaese input your valid cvv number");
    }else{
      // let formattedCardNum = this.payment.cardno.split('-');
      let formattedCardExpiry = this.payment.exmonth.split('-');
      let card = {
        number: this.payment.cardno,//formattedCardNum[0]+formattedCardNum[1]+formattedCardNum[2]+formattedCardNum[3],
        expMonth: formattedCardExpiry[1],
        expYear: formattedCardExpiry[0],
        cvc: this.payment.cvv,
        name: this.payment.cardname
      }
      this.stripe.setPublishableKey(CONFIG.STRIPE_KEY)
      // create bank token
      this.stripe.createCardToken(card)
      .then(token => {
        this.stripeToken = token.id
        localStorage.setItem('stripe_card_token1', this.stripeToken)
        console.log(token);
        let data={
          'amount':this.postdetils.tip,
          'stripe_source':this.stripeToken,
          'job_id':this.postdetils.Job_id,
          'job_completed_by':this.postdetils.userid,
          'stripe_bank_source':this.postdetils.confirm.stripe_bank_token,
          'payment_type':'bank'
       }
       this.data = data
       this.domakepayment(data)    
       this.create()
      
  })
}
}

domakepayment(data){
  console.log('data', data);
  this.webservice.presentLoading();
  
   this.webservice.postData('payment/transaction/' + '?token=' + this.token,data).then((response:any) => {

   console.log("payment response : ", response);

  // this.webservice.hideLoading();

   if(response.success == true){   
   this.webservice.presentToast("Your payment sucessfully Done");
   //this.navCtrl.pop(); 
//this.navCtrl.parent.select(0)

   }else{
   this.webservice.presentToast(response.message);
   }

   }, (error) => {
   console.log("error ts: ", error);
   })
}
adminTransaction(data){
  console.log('data', data);
  //this.webservice.presentLoading();
  
   this.webservice.postData('payment/admin_transaction/' + '?token=' + this.token,data).then((response:any) => {

   console.log("payment response : ", response);

  // this.webservice.hideLoading();

   if(response.success == true){   
   //this.webservice.presentToast("Your payment sucessfully Done");
   this.navCtrl.pop(); 
//this.navCtrl.parent.select(0)

   }else{
  // this.webservice.presentToast(response.message);
   }

   }, (error) => {
   console.log("error ts: ", error);
   })
}
//// ADMIN PAYMENT


dopaypalmakepayment(data){
  console.log('data', data);
  this.webservice.presentLoading();
  
   this.webservice.postData('users/payment_paypal/'+'?token='+ this.token,data).then((response:any) => {

   console.log("payment response : ", response);

  // this.webservice.hideLoading();

   if(response.success == true){    

  this.webservice.presentToast("Your payment sucessfully Done");

  this.navCtrl.pop(); 
//this.navCtrl.parent.select(0)

   }else{
   this.webservice.presentToast(response.message);
   }

   }, (error) => {
   console.log("error ts: ", error);
   })
}

cashpayment(){
    console.log("payment",)

  //this.webservice.presentLoading();
              // this.webservice.getData(this.token,this.postdetils.Job_id).subscribe((response) => {
              this.webservice.getData('services/cashPaymentNotification/'+this.postdetils.Job_id+'?token='+ this.token,).then((response:any) => {
                //this.webservice.hideLoading();
                console.log(response);
                if(response.success == true){
                      //this.getMypostList();
                      console.log("response completed", response); 
                     this.webservice.presentToast("Your payment sucessfully Done");
                     this.navCtrl.pop();
                     
                }

  })
  //console.log('true')

}

create(){
      // let formattedCardNum = this.payment.cardno.split('-');
          let formattedCardExpiry = this.payment.exmonth.split('-');
          let card = {
            number: this.payment.cardno,//formattedCardNum[0]+formattedCardNum[1]+formattedCardNum[2]+formattedCardNum[3],
            expMonth: formattedCardExpiry[1],
            expYear: formattedCardExpiry[0],
            cvc: this.payment.cvv,
            name: this.payment.cardname
          }
          this.stripe.setPublishableKey(CONFIG.STRIPE_KEY)
          // create bank token
          this.stripe.createCardToken(card)
          .then(token => {
            this.stripeToken = token.id
            localStorage.setItem('stripe_card_token2', this.stripeToken)
            console.log(token);
            let data={
              'amount':this.postdetils.tip,
              'stripe_source_admin':this.stripeToken,
              'job_id':this.postdetils.Job_id,
              'job_completed_by':this.postdetils.userid,
              //'stripe_bank_source':this.postdetils.confirm.bank.stripe_bank_token,
              'payment_type':'bank'
           }
           this.data = data
           this.adminTransaction(data)    
          
      })
}


//// PAYPAL DETAILS ADMIN/////
adminpaypal(){
    this.webservice.getData('bankpaypal/allbankpaypallist/'+'?token='+ this.token).then((response:any) => {
      console.log("response admin",response);
      if(response.success == true){
           for (let index = 0; index < response.data.length; index++) {
            this.paypalAdmin=response.data[index].paypal_client_id
            //this.paypalAdmin='AV2T7IDDxHXSzFsLcAjqNMXI2JpakfNUUlWLK7j85Xj4jmph1989mAI6we8Idyb4PooczW2oNpa3TvuY'
             
           }
            
            console.log("response admin", this.paypalAdmin); 
      }
    })
}
}
