import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Http, Headers, RequestOptions, Response } from '@angular/http';





/*
  Generated class for the WebserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebserviceProvider {
  // public apiUrl = "localhost:3000/";
  // public apiUrl = "http://10.11.173.95:3000/";
  public apiUrl = "http://18.191.93.75:6018/";
  // public chat_apiUrl = "http://162.243.110.92:6039/"

  // public chat_apiUrl = "http://illtipadmin.com:6039/" 
  public chat_apiUrl = "http://18.191.93.75:3001/"
  // public chat_apiUrl = "https://illtipadmin.com:3001/"




  loader: any;

  STRIPE_KEY:'pk_test_Gei5fDwmyCD2x9bPyonhfyX1'

  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public _http: Http
    ) {
    //console.log('Hello WebserviceProvider Provider');
  }

  private _errorHandler(error: Response){
    return Observable.throw(error.json() || "Server Error");
}

GEOLOC_CONFIG: { enableHighAccuracy: false, timeout: 5000, maximumAge: 3000 }

  postData(url, data) {
    console.log("data in webservice=",data);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + url, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }

  getData(url) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + url).subscribe(res => {
        resolve(res);
      }, (err) => {
      //  alert("reject err "+JSON.stringify(err))
        reject("Please check your internet connection.")
        //reject("Please check your internet connection.");
      });
    });

  }



OtherUserProfile(token,userid){
  if(token==null){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'users/userdetails30/'+userid,).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.")
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'users/userdetails30/'+userid+'/?token='+ token).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.")
      });
    });
  }
}


//   OtherUserProfile(token,userid){
//     if(token==null){
//         return this.http.get(
//             this.apiUrl + 'users/userdetails30/'+userid,
//         )
//         .map((response: Response) => response.json())
//         .catch(this._errorHandler);
//     }else{
//         return this.http.get(
//             this.apiUrl + 'users/userdetails30/'+userid+'/?token='+ token,
//         )
//         .map((response: Response) => response.json())
//         .catch(this._errorHandler);
//     }
    
// }



  chathistory(url) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(this.chat_apiUrl + url).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });

  }



  charead(url, data) {
    //console.log("data in webservice=",data);
    return new Promise((resolve, reject) => {
      this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }

  addChat(url, data) {
    //console.log("data in webservice=",data);
    return new Promise((resolve, reject) => {
      this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }

  
  otheruserProfile(url) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + url).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });

  }


  getProfileDetails(url) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + url).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });

  }


  chatDelete(url, data) {
    //console.log("data in webservice=",data);
    return new Promise((resolve, reject) => {
      this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }

  deleteData(url) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiUrl + url).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });
  }

  getGalleryData(url,data) {
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + url,data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });

  }


  otherfriendlist(userid,page,number,token,name){
    if(name==undefined){

      return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl + 'friends/otherprofilefriendlist11/'+userid+'?page='+page+'&limit='+number+'&token='+ token).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Please check your internet connection.");
        });
      });

    }else{

      return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl + 'friends/otherprofilefriendlist11/'+userid+'?page='+page+'&limit='+number+'&token='+ token+'&name='+ name).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Please check your internet connection.");
        });
      });

    }
    
}


  ///// VIEW IMAGE COUNT ////
viewCount(token,galleryId){

  // return this.http.get(this.apiUrl + 'users/createView/'+galleryId + "/" + token,)
  // .map((response: Response) => response.json())
  // .catch(this._errorHandler);


  return new Promise((resolve, reject) => {
    this.http.get(this.apiUrl + 'users/createView/'+galleryId + "/" + token,).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
  
}


  ///// Internam share with friends ///
imageprocessing(id,token){
  //console.log('chat read',id)
  return new Promise((resolve, reject) => {
    this.http.get(this.apiUrl + 'users/convertVideo/'+id+'?token='+ token,).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
//   //console.log('chat read',id)
//   return this._http.get(
//     this.apiUrl + 'users/convertVideo/'+id+'?token='+ token,
      
//   )
//   .map((response: Response) => response.json()
// )
//   .catch(this._errorHandler);
}








basicserach(token,page,limit){
  // //console.log(lat,long)
  if(token==null||token==undefined){
      return this.http.get(
        this.apiUrl + 'users/searchbase10/'+'?page='+page+'&limit='+limit,
          //CONFIG.API_ENDPOINT + 'users/searchbase/'+'?lat='+lat+'&long='+long+'&token='+ token,
      )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);  
  }else{
      return this.http.get(
        this.apiUrl + 'users/searchbase10/'+'?page='+page+'&limit='+limit+'&token='+ token,
          //CONFIG.API_ENDPOINT + 'users/searchbase/'+'?lat='+lat+'&long='+long+'&token='+ token,
      )
      .map((response: Response) => response.json())
      .catch(this._errorHandler); 
  }

}


//   ///// GET CATEGORY LIST ////

// getcategoryList(url) {
  // if(token==null){
    
  // }else{

  // }
// }

// getcategoryList(token,lat,long){
//   if(token==null){
//     //console.log("cat list data if=",token,lat,long);
    
//       return this.http.get(
//         this.apiUrl + 'services/categorylist10/'+'?lat='+lat+'&long='+long,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler);
//   }else{
//     //console.log("cat list data else=",token,lat,long);
//       return this.http.get(
//         this.apiUrl + 'services/categorylist10/'+'?lat='+lat+'&long='+long+'&token='+ token,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler);
//   }
  
// }


  // getNotification(url,user_id) {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.apiUrl + url).subscribe(res => {
  //       resolve(res);
  //     }, (err) => {
  //       reject("Please check your internet connection.");
  //     });
  //   });

  // }

  presentLoading() {
    // //console.log("loaderopen");
    
    // this.loader = this.loadingCtrl.create({
    //   // content: "Please wait...",
    //   spinner: 'hide',
    //   content: `<img src="../../assets/imgs/loading.gif" />`,
    //   // duration: 5000
    //   // content: message
    // });
    // this.loader.present();

    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loader.present();
  
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  hideLoader(){
    this.loader.dismiss();
  }


  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


//   messageList(data){
//     //console.log('chat read',data)
//     return this._http.post(
//         CONFIG.CHAT_ENDPOINT + 'api/chatListUser/',
//         data 
//     )
//     .map((response: Response) => response.json()
// )
//     .catch(this._errorHandler);
// }







markcomplete(token,serviceId){
  return this._http.get(this.apiUrl + 'services/completeservice/'+serviceId+'?token='+ token,)
  .map((response: Response) => response.json())
  .catch(this._errorHandler);  
}


messageList(url, data) {
  //console.log("data in webservice=",data);
  return new Promise((resolve, reject) => {
    this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      reject("Please check your internet connection.");
    });
  });
}


RecentChatUserList(url,data){ 
  let headers = new Headers({Authorization: localStorage.getItem('access-token-illTip')});
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
 
let options = new RequestOptions({ headers: headers });
let URL = this.chat_apiUrl + url+"?search_key="+data.search_key;

return this._http.get(URL,options)
.map((response: Response) => response.json());

}


putGroupImage(url,data) { 
  console.log("url=",url)
  console.log("data=",data)

  let headers = new Headers({Authorization: localStorage.getItem('access-token-illTip')});
  // headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  let URL = url;

return this._http.put(URL,data,options)
.map((response: Response) => response.json());

  // return new Promise((resolve, reject) => {
  //   this.http.put(url, data, {headers: headers}).subscribe(res => {
  //     resolve(res);
  //   }, (err) => {
  //     alert("err is "+JSON.stringify(err))
  //     reject("Please check your internet connection.");
  //   });
  // });
}



// CreateGroup(url, data) {
//   //console.log("data in webservice=",data);
//   return new Promise((resolve, reject) => {
//     this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
//       resolve(res);
//     }, (err) => {
//       //console.log("error in web server=",err);
//       reject("Please check your internet connection.");
//     });
//   });
// }





// OtheruserProfile(token,userid){
//   if(token==null){
//       return this._http.get(
//           CONFIG.API_ENDPOINT + 'users/userdetails30/'+userid,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler);
//   }else{
//       return this._http.get(
//           CONFIG.API_ENDPOINT + 'users/userdetails30/'+userid+'/?token='+ token,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler);
//   }
  
// }

OtheruserProfile(token,userid){
  // //console.log(lat,long)
  if(token==null){  
      return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl + 'users/userdetails30/'+userid,).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Please check your internet connection.");
        });
      });
  }else{
      return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl + 'users/userdetails30/'+userid+'/?token='+ token,).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Please check your internet connection.=");
        });
      });
  }

}

// OtheruserProfile(token,userid){
//   // //console.log(lat,long)
//   if(token==null){
//       return this.http.get(
//         this.apiUrl + 'users/userdetails30/'+userid,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler);  
//   }else{
//       return this.http.get(
//         this.apiUrl + 'users/userdetails30/'+userid+'/?token='+ token,
//       )
//       .map((response: Response) => response.json())
//       .catch(this._errorHandler); 
//   }

// }


CreateGroup(url, data) {
  //console.log("data in webservice=",data);
  return new Promise((resolve, reject) => {
    this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      reject("Please check your internet connection.");
    });
  });
}

getGroupChata(url,id) {
      //console.log("url=",url)
      return new Promise((resolve, reject) => {
        this.http.get(this.chat_apiUrl + url +'?userId='+id).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Please check your internet connection.");
        });
      });
}


GroupUser(url, id) {
  return new Promise((resolve, reject) => {
    this.http.get(this.chat_apiUrl + url +'?id='+id).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
}

RemoveGroupUser(url, data) {
  return new Promise((resolve, reject) => {
    this.http.get(this.chat_apiUrl + url +'?groupId='+data.groupId+'&userId='+ data.userId,).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
}

groupMessageDetails(url, id, timezone) {
  return new Promise((resolve, reject) => {
    this.http.get(this.chat_apiUrl + url +'?groupId='+id+'&timezone='+timezone).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
}


// sendGroupMessage(url, data) {
//   //console.log("data in webservice=",data);
//   return new Promise((resolve, reject) => {
//     this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
//       resolve(res);
//     }, (err) => {
//       //console.log("error in web server=",err);
//       reject("Please check your internet connection.");
//     });
//   });
// }


sendGroupMessage(url, data) {
  //console.log("data in webservice=",data);
  return new Promise((resolve, reject) => {
    this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      // reject("Please check your internet connection.");
      reject(JSON.stringify(err))
    });
  });
}





delmywork(token,data) {
  //console.log("data in webservice=",data);
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl +  'services/deleteworks/'+'?token='+ token, data).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      // reject("Please check your internet connection.");
      reject(JSON.stringify(err))
    });
  });
}


// sendGroupMessage(url, data){
//           let headers = new Headers({  
//             'Content-Type': 'application/form-data'   
//           }); 
//         let options = new RequestOptions({ headers: headers });
//         let URL = this.chat_apiUrl + url;
//         let body = new URLSearchParams(data).toString();


//         return this.http.post(URL,body,options)
//           .map((response: Response) => response.json());
//         }




deleteGroup(url,groupId) {
  //console.log("url=",url)
  return new Promise((resolve, reject) => {
    this.http.delete(this.chat_apiUrl + url + '?groupId='+groupId).subscribe(res => {
      resolve(res);
    }, (err) => {
      reject("Please check your internet connection.");
    });
  });
}

delChatUserApi(url,headers) { 
  //console.log("url=",url)
  return new Promise((resolve, reject) => {
    this.http.delete(url, {headers: headers}).subscribe(res => {
      resolve(res);
    }, (err) => {
      alert("err is "+JSON.stringify(err))
      reject("Please check your internet connection.");
    });
  });
}


AddGroupUser(url, data) {
  //console.log("data in webservice=",data);
  return new Promise((resolve, reject) => {
    this.http.post(this.chat_apiUrl + url, data).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      reject("Please check your internet connection.");
    });
  });
}

  
postApi(url,data,headers) {
  return new Promise((resolve, reject) => {
    this.http.post(url, data, {headers: headers}).subscribe(res => {
      resolve(res);
    }, (err) => {
      //console.log("error in web server=",err);
      // reject("Please check your internet connection.");
      reject(JSON.stringify(err))
    });
  });
}

getApi(url,headers) { 
    //console.log("url=",url)
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: headers}).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });
  }

  
putApi(url,data,headers) { 
  console.log("url=",url)
  console.log("data=",data)
  console.log("headers=",headers)

  return new Promise((resolve, reject) => {
    this.http.put(url, data, {headers: headers}).subscribe(res => {
      resolve(res);
    }, (err) => {
      alert("err is "+JSON.stringify(err))
      reject("Please check your internet connection.");
    });
  });
}

delApi(url,headers) { 
  //console.log("url=",url)
  return new Promise((resolve, reject) => {
    this.http.delete(url, {headers: headers}).subscribe(res => {
      resolve(res);
    }, (err) => {
      alert("err is "+JSON.stringify(err))
      reject("Please check your internet connection.");
    });
  });
}

   ratingList(token,data) {
    console.log("data in webservice=",data);
    if(token==null){
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'users/rating-list10/', data).subscribe(res => {
          resolve(res);
        }, (err) => {
          //console.log("error in web server=",err);
          reject("Please check your internet connection.");
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'users/rating-list10/'+'?token='+ token, data).subscribe(res => {
          resolve(res);
        }, (err) => {
          //console.log("error in web server=",err);
          reject("Please check your internet connection.");
        });
      });
    }

  }

  
  /* Function is use for file upload
   */
  // public fileUploadX(mediaData: any, fileInfo: any, fileType: string = ''): Observable<any> {
  //   let fileName: string = fileType == 'video' ? 'any.mp4' : 'any.jpg';
  //   let mimeType: string = fileType == 'video' ? 'video/mp4' : 'image/jpeg';
  //   let apiName: string = fileInfo.api_name;
  //   delete fileInfo.api_name;

  //   let uploadOptions: FileUploadOptions = {
  //     fileKey: 'upload'
  //     , fileName: fileName
  //     , mimeType: mimeType
  //     , httpMethod: "POST"
  //     , chunkedMode: false
  //     , params: fileInfo
  //   }

  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   return Observable.create(observer => {
  //     fileTransfer.upload(mediaData, this.BASE_URL + apiName, uploadOptions).then((data: any) => {
  //       observer.next(data.response);
  //       observer.complete();
  //     }, (err) => {
  //       observer.error(err);
  //       alert("Upload Image Err " + JSON.stringify(err));
  //     });
  //   });
  // }

  removefrnd(token,data) {
    //console.log("data in webservice=",data);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'friends/unfriend'+'?token='+token, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }

  paymenthistory(token) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'users/paypal_payment_history/'+'?token='+ token,).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject("Please check your internet connection.");
      });
    });
  }  


///////Block User///////////
  blocklist(token) {
    //console.log("data in webservice=",data);
    let data=""
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/getblocklist/'+'?token='+ token, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }




  ///// unblock user ////
  unblockuser(data,token) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/permanentunblock/'+'?token='+ token, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        //console.log("error in web server=",err);
        reject("Please check your internet connection.");
      });
    });
  }


}
