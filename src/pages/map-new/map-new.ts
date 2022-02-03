import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WebserviceProvider } from '../../providers/webservice/webservice';
// import { Diagnostic } from '@ionic-native/diagnostic';

//APP SERVICES

declare var google;
@Component({
  selector: 'page-map-new',
  templateUrl: 'map-new.html',
  providers: [Geolocation]
})
export class MapNewPage {
  GEOLOC_CONFIG: { enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0 }

  search_lat: any ;
  search_long: any;
  map: any;
  setCircle :any;
  radius=localStorage.getItem('radius');
  latLang:any;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController,
  //  private _appService: AppService, 
  //  private _utilityService: UtilityService,
   //public http: Http,
   public geolocation: Geolocation,
   private webservice:WebserviceProvider) {
     
  }
  // ngAfterViewInit() {
  //   this.loadMap()
  // }
  ngAfterViewInit() {
          this.loadMap()
          let address = (<HTMLInputElement>document.getElementById("pac-input"));
          console.log("address", address )
          // set the options
          let options = {
          types: [],
          componentRestrictions: {country: []}
        }
        
        let autocomplete1 = new google.maps.places.Autocomplete(address, options);

        google.maps.event.addListener(autocomplete1, 'place_changed', function() {

          let place = autocomplete1.getPlace();
          let geometry = place.geometry;
console.log('place',place)
          if ((geometry) !== undefined) {
              this.search_lat = geometry.location.lat();
              this.search_long = geometry.location.lng();
              localStorage.setItem('search_lat', this.search_lat);
              localStorage.setItem('search_long', this.search_long);
        }
      })
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //this.loadMap()
    // setTimeout(() => {
    //             this.loadMap()
    //     },2000);

  }

  addMarkersToMap(markers) {
  console.log('Map: ',markers);
  for(let marker of markers) {
    var position = new google.maps.LatLng(marker.latitude, marker.longitude);
    console.log('position',position);
    var dogwalkMarker = new google.maps.Marker({position: position, title: marker.name});
    dogwalkMarker.setMap(this.map);

    var information = marker.name+ '<br/> Wait time: '+marker.wait_time;
    var infowindow = new google.maps.InfoWindow({
    content: information
    });
    infowindow.open(this.map, dogwalkMarker);
  }
}

  loadMap() {
    this.webservice.presentLoading();
    this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
    this.webservice.hideLoader();
      this.search_lat = position.coords.latitude;
      this.search_long = position.coords.longitude;
      localStorage.setItem('search_lat', this.search_lat);
      localStorage.setItem('search_long', this.search_long);
      //console.log('getting location', this.search_lat, this.search_long);
  });

  let locationOptions = {enableHighAccuracy: true,timeout: 30000,maximumAge: 0};
 
        navigator.geolocation.getCurrentPosition(
 
            (position) => {
              
              console.log(position.coords);
              //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              this.latLang = {lat: position.coords.latitude, lng: position.coords.longitude};
              console.log("current",this.latLang);
              
                let mapOptions = {
                  center: this.latLang,
                  disableDefaultUI: true,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
 
                }

                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                var pinImage = {
                url: "assets/imgs/marker-icon.png", // url
                scaledSize: new google.maps.Size(25, 37), // scaled size
                };
                console.log(pinImage);
                

                var marker = new google.maps.Marker({
                 //title: 'You',
                 center: this.latLang,
                //  icon: pinImage,
                 animation: google.maps.Animation.DROP,
                position: this.latLang,
                map: this.map,
              });
              console.log(marker);
              
                
            },
 
            (error) => {
                console.log(error);
            }, locationOptions
        );
        
 

  }
geolocator() {

  this.webservice.presentLoading();
    this.geolocation.getCurrentPosition(this.GEOLOC_CONFIG).then((position) => {
    this.webservice.hideLoader();
      this.search_lat = position.coords.latitude;
      this.search_long = position.coords.longitude;
      localStorage.setItem('search_lat', this.search_lat);
      localStorage.setItem('search_long', this.search_long);
      //console.log('getting location', this.search_lat, this.search_long);
  });

  let locationOptions = {enableHighAccuracy: true,timeout: 30000,maximumAge: 0};
 
        navigator.geolocation.getCurrentPosition(
 
            (position) => {
              
              console.log(position.coords);
              //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              this.latLang = {lat: position.coords.latitude, lng: position.coords.longitude};
              console.log("current",this.latLang);
              
                let mapOptions = {
                  center: this.latLang,
                  disableDefaultUI: true,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
 
                }

                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                var pinImage = {
                url: "assets/imgs/marker-icon.png", // url
                scaledSize: new google.maps.Size(25, 37), // scaled size
                };
                console.log(pinImage);
                
                var marker = new google.maps.Marker({
                 //title: 'You',
                 center: this.latLang,
                //  icon: pinImage,
                 animation: google.maps.Animation.DROP,
                position: this.latLang,
                map: this.map,
              });
              console.log(marker);
              
      
            },
 
            (error) => {
                console.log(error);
            }, locationOptions
        );
}
  
addMarkerNative() {

   this.search_lat =   parseFloat(localStorage.getItem("search_lat"))
  this.search_long =   parseFloat(localStorage.getItem("search_long"))

   let locationOptions = {timeout: 20000, enableHighAccuracy: true};
 
        navigator.geolocation.getCurrentPosition(
 
            (position) => {
              
              console.log(this.search_lat,this.search_long);
              //this.latLang = new google.maps.LatLng(this.search_lat, this.search_long);
              this.latLang={lat: this.search_lat, lng: this.search_long}
              console.log("serach",this.latLang);
              
                let mapOptions = {
                  center: this.latLang,
                  disableDefaultUI: true,
                  zoom: 18,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  
                }
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                 var pinImage = {
                url: "assets/imgs/marker-icon.png", // url
                scaledSize: new google.maps.Size(25, 37), // scaled size
                };
                console.log(pinImage);
                
                var marker = new google.maps.Marker({
                 center: this.latLang,
                //  icon: pinImage,
                 animation: google.maps.Animation.DROP,
                position: this.latLang,
                map: this.map,
              });
              console.log(marker);
              
            
            },
            (error) => {
                console.log(error);
            }, locationOptions
        );
  
}


//// CLOSE MODAL ////
  closeModal(){
    this.viewCtrl.dismiss();
  }

/// GET VALUE FROM MODAL CLOSE ///
getValue(){

  let data={'radi':this.radius,'pos_lat':parseFloat(localStorage.getItem("search_lat")),'pos_long' :parseFloat(localStorage.getItem("search_long"))
  }

  this.viewCtrl.dismiss(data);
  console.log(data)
}


  

}
