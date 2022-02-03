import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, PopoverController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { Geolocation } from '@ionic-native/geolocation';
import { UserprofilePage } from '../userprofile/userprofile';
// import { CategoryServiceListPage } from '../category-service-list/category-service-list';

/**
 * Generated class for the ServiceAcceptedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
declare var MarkerClusterer


@Component({
  selector: 'page-service-accepted',
  templateUrl: 'service-accepted.html',
  providers: [Geolocation]
})
export class ServiceAcceptedPage {

  GEOLOC_CONFIG: { enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0 }
    search_lat: any ;
    search_long: any;
    map: any;
    latLang:any;
    @ViewChild('mapContainer') mapContainer: ElementRef;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  serviceId:any;
  page=1;
  number:3;
  applicantList:any;
  provider=[]
  images:any;
    locations=[]
    icon=[];
    id=[]
    property_search: string = "listView"; 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private webservice:WebserviceProvider,
    public appCtrl: App,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {

    this.serviceId=this.navParams.get('data')
    console.log(' this.serviceId', this.serviceId)
  }

  ngAfterViewInit(){
    setTimeout(() => {
    this.loadMap()
  }, 2000);
  }

  ionViewWillEnter()  {
    console.log('ionViewDidLoad ServiceAcceptedPage');
  }

  ionViewDidLoad() {
    this. getApplicantList();
  }

 

  //// MAP VIEW /////
  loadMap(){
    var marking =[];
  // let modal = this.modalCtrl;
  let popup=this.popoverCtrl;
  let serviceId=this.serviceId.id
    //this.webservice.showLoading();
      this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
      //this.webservice.hideLoader();
        this.search_lat = position.coords.latitude;
        this.search_long = position.coords.longitude;
        localStorage.setItem('search_lat', this.search_lat);
        localStorage.setItem('search_long', this.search_long);
    });
    let locationOptions = {enableHighAccuracy: true,timeout: 30000,maximumAge: 0};
   
          navigator.geolocation.getCurrentPosition(
   
              (position) => {
                
                //console.log(position.coords);
                //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.latLang = {lat: position.coords.latitude, lng: position.coords.longitude};
                console.log("current",this.latLang);
                // var infowindow = new google.maps.InfoWindow();
                  let mapOptions = {
                    center: {lat: position.coords.latitude, lng: position.coords.longitude},
                    //disableDefaultUI: true,
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
   
                  }
                  
                  var pinImage = {
                    url: this.icon, // url
                    scaledSize: new google.maps.Size(25,35),    // set other marker size
                    origin: new google.maps.Point(0,0),  
                    anchor: new google.maps.Point(0, 32),
                    opacity:1
        
                    };
                //  var id=this.id
                //    console.log('url',id)
                  this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                  var markers = this.locations.map(function(location,i) {
                  console.log('marker',location)
                  var markerked = new google.maps.Marker({
                  position: location,
                  icon:pinImage,
                  id:location.id,
                  fullName:location.fullName,
                  profilePicture:location.profilePicture,
                  about:location.about,
                  applyid:location.Applyid,
                  serviceId:serviceId,
                  status:location.status
                  //animation: google.maps.Animation.DROP,
                  //label: labels[i % labels.length]
                  });
                  // let that = this;
                google.maps.event.addListener(markerked,'click',function() {
                  //that.openBasicModal(markerked.id)
                  console.log('id',markerked)
                  let data={
                    'userid':markerked.id,
                    'fullName':markerked.fullName,
                    'profilePicture':markerked.profilePicture,
                    'about':markerked.about,
                    'Applyid':markerked.applyid,
                    'serviceid':markerked.serviceId,
                    'status':markerked.status,
                    'type':'sercviceAccept'
                  }
                 popup.create('ProfilepopupPage',{'data':data}).present();

                });
                marking.push(markerked)
                
                  
                }); 
                console.log(markers);
                var markerCluster = new MarkerClusterer(this.map, marking,
                  {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                  });
                console.log(markerCluster);
              },
   
              (error) => {
                  console.log(error);
              }, locationOptions
          );
  
  }
  
  
  
  onSegmentChanged(event){
    if(event==='mapView'){
      this.loadMap()
      console.log("change",event)
    }
    
    
  }

  ///// GET APPLICATION LIST ////
  
  getApplicantList(){
  this.webservice.presentLoading();
  this.webservice.getData('services/applicantlist/'+'?id='+this.serviceId.id+'&page'+this.page+'&number='+this.number+'&token='+ this.token,).then((response:any) => {

  this.webservice.hideLoader();
  if(response.success){ 
  console.log("response mypost list", response); 
  this.applicantList=response.data;
    this.doData(this.applicantList)
  // for (var j = 0; j < this.applicantList.details.length; j++) {
  //   let obj = {...this.applicantList.details[j]};
    
  //   if(String(this.applicantList.details[j].userid.profilePicture).includes('.jpg') || String(this.applicantList.details[j].userid.profilePicture).includes('.png') || String(this.applicantList.details[j].userid.profilePicture).includes('.JPEG')) {
  //     obj.imagetype = "file"

  //   } else {
  //     obj.imagetype = "base64"
  //   }
  // this.provider.push(obj)
  // console.log("this.provider=",this.provider);
  // } 

  for(var y=0; y <this.applicantList.length;y++){
    //this.id.push({'id':this.serviceList[y].details._id})
    this.locations.push(
      {'lat':this.applicantList[y].details.userid.latitude,
      'lng':this.applicantList[y].details.userid.longitude,
      'id':this.applicantList[y].details.userid._id,
      'fullName':this.applicantList[y].details.userid.fullName,
      'profilePicture':this.applicantList[y].details.userid.profilePicture,
      'about':this.applicantList[y].details.userid.about,
      'Applyid':this.applicantList[y].details._id,
      'status':this.applicantList[y].details.status,
       })
       console.log(this.locations)
  }
  }  
  }, (error) => {
  this.webservice.hideLoader();
  console.log("error ts: ", error);
  })
  }

  doData(applicantList) {
    console.log("applicantList=",applicantList);

    // var Purl = applicantList.details.userid.profilePicture
    
  for (var j = 0; j < applicantList.length; j++) {
    let obj = {...applicantList[j]};
    
    if(String(applicantList[j].details.userid.profilePicture).includes('.jpg') || String(applicantList[j].details.userid.profilePicture).includes('.png') || String(applicantList[j].details.userid.profilePicture).includes('.JPEG')) {
      obj.imagetype = "file"

    } else {
      obj.imagetype = "base64"
      var Purl = applicantList[j].details.userid.profilePicture
      obj.convertimage = Purl.substring(Purl.lastIndexOf('http://18.191.93.75:6018/uploads/users/')+39);
    }
  this.provider.push(obj)
  console.log("this.provider=",this.provider);
  } 
  }


  


  ///// OTHER PROFILE /////
  otherProfile(id,fullName){
    if(id==this.userid){
      this.navCtrl.push('ProfilePage')
    }else{
      let data={
        'userid':id,
        'fullName':fullName
      }
      this.navCtrl.push(UserprofilePage,{'data':data})
    }
  }



  ////// CONFIRM JOB /////

  confirjob(applicationid){
    let data={
      "id":this.serviceId.id,
      "applicationid":applicationid
    }
    this.webservice.presentLoading();
  this.webservice.postData('services/confirmapplication/'+'?token='+ this.token,data).then((response:any) => {
  this.webservice.hideLoader();
  console.log("response confirm", response); 
  if(response.success){ 
    this.webservice.presentToast("Job application successfully confirm");
    this.markecomplete(response.applicationData.serviceid._id,response.applicationData.cash,response.applicationData.paypal,response.applicationData.serviceid.tip,response.applicationData.bank,response.applicationData.serviceid.description,response.applicationData.userid._id)
    // this. getApplicantList()
    //this.appCtrl.getActiveNav().pop()
  // this.applicantList=response.data
  
  }else{
    this.webservice.presentToast(response.message);
    console.log("message", response.message);
  }  
  }, (error) => {
  this.webservice.hideLoader();
  console.log("error ts: ", error);
  })
  }


  markecomplete(serviceid,cash,paypal,tip,confirm,description,userid){
    let data={
      'Job_id':serviceid,
      'cash':cash,
      'paypal':paypal,
      'tip':tip,
      'confirm':confirm,
      'description':description,
      'userid':userid
    }
    this.navCtrl.push('MakePaymentPage',{'data':data})
    }

  //// If unable to pay 1st time ///

  makepayment(cash,paypal,confirm,userid){
    let data={
      'Job_id':this.serviceId.id,
      'cash':cash,
      'paypal':paypal,
      'tip':this.serviceId.tip,
      'confirm':confirm,
      'description':this.serviceId.description,
      'userid':userid
    }
    this.navCtrl.push('MakePaymentPage',{'data':data})
  }




}
