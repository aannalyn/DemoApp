import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reddit-details',
  templateUrl: 'reddit-details.html',
})
export class RedditDetailsPage {
  
  item:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
    console.log(this.item);
  }

}
