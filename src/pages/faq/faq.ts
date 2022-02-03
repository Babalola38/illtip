import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  faqlist:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice:WebserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
    this.getfaq()
  }
  diseases = [
    { title: "What is i’llTip?", id:'tab1' },
    { title: "Nam porttit?",  id:'tab2'},
    { title: "Lorem ipsum dol?",  id:'tab3'},
    { title: "Vestibulum rutr?",  id:'tab4'},
    { title: "Donec facilisis?",  id:'tab5'}
  ];
  shownGroup = 0; //for the open of first child otherwise it should be "null"
  toggleGroup(group) {
     if (this.isGroupShown(group)) {
         this.shownGroup = null;
     } else {
         this.shownGroup = group; 
     }
 };
 isGroupShown(group) {
     return this.shownGroup === group;
 };



     //// GET CATEGORY LIST ///
     getfaq(){
      this.webservice.presentLoading();
      this.webservice.getData('users/getfaq/'+'?token='+ this.token).then((response:any) => {
          this.webservice.hideLoader();
          console.log("faq", response); 
          if(response.success){ 
              
          this.faqlist=response.data
              }  
        }, (error) => {
           this.webservice.hideLoader();
            console.log("error ts: ", error);
    })
    }



    // optionChange() {
    //   let data ={
    //     'searchText':this.searchText
    //     }
    //   console.log(data)
    // }
}
