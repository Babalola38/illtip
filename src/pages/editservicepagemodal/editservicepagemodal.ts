import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { FormGroup } from '@angular/forms';

/**
 * Generated class for the EditservicepagemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-editservicepagemodal',
  templateUrl: 'editservicepagemodal.html',
})
export class EditservicepagemodalPage {

  service:any;

  categoryList:any;
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long');
  public token = localStorage.getItem('access-token-illTip');

  public changeprofileData: FormGroup;
  public profileDetails:any;
  skill = this.navParams.get('skill');
  selected:boolean

  services:any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private events: Events,
    private webservice:WebserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditservicepagemodalPage');
    // fetch('../assets/service/service.json').then(res => res.json()).then(json => {
    //   console.log("service list=",json);
    //   this.service = json
    // });
    
    this.getprofiledetails();
  }




  ngOnInit(): any {
    // this.changeprofileData = this._formBuilder.group({
    //   services:[],
    // });
    
    

  }





















  getprofiledetails() {
    this.webservice.getData('users/viewDetails10/'+'?token='+ this.token,).then((res:any) => {
      console.log("Service data..=",res);
      this.profileDetails = res.data;
      this.services=this.profileDetails.services
        // this.changeprofileData.setValue({
        //   services:this.profileDetails.services,
        // });
        this.getCategoryList();
        console.log("this.changeprofileData=",this.profileDetails);

    }, (err) => {
      console.log(err); 
    });
  }


















  //// GET CATEGORY LIST ///
 getCategoryList(){
  // var arrayId={}
  console.log("skill=",this.skill);
  if(this.skill == undefined) {
    this.webservice.getData('services/categorylist10/'+'?lat='+this.lat+'&long='+this.long+'&token='+ this.token).then((res:any) => {
    console.log("response category list", res);
    if(res.success){ 
      console.log("response category list", res); 
      this.categoryList = res.data
   }
  },(error) => {
   console.log("error ts: ", error);
  })
  } else {
    this.categoryList = this.skill
  }
}

check(tag, hobbyArr)

  {
    //console.log( tag)
    if(hobbyArr.indexOf(tag) > -1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
checkservice(id){
  var index =  this.profileDetails.services.indexOf(id);
  console.log("this.id",id)
  if(index === -1){
    this.profileDetails.services.push(id);
    console.log("this.id1",this.profileDetails.services)
  }else{
    this.profileDetails.services.splice(index,1);
    console.log("this.id2",this.profileDetails.services)
  }
  //this.checkserviceid.push(id)
  
}





 

  dismiss() {
    this.viewCtrl.dismiss(this.profileDetails.services);
  }

  doService(data) {
    console.log("service=",data);
    this.events.publish('service', data);
    this.viewCtrl.dismiss();
  }

}

enableProdMode();
