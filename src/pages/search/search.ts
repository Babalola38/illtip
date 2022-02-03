import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import Masonry from 'masonry-layout';
import { UserprofilePage } from '../userprofile/userprofile';
import { ProfilePage } from '../profile/profile';
import { DetailPage } from '../detail/detail';
import { ExplorePage } from '../explore/explore';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  userSearch: string = "user";
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  searchText:any;
  page=1;
  limit =12;
  userlist=[];
  hasMoreData: any;
  UserList=[];
  servicelist=[];
  volunteerList =[];
  postlist=[];
  backtohomepage = "searchpage"
  urls='http://18.191.93.75:6018/'+'users/userThumb/'

  serviceUrl:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private webservice: WebserviceProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    this.serviceUrl= this.webservice.apiUrl+'uploads/services/';

    console.log('ionViewDidLoad SearchPage');
    this.getuser()
  }


  onSegmentChanged(event){
    
    if(event=='users'){
      console.log("change",event)
      this.userlist=[];
      this.page=1
      this.getuser();
    }else if(event=='service'){
      this.servicelist=[];
      this.page=1
      this.getservice()
      console.log(this.userSearch)
    }else if(event=='volunteer'){
      this.volunteerList=[];
      this.page=1
      this.getVolunteer()
      console.log(this.userSearch)
    }else if(event=='post'){
      this.postlist=[];
      this.page=1
      this.getpost()
      console.log(this.userSearch)
    }
    
  }


  doInfinite(infiniteScroll) {
    this.page++
    if(this.userSearch=='service'){
      console.log("data2",this.userSearch);
      
      this.getservice().then((data)=>{
        console.log("data1", data);
        infiniteScroll.complete();
        });
    }else if(this.userSearch=='volunteer'){
      console.log("data2",this.userSearch);
      
      this.getVolunteer().then((data)=>{
        console.log("data1", data);
        infiniteScroll.complete();
        });
    }else if(this.userSearch=='post'){
      console.log("data2",this.userSearch);
      
      this.getpost().then((data)=>{
        console.log("data1", data);
        infiniteScroll.complete();
        });
    }else{
      console.log("data1",this.userSearch);
      // this.page++
      this.getuser().then((data)=>{
        infiniteScroll.complete();
        });
    }

  }




  optionChange(){
    if(this.userSearch=='service'){
      this.servicelist=[];
      this.getservice()
    }else if(this.userSearch=='volunteer'){
      this.volunteerList=[];
      this.getVolunteer();
    }else if(this.userSearch=='post'){
      this.postlist=[];
      this.getpost();
    }else{
      this.UserList=[]
      let data ={
      'searchText':this.searchText
      }
    console.log(data)

      return new Promise(resolve => {
      this.webservice.postData('users/userSearch/'+'?page='+this.page+'&limit'+this.limit+'&token='+ this.token,data).then((response:any) => {
      if(response.success){ 
      if(response.data.length == 0){
        this.hasMoreData=false
        console.log("serach", response.data); 
      }else{
        this.hasMoreData = true;
          // for (var i = 0; i < response.data.length; i++) {
          // this.userlist.push(response.data[i])
          // console.log("response mypost list", response.data); 
          // }
          this.userlist = response.data;
          // this.DoUser()
          for (var j = 0; j < this.userlist.length; j++) {
            let obj = {...this.userlist[j]};
            
            if(String(this.userlist[j].profilePicture).includes('.jpg') || String(this.userlist[j].profilePicture).includes('.png') || String(this.userlist[j].profilePicture).includes('.JPEG')) {
              obj.imagetype = "file"
      
            } else {
              obj.imagetype = "base64"
            }
          this.UserList.push(obj)
          console.log("this.UserList=",this.UserList);
          } 
          resolve();
      }
      }  
      }, (error) => {
      console.log("error ts: ", error);
      })
      });
    }
      
    }
    
    onCancel(event){
      console.log(event)
      this.getuser()
      this.getservice()
      this.getVolunteer()
    
    }
    
    cancel(){
      this.page =1
      this.userlist=[];
      this.servicelist=[];
      this.volunteerList=[];
      this.postlist=[];
      this.searchText="";
      this.getuser();
      this.getservice();
      this.getVolunteer();
      this.getpost();
    }



    gotoPhoto(id,type,i,list) {
      let data = {
        'id':list._id,
        'url':list.path,
        'profile':list.userid,
        'type':list.type,
        'index':i,
        'createdAt':list.createdAt
      }
    
      this.navCtrl.push(ExplorePage,{"photolist": data})
    }


  //// GET USER ////
  getuser(){
    this.webservice.presentLoading()
    
    let data ={
      'searchText':this.searchText,
      "volunteer": false
    }
    return new Promise(resolve => {
    this.webservice.postData('users/userSearch/'+'?page='+this.page+'&limit'+this.limit+'&token='+ this.token,data).then((response:any) => {
    if(response.success){ 
      this.webservice.hideLoader();
    console.log("response mypost list", response); 
    if(response.data.length == 0){
      this.hasMoreData=false
    }else{
      this.hasMoreData = true;
      this.userlist = response.data;
      for (var j = 0; j < this.userlist.length; j++) {
        let obj = {...this.userlist[j]};
        
        if(String(this.userlist[j].profilePicture).includes('.jpg') || String(this.userlist[j].profilePicture).includes('.png') || String(this.userlist[j].profilePicture).includes('.JPEG')) {
          obj.imagetype = "file"
  
        } else {
          obj.imagetype = "base64"
        }
      this.UserList.push(obj)
      console.log("this.UserList=",this.UserList);
      } 
      // this.DoUser()
        resolve();
    }
    }  
    }, (error) => {
      this.webservice.hideLoader();

    //this._utilityService.hideLoading();
    console.log("error ts: ", error);
    })
    });
  }


  //// GET SERVICE ////
  getservice(){
    // this.webservice.presentLoading();
    let data ={
      'searchText':this.searchText
    }
    return new Promise(resolve => {
    this.webservice.postData('users/serviceSearch/'+'?page='+this.page+'&limit'+this.limit+'&token='+ this.token,data).then((response:any) => {
    if(response.success){ 
      // this.webservice.hideLoader();
    console.log("response mypost list", response); 
    if(response.data.length == 0){
      this.hasMoreData=false
    }else{
      this.hasMoreData = true;
        // for (var i = 0; i < response.data.length; i++) {
        // this.servicelist.push(response.data[i])
        // // this.webservice.hideLoader();
        // }

        for (var i = 0; i < response.data.length; i++) {
          let obj = {...response.data[i]};

          if(String(response.data[i].userid.profilePicture).includes('.jpg') || String(response.data[i].userid.profilePicture).includes('.png') || String(response.data[i].userid.profilePicture).includes('.JPEG')) {
            obj.datatype = "file"

          } else {
            obj.datatype = "base64"
          }

          this.servicelist.push(obj)
          console.log("this.servicelist=",this.servicelist);
        }

        resolve();
    }
    }  
    }, (error) => {
      // this.webservice.hideLoader();

    console.log("error ts: ", error);
    })
    });
  }


  //// GET VOLUNTEER ////
  getVolunteer(){
    // this.webservice.presentLoading();

    let data ={
      'searchText':this.searchText,
      "volunteer": true
    }
    return new Promise(resolve => {
    this.webservice.postData('users/userSearch/'+'?page='+this.page+'&limit'+this.limit+'&token='+ this.token,data).then((response:any) => {
    // this._utilityService.hideLoading();
    if(response.success){ 
      // this.webservice.hideLoader();
    console.log("response mypost list", response); 
    if(response.data.length == 0){
      this.hasMoreData=false
    }else{
      this.hasMoreData = true;
      // this.volunteerList = response.data;

      for (var j = 0; j < response.data.length; j++) {
        let obj = {...response.data[j]};
        
        if(String(response.data[j].profilePicture).includes('.jpg') || String(response.data[j].profilePicture).includes('.png') || String(response.data[j].profilePicture).includes('.JPEG')) {
          obj.imagetype = "file"

        } else {
          obj.imagetype = "base64"
        }
      this.volunteerList.push(obj)
      console.log("this.volunteerList=",this.volunteerList);
      // this.webservice.hideLoader();
      } 
        resolve();
    }
  
    }  
    }, (error) => {
      this.webservice.hideLoader();

    //this._utilityService.hideLoading();
    console.log("error ts: ", error);
    })
    });
  }

////GET POST/////
  getpost(){
    // this.webservice.presentLoading();

    let data ={
      'searchText':this.searchText,
    }
    return new Promise(resolve => {
    this.webservice.postData('users/postSearch/'+'?page='+this.page+'&limit'+this.limit+'&token='+ this.token,data).then((response:any) => {
    // this._utilityService.hideLoading();
    if(response.success){ 
      // this.webservice.hideLoader();

    console.log("response mypost post", response); 
    if(response.data.length == 0){
      this.hasMoreData=false
    }else{
      this.hasMoreData = true;
      //  setTimeout(() => {
        for (var i = 0; i < response.data.length; i++) {
        this.postlist.push(response.data[i])
        // this.webservice.hideLoader();

        setTimeout(()=>{
          console.log('post section hi hi hi hi hi')
         var elem2 = document.querySelector('.grid2');
        var msnry = new Masonry(elem2, {
        itemSelector: '.galleryVideo',
        columnWidth: 10
        });
        console.log("Kaustav");
        },1000)

        }
        resolve();
    }
   
    }  
    }, (error) => {
      // this.webservice.hideLoader();

    //this._utilityService.hideLoading();
    console.log("error ts: ", error);
    })
    });
    }


    ///// GOTO OTHER PROFILE //////
    goOtherProfile(id,fullName){
      if(this.token==null){
        let data={
        'userid':id,
        'fullName':fullName
        }
        this.navCtrl.push(UserprofilePage,{'data':data, 'back':this.backtohomepage}) 
        // this.events.publish('backtohomepage',this.backtohomepage);
    }else{
        if(id==this.userid){
        this.navCtrl.push(ProfilePage)
        // this.events.publish('backtohomepage',this.backtohomepage);
        }else{
        let data={
          'userid':id,
          'fullName':fullName
        }
        this.navCtrl.push(UserprofilePage,{'data':data, 'back':this.backtohomepage})
        // this.events.publish('backtohomepage',this.backtohomepage);
        }
    }
  }




/// SERVICE DETAILS ////
goToDetails(id,lati,long){
  console.log('id',id)
  this.navCtrl.push(DetailPage,{'id':id,'lati':lati,'long':long})
}



}
