import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlocklistPage } from './blocklist';

@NgModule({
  declarations: [
    BlocklistPage,
  ],
  imports: [
    IonicPageModule.forChild(BlocklistPage),
  ],
})
export class BlocklistPageModule {}
