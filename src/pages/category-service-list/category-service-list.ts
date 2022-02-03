import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetailPage } from '../detail/detail';
declare var google;
declare var MarkerClusterer
//APP SERVICES


//@IonicPage()
@Component({
  selector: 'page-category-service-list',
  templateUrl: 'category-service-list.html',
  providers: [Geolocation]
})
export class CategoryServiceListPage {
  details: any;
  categoryid:any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  GEOLOC_CONFIG: { enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 0 }
    @ViewChild('mapContainer') mapContainer: ElementRef;
    search_lat: any ;
    search_long: any;
    map: any;
    latLang:any;
    serviceList:any=[];
    property_search: string = "listView"; 
    images:any;
    locations=[]
    icon=[];
    id=[]

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     private webservice:WebserviceProvider,
     public geolocation: Geolocation,
     public modalCtrl: ModalController) {

    this.categoryid=this.navParams.get('data')
    this.icon=this.categoryid.icon
    this.serviceList=this.categoryid.serviceinfo
    console.log("categoryid",this.serviceList)
    for(var y=0; y <this.serviceList.length;y++){
      this.id.push({'id':this.serviceList[y].details._id})
      this.locations.push(
        {'lat':this.serviceList[y].details.latitude,
        'lng':this.serviceList[y].details.longitude,
        'id':this.serviceList[y].details._id
         })
    }
    console.log("lati",this.id)
  }

  ngAfterViewInit(){
    setTimeout(() => {
    // this.loadMap()
  }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryServiceListPage');
    this.getServicelisting()
    
  }

  getServicelisting(){
    //this.webservice.presentLoading();
    this.webservice.getData('services/categoryservicelist/'+this.categoryid.id+'/?token='+ this.token).then((response:any) => {
      this.webservice.hideLoader();
      console.log("Service list", response);
      if(response.success){ 
        this.webservice.hideLoader();
          console.log("Service list", response); 
        // this.serviceList=response.data
        // for(var i=0;i<this.categoryid.serviceinfo.length;i++){
        //   var count=this.categoryid.serviceinfo[i].distance
        //   // this.serviceList.distance=count
        //   console.log("count",count)
        // }
        
       }  
    }, (error) => {
       this.webservice.hideLoader();
        console.log("error ts: ", error);
    })
  }




  //// MAP OPEN ////
loadMap(){
  var marking =[];
  let modal = this.modalCtrl;
  //this.webservice.presentLoading();
    this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
    this.webservice.hideLoader();
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
                  zoom: 8,
                  disableDefaultUI: true,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
 
                }
                
                var pinImage = {
                  url: this.icon, // url
                  scaledSize: new google.maps.Size(45,50),    // set other marker size
                  origin: new google.maps.Point(0,0),  
                  anchor: new google.maps.Point(0, 32),
                  opacity:1
      
                  };
              //  var id=this.id
                 console.log('url',pinImage)
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                var markers = this.locations.map(function(location,i) {
                console.log('marker',location)
                var markerked = new google.maps.Marker({
                position: location,
                icon:pinImage,
                id:location.id
    
                });  
                //markerked.setMap(this.map);  
                // let that = this;
                google.maps.event.addListener(markerked,'click',function() {
                  //that.openBasicModal(markerked.id)
                  console.log('id',markerked)
                  modal.create('DetialsModalPage',{'id':markerked.id}).present();
                  this.webservice.hideLoader();
                });
                marking.push(markerked)
                
              }); 
              console.log("markers=",markers);
      
              var markerCluster = new MarkerClusterer(this.map, marking,
                {
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });

                console.log("markerCluster=",markerCluster);
                
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

openBasicModal(id) {
  console.log('job id',id)
  let myModal = this.modalCtrl.create('DetialsModalPage',{'id':id});
  myModal.present();
  //this.navCtrl.push('DetailPage',{'id':id})
}

// goToDetails(id,lati,long){
//   console.log('id',id)
//   this.navCtrl.push('DetailPage',{'id':id,'lati':lati,'long':long,'icon':this.icon})
// }

goToDetails(id,lati,long){
  console.log('id',id)
  this.navCtrl.push(DetailPage,{'id':id,'lati':lati,'long':long})
}

}
