import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedditDetailsPage } from './reddit-details';

@NgModule({
  declarations: [
    RedditDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RedditDetailsPage),
  ],
})
export class RedditDetailsPageModule {}
