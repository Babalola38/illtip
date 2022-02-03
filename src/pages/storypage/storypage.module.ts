import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorypagePage } from './storypage';
// import { IonicSwipeAllModule } from 'ionic-swipe-all';
// import { IonicSwipeAllModule } from 'ionic-swipe-all';

@NgModule({
  declarations: [
    StorypagePage,
  ],
  imports: [
    IonicPageModule.forChild(StorypagePage),
    // IonicSwipeAllModule
  ],
})
export class StorypagePageModule {}
