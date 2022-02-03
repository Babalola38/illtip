import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { DetialsModalPage } from '../detials-modal/detials-modal';

declare var google;
//@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [Geolocation,Diagnostic]
})
export class DetailPage {
  serviceId:any; 
  latitude:any;
  longitude:any;
  GEOLOC_CONFIG: { enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0 }
  latLang:any;
  map: any;
  icon:any;
  @ViewChild('mapContainer') mapContainer: ElementRef;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public geolocation: Geolocation,
     private webservice: WebserviceProvider) {
      this.serviceId=this.navParams.get('id')
      this.latitude =this.navParams.get('lati')
      this.longitude =this.navParams.get('long')
      this.icon = this.navParams.get('icon')
      console.log('service id',this.serviceId)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    //this.loadMap()
    this.openBasicModal()
  }


  openBasicModal() {
    let myModal = this.modalCtrl.create(DetialsModalPage,{'id':this.serviceId});
    myModal.present();
  }


  loadMap() {
    this.webservice.presentLoading();
  // let locationOptions = {enableHighAccuracy: true,timeout: 30000,maximumAge: 0};
              //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              this.latLang = {lat: this.latitude, lng: this.longitude};
              this.webservice.hideLoader();
              console.log("current",this.latLang);
                let mapOptions = {
                  center: this.latLang,
                  disableDefaultUI: true,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                }
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
                var pinImage = {
                url: this.icon, // url
                scaledSize: new google.maps.Size(40, 57), // scaled size
                };

                console.log('pin',pinImage)
                var marker = new google.maps.Marker({
                 //title: 'You',
                 center: this.latLang,
                icon: pinImage,
                 animation: google.maps.Animation.DROP,
                position: this.latLang,
                map: this.map,
              });
              console.log("marker=",marker);
              
              setTimeout(()=>{
                this.openBasicModal()
               
              },1000);

 
        
 

  }

 
 

}
