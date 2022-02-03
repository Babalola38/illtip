import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { CategoryServiceListPage } from '../category-service-list/category-service-list';
import { MypostPage } from '../mypost/mypost';
import { DetialsModalPage } from '../detials-modal/detials-modal';


declare var google;
declare var MarkerClusterer


@Component({
  selector: 'page-services-list',
  templateUrl: 'services-list.html',
  providers: [Geolocation]
})

export class ServicesListPage {
  edited:boolean= false;
  edited2:boolean= false;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  lat=localStorage.getItem('search_lat');
  long=localStorage.getItem('search_long')
  categoryList:any;
  GEOLOC_CONFIG: { enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0 }
  search_lat: any ;
  search_long: any;
  map: any;
  latLang:any;
  servicecount:any;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  locations=[];
  clusterStyles=[];
  property_search:any;
  URL:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider,
     public geolocation: Geolocation,
     public modalCtrl: ModalController) {
  }
  ngAfterViewInit(){
   
    // this.loadMap()
    setTimeout(() => {
    
  }, 2000);
  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad ServiceListPage');
    this. getCategoryList(this.lat,this.long) 
    this.property_search = "listView"; 
  }

  
 
  serviceAvailable(){
    this.navCtrl.setRoot('ServiceAvailablePage')
  }
  
   //// GET CATEGORY LIST ///
 getCategoryList(lat,long){
  console.log("lat,long,token=",lat,long,this.token)
   // this.webservice.presentLoading();

    if(this.token==null) {
      this.URL = 'services/categorylist10/'+'?lat='+lat+'&long='+long
    } else {
      this.URL = 'services/categorylist10/'+'?lat='+lat+'&long='+long+'&token='+ this.token
    }
  this.webservice.getData(this.URL).then((response:any) => {
     // this.webservice.hideLoader();
      if(response.success){ 
          console.log("response category list", response); 
          this.categoryList=response.data
          this.locations=[]
          this.clusterStyles=[]
          for(var i=0;i<this.categoryList.length;i++){
           
            this.clusterStyles.push(this.categoryList[i].icon)
            
            this.servicecount=this.categoryList[i].serviceInfo
            if(this.servicecount.length > 0) {
              for(var y=0; y <this.servicecount.length;y++){
                this.locations.push(
                  {'lat':this.servicecount[y].details.latitude,
                  'lng':this.servicecount[y].details.longitude,
                  'id':this.servicecount[y].details._id,
                  'icon':this.categoryList[i].icon
                   })
              }
            }  
          }
          this.loadMap()
          console.log("lat",this.locations)
          
          }  
    }, (error) => {
       //this._utilityService.hideLoading();
        console.log("error ts: ", error);
})
}

//// MAP OPEN ////
loadMap(){
  var marking =[];
  let modal = this.modalCtrl;
  //this._utilityService.showLoading();
    this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
    //this._utilityService.hideLoading();
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
              
                let mapOptions = {
                  center: {lat: position.coords.latitude, lng: position.coords.longitude},
                  disableDefaultUI: true,
                  zoom: 3,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
 
                }

                var pinImage = {
                  url: this.clusterStyles, // url
                  scaledSize: new google.maps.Size(100, 100),    // set other marker size
                  origin: new google.maps.Point(0,0),  
                  anchor: new google.maps.Point(0, 32),
                  opacity:1
      
                  };
               
                 console.log('url',pinImage)
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
              var markers = this.locations.map(function(location,i) {
                console.log('marker',location)
                var markerked = new google.maps.Marker({
                  position: location,
                  icon:location.icon,
                  id:location.id
                  //animation: google.maps.Animation.DROP,
                  //label: labels[i % labels.length]
                });
                let that = this;
                google.maps.event.addListener(markerked,'click',function() {
                  //that.openBasicModal(markerked.id)
                  console.log('id',markerked)
                  modal.create(DetialsModalPage,{'id':markerked.id}).present();
                });
                marking.push(markerked)
              });

              var markerCluster = new MarkerClusterer(this.map, marking,
                {
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
              
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
 /// Go TO PROFILE ///
 gotoProfile(){
  this.navCtrl.push('ProfilePage')
}

///// SERVICE LISTING BASED ON CATEGORY ////

gotoServiceListing(id,name,serviceinfo,icon){
  let data={
    'id':id,
    'name':name,
    'serviceinfo':serviceinfo,
    'icon':icon
  }
  console.log("data",data)
  this.navCtrl.push(CategoryServiceListPage,{'data':data})
}



goServicesaccepted() {
  this.navCtrl.push(MypostPage)
}

}
