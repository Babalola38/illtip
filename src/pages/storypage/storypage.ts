  import { Component , ViewChild, } from '@angular/core';
  import { IonicPage, ModalController, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
  // import { AppService } from '../../services/app.service';
  // import { UtilityService } from '../../services/utility.service';
  // import { CONFIG } from '../../config';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { UserprofilePage } from '../userprofile/userprofile';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { FriendforsharePage } from '../friendforshare/friendforshare';
  

  @Component({
    selector: 'page-storypage',
    templateUrl: 'storypage.html',
    // providers: [AppService,UtilityService]
  })
  export class StorypagePage {

  @ViewChild(Slides) slides: Slides;
  storyImage:any;
  storylist=[];
  currentIndex:any;
  sliderIndex: number;
  url:any
  video:any;
  image:any;
  addclass:boolean;
  preVideo :any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  paginationaaa:any={};
  press:boolean=false;
  stopvideos:any;
  showbutton:boolean=true;
  stortlenth:any;
  storycomment:any;
  count =0


  listStory:any;

  storyWoner:any;
  type=[];
  ownerimage:any;
  public show_dialog : boolean = false;
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      // private _appService: AppService, 
      // private _utilityService: UtilityService,
      private webservice:WebserviceProvider,
      public modalCtrl: ModalController) {
        this.storyImage=this.navParams.get('storydata');
        this.storylist =this.navParams.get('storylist')
        console.log(this.storyImage);

        this.url=webservice.apiUrl+'uploads/users/';
        console.log("window.screen.height=",window.screen.height);
        
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad StorypagePage');
      this.getstoryList();
      this.slides.autoplayDisableOnInteraction = false;
      this.slides.loop = false;
      this.slides.autoplay = false;
      
      if(this.storyImage.story.storyType=="video"){
        this.video=document.getElementById('video_'+this.storyImage.story._id);
        // this.video.play();
      }
      this.view(this.storyImage.story._id);
      
    }
    ionViewWillEnter() {
      this.showbutton=true;
    }
    getstoryList(){
      //this._utilityService.showLoading();
        //console.log(this.page);
        this.webservice.getData('story/storyList/'+'?token='+ this.token).then((response:any) => {
          console.log('story',response)
          // this.storyList=response.data;
          // console.log("this.storyList=",this.storyList);

          for (var j = 0; j < response.data.length; j++) {
            let obj = {...response.data[j]};
            
            if(String(response.data[j]._id.profilePicture).includes('.jpg') || String(response.data[j]._id.profilePicture).includes('.png') || String(response.data[j]._id.profilePicture).includes('.JPEG')) {
              obj.imagetype = "file"
    
            } else {
              obj.imagetype = "base64"
            }
          
          this.storylist.push(obj)
          console.log("this.storyList=",this.storylist);
          // this.webservice.hideLoader();
          this.storyWoner = this.storylist[1]._id.fullName;
          console.log("this.storyWoner=",this.storyWoner);
          this.type = this.storylist[1].imagetype;
          console.log("this.type=",this.type);
          this.ownerimage = this.storylist[1]._id.profilePicture;
          console.log("this.ownerimage=",this.ownerimage);

          } 
          
          this.storylist.forEach(element => {
            this.paginationaaa=element.story.length;
            console.log(element)
          });
        })
    }

    dismiss(){
      // this.viewCtrl.dismiss();
      this.navCtrl.setRoot(HomePage)
    }

    pressEvent(){
      console.log('loh');
      this.press=true;
      //this.slides.stopAutoplay();
    }
    touchend(){
      console.log('loh1');
      this.press=false;
      this.slides.slideNext();
      //this.slides.startAutoplay();
    }

    slideChanged(stories) {
      this.show_dialog=false
      this.sliderIndex=0;
      // var e
    this.currentIndex = this.slides.getActiveIndex();

      stories.story.forEach(element => {
        this.video = document.getElementById('video_'+element._id);
          this.image = document.getElementById('image_'+element._id);
        if(this.currentIndex == this.sliderIndex){
          
          if(element.storyType=="video" && this.video !=null && this.image ==null ){
              console.log(this.video ,this.image);
              this.showbutton=true;
          }else if(element.storyType=="image" && this.video ==null && this.image !=null){
            console.log(this.video ,this.image)
            setTimeout(()=>{
              if(this.press==false){
                //this.slides.slideNext();
              }else{

              }
            
            },5000)
          }else{
            this.video.muted = true;
          }
          this.view(element._id);
          
        }
        this.sliderIndex++;
      });
      
      
    }

  
    next(type,id){
      this.storycomment ="";

      console.log(id)
    
      this.video = document.getElementById('video_'+id);
          this.image = document.getElementById('image_'+id);
          if(type=='video'&& this.video !=null && this.image ==null){
            this.video.muted = true;
            //this.video.pause()
            this.slides.slideNext();
          }else if(type=='image'&& this.video ==null && this.image !=null){
            this.slides.slideNext();
          }
    }

    prev(type,id,e){
      this.storycomment ="";
      console.log(e)
      this.video = document.getElementById('video_'+id);
          this.image = document.getElementById('image_'+id);
          if(type=='video'&& this.video !=null && this.image ==null){
            this.video.muted = true;
            //this.video.pause()
            this.slides.slidePrev();
          }else if(type=='image'&& this.video ==null && this.image !=null){
            this.slides.slidePrev();
          }
    }
    
    changeing(e,story){
      this.storycomment ="";

      console.log(story)
      this.video = document.getElementById('video_'+story._id);
      this.image = document.getElementById('image_'+story._id);
      if (e.direction == 2) {
        if(story.storyType=='video'&& this.video !=null && this.image ==null){
          this.video.muted = true;
          //this.video.pause()
          
        }else if(story.storyType=='image'&& this.video ==null && this.image !=null){
          //this.slides.slidePrev();
        }
      }else if(e.direction == 4){
        if(story.storyType=='video'&& this.video !=null && this.image ==null){
          this.video.muted = true;
          //this.video.pause()
          
        }else if(story.storyType=='image'&& this.video ==null && this.image !=null){
          //this.slides.slidePrev();
        }
      }
    }
    swipeEvent(e){
      // var count =0
      console.log(e)
      if (e.direction == 2) {
        
        this.storyImage.i++
        this.count =this.storyImage.i
    }
  }

  reactionDiv(){
    console.log('rrr')
    this.show_dialog = !this.show_dialog;
  }

  //// REACTION ///
  reaction(type,id){
    console.log(type,id)
    let data={
      "reaction":type
    }
    if(type=='lovethree'){
      //fab.close();

    // document.getElementById('addd_'+id).classList.add('wow');
    document.getElementById('addd_'+id).classList.add('lovethree');
    document.getElementById('addd_'+id).classList.remove('like');
    document.getElementById('addd_'+id).classList.remove('happythree');
    document.getElementById('addd_'+id).classList.remove('happyone');
    document.getElementById('addd_'+id).classList.remove('happytwo');
    document.getElementById('addd_'+id).classList.remove('lovetwo');
    document.getElementById('addd_'+id).classList.remove('haha');
    document.getElementById('addd_'+id).classList.remove('liketwo');
    document.getElementById('addd_'+id).classList.remove('eyegalss');
    //fab.close();
    this.show_dialog=false
    }
    else if(type=='like'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('like');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }
    else if(type=='happyone'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('happyone');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }
    else if(type=='happytwo'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('happytwo');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }
    else if(type=='lovetwo'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('lovetwo');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }
    else if(type=='happythree'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('happythree');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }else if(type=='haha'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('haha');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }else if(type=='liketwo'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('liketwo');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('eyegalss');
      this.show_dialog=false
    }else if(type=='eyegalss'){
      //fab.close();
      document.getElementById('addd_'+id).classList.add('eyegalss');
      document.getElementById('addd_'+id).classList.remove('lovethree');
      document.getElementById('addd_'+id).classList.remove('happytwo');
      document.getElementById('addd_'+id).classList.remove('happyone');
      document.getElementById('addd_'+id).classList.remove('like');
      document.getElementById('addd_'+id).classList.remove('lovetwo');
      document.getElementById('addd_'+id).classList.remove('happythree');
      document.getElementById('addd_'+id).classList.remove('haha');
      document.getElementById('addd_'+id).classList.remove('liketwo');
      this.show_dialog=false
    }
    
  
    this.webservice.postData('story/reactStory/'+id+'?token='+ this.token,data).then((response:any) => {
      console.log('reaction',response)
    })
  }
  sendcomment(id){
    let data ={
      "comment" :this.storycomment
    }
    this.webservice.postData('story/commentStory/'+id+'?token='+ this.token,data).then((response:any) => {
      console.log('commewnt',response)
      this.storycomment ="";
      this.webservice.presentToast('Sent')
    })
  }
  view(id){  
    let data={
      "reaction":""
    }
    this.webservice.postData('story/reactStory/'+id+'?token='+ this.token,data).then((response:any) => {
      console.log('reaction',response)
      // this.getstoryList()
    })
  }
  playideo(id){
    console.log(id);
    
    this.showbutton = false;
    this.stopvideos=document.getElementById('video_'+id);
    console.log(this.stopvideos);
    this.stopvideos.muted = false
  }

  stopvideo(id){
    console.log(id);

    this.showbutton = true;
    this.stopvideos=document.getElementById('video_'+id);
    console.log(this.stopvideos);
    this.stopvideos.muted = true
  }
  videoEnd(id){
    if(this.press==false){
      setTimeout(()=>{
        console.log('hii')
        this.slides.slideNext();
      },2000)
      
    }else{

    }
  }

  otherProfile(Story) {
    console.log("come=",Story);
    let story:any = Story._id;

    let videos = document.getElementsByClassName("videocont") 
    console.log(videos);

    for (var i = 0; i < videos.length; i++) {
      this.video=document.getElementById(videos[i].id)
      console.log(this.video)
      this.video.muted=true;
      }

      if(this.token==null){
        let data={
          'userid':story._id,
          'fullName':story.fullName
        }
        this.navCtrl.push(UserprofilePage,{'data':data}) 
        }else{
        if(story._id==this.userid){
        this.navCtrl.push(ProfilePage)
        }else{
          let data={
            'userid':story._id,
            'fullName':story.fullName
          }
          this.navCtrl.push(UserprofilePage,{'data':data}) 
        }
        }


    // let data={
    //   'userid':story._id,
    //   'fullName':story.fullName
    //   }

    //   console.log("data=",data);

    //   this.navCtrl.push(UserprofilePage,{'data':data}) 
  }

  // otherProfile(id,fullName){
  //   console.log("id,fullName=",id,fullName);
    
  // let videos = document.getElementsByClassName("videocont")
  // console.log(videos)
  // for (var i = 0; i < videos.length; i++) {
  // this.video=document.getElementById(videos[i].id)
  // console.log(this.video)
  // this.video.muted=true;
  // }
  //   console.log('hi')
  //   if(this.token==null){
  //   let data={
  //   'userid':id,
  //   'fullName':fullName
  //   }
  //   this.navCtrl.setRoot(UserprofilePage,{'data':data}) 
  //   }else{
  //   if(id==this.userid){
  //   this.navCtrl.setRoot(ProfilePage)
  //   }else{
  //   let data={
  //   'userid':id,
  //   'fullName':fullName
  //   }
  //   this.navCtrl.setRoot(UserprofilePage,{'data':data}) 
  //   }
  //   }
  //   }

    swipeEventN(e){
      console.log(e)
     if(e.direction==8){
       this.dismiss()
     }
    }

    swipeEventleft(e,i){
      console.log(e)
      if(e.direction==2){
          
          if(this.storyImage.i==i){
            this.storyImage.i++
           this.getstoryList()
           console.log("story",this.storyImage.i)
          }
      }
    }



    shareStory(images,sharetypes){
      let data={
        'photopath':images,
        'sharetypes':sharetypes
      }
      this.navCtrl.push(FriendforsharePage,{'data':data})
    }

  }
