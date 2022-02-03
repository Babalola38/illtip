import { Component , ViewChild, } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides,ViewController,ModalController,ActionSheetController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';
import { StoryviewlistPage } from '../storyviewlist/storyviewlist';

@Component({
  selector: 'page-own-list',
  templateUrl: 'own-list.html',
})
export class OwnListPage {
  @ViewChild(Slides) slides: Slides;
  storyImage:any;
  storyList:any;
  stopvideos:any;
  showbutton:boolean=false;
  vvvvv:any;
currentIndex:any;
sliderIndex: number;
url='http://18.191.93.75:6018/'+'users/userThumb/';
video:any;
image:any;
addclass:boolean;
preVideo :any;
press:boolean=false;
currentvideoId:any;

vids:any;
  public token = localStorage.getItem('access-token-illTip');
  public userid=localStorage.getItem("loginuserId");
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private webservice:WebserviceProvider) {
    this.storyList=this.navParams.get('ownstoryList');
      console.log('story',this.storyList);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnListPage');
    this.getstoryList()
    this.slides.loop = false;
    this.slides.autoplay = false;
  }

  getstoryList(){
    //this._utilityService.showLoading();
      //console.log(this.page);
      this.webservice.getData('story/ownstoryList/'+'?token='+ this.token).then((response:any) => {
        console.log('story',response)
        this.storyList=response.data;
      })
  }

  dismiss(){
    this.viewCtrl.dismiss();
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
    this.sliderIndex=0;
   
   this.currentIndex = this.slides.getActiveIndex();
   console.log(this.currentIndex)
   this.storyList.forEach(element => {
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
              
            }else{
            }
           
          },5000)
        }else{
          this.video.muted = true;
        }
       
        
      }
      this.sliderIndex++;
    });
  }

  viewDetails(react,id){
    // this.stopvideo(id)
    console.log(react);
    console.log(id);
    
    this.navCtrl.push(StoryviewlistPage, {"res": react,'id':id})
  }

  playideo(id){
    this.showbutton = false;
    this.stopvideos=document.getElementById('video_'+id);
    console.log(this.stopvideos);
  this.stopvideos.muted=false
  }

  stopvideo(id){
    console.log(stop)
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
      },5000)
      
    }else{
  
    }
  }


  next(type,id){
    console.log(id)
    this.video = document.getElementById('video_'+id);
        this.image = document.getElementById('image_'+id);
        if(type=='video'&& this.video !=null && this.image ==null){
          this.video.muted = true;
          this.video.pause()
          this.slides.slideNext();
        }else if(type=='image'&& this.video ==null && this.image !=null){
          this.slides.slideNext();
        }
  }

  prev(type,id){
    console.log(id)
    this.video = document.getElementById('video_'+id);
        this.image = document.getElementById('image_'+id);
        if(type=='video'&& this.video !=null && this.image ==null){
          this.video.muted = true;
          this.video.pause()
          this.slides.slidePrev();
        }else if(type=='image'&& this.video ==null && this.image !=null){
          this.slides.slidePrev();
        }
  }

  changeing(e,story){
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
  
  //// OPEN STORY ///
  open(id,i){
    // const actionSheet = this.actionSheetCtrl.create({
    //   //title: 'Modify your album',
    //   buttons: [
    //     {
    //       text: 'Delete',
    //       handler: () => {
    //        this.deletestory(id,i)
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }
    //   ]
    // });
  
    // actionSheet.present();



    const actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.deletestory(id,i)
          }
        },{
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  

  deletestory(id,i){
    this.webservice.getData('story/deleteStory/'+id+'?token='+ this.token).then((response:any) => {
      console.log('story',response);
      if(response.success){
        this.storyList.splice(i, 1);
        this.dismiss();
      }
      
    })
  }
}
