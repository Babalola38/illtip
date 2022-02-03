import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RequestServicePage } from '../request-service/request-service';
import { ServicesListPage } from '../services-list/services-list';
import { HttpHeaders } from '@angular/common/http';
import { WebserviceProvider } from '../../providers/webservice/webservice';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  interval:any;

  tab1Root = HomePage;
  tab2Root = ServicesListPage;
  tab3Root = ContactPage;
  tab4Root = RequestServicePage;
  unreadcount : any = 0;
  public token = localStorage.getItem('access-token-illTip');
  constructor(private webservice: WebserviceProvider) {

  }
  ionViewDidEnter() {
  //   let headers = new HttpHeaders();   
  //   headers = headers.set('Authorization', this.token) ;
  // this.webservice.getApi(this.webservice.chat_apiUrl + 'singleChat/getTotalUnreadChat/',headers).then((response:any) => {
  //   console.log("get total unread chat ",response.data.count);
  //    this.unreadcount = response.data.count
  // });

  // this.Unreadcount();

  // setInterval(function(){ 
  //   console.log("print again");
  //   this.Unreadcount();
  // }, 3000);

  // this.interval = setInterval(this.Unreadcount(), 100);
  this.Unreadcount();

  // this.interval= setInterval(()=> { this.Unreadcount() }, 1000);

  
  }

  Unreadcount() : any {
    console.log("come again");
    
    let headers = new HttpHeaders();   
    headers = headers.set('Authorization', this.token) ;
  this.webservice.getApi(this.webservice.chat_apiUrl + 'singleChat/getTotalUnreadChat/',headers).then((response:any) => {
    console.log("get total unread chat ",response.data.count);
     this.unreadcount = response.data.count
  });
  }
}
