import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

import { GetStartedPage } from '../pages/get-started/get-started';

import { Geolocation } from '@ionic-native/geolocation';
import { WebserviceProvider } from '../providers/webservice/webservice';




@Component({
  templateUrl: 'app.html',
  providers: [ 
    Geolocation
]
})
export class MyApp {
  public token = localStorage.getItem('access-token-illTip');
  
  // rootPage:any = TabsPage; 
  // rootPage:any = LoginPage;
  // rootPage:any = GetStartedPage; 
  rootPage:any

  search_lat:any;
  search_long:any
  GEOLOC_CONFIG: { enableHighAccuracy: false, timeout: 30000, maximumAge: 0 }


  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public geolocation: Geolocation,
    public webservice: WebserviceProvider) {

      let self = this;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(this.token ==null){
        self.rootPage = GetStartedPage;
      }else{
        self.rootPage = TabsPage;
      }
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#FFFFFF');
      splashScreen.hide();
    });
  }



  loadMap() {
    this.geolocation.getCurrentPosition(this.webservice.GEOLOC_CONFIG).then((position) => {
        //this._utilityService.hideLoading();
      this.search_lat = position.coords.latitude;
      this.search_long = position.coords.longitude;
      localStorage.setItem('search_lat', this.search_lat);
      localStorage.setItem('search_long', this.search_long);
      //this.lat_lang={}
      console.log('getting location open',  position.coords.latitude, position.coords.latitude);
      
  });
}

}
