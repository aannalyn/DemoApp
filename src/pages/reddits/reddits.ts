import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedditProvider } from '../../providers/reddit/reddit';

@IonicPage()
@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html',
})
export class RedditsPage {
  items:any;
  options:Array<string>;
  category:string;
  limit:number;

  constructor(
    private redditProvider: RedditProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.options = [
        'Art', 'Food', 'Funny', 'Gaming', 'Music', 'News', 'Sports'
      ];
      this.category = 'Sports';
      this.limit = 10;
  }

  ionViewDidLoad() {
    this.getPosts(this.category, this.limit);
  }

  getPosts(category, limit) {
    this.redditProvider.getPosts(category, limit)
      .subscribe(res =>this.items = res['data']['children']);
  }

  viewItem(item) {
    this.navCtrl.push('RedditDetailsPage');
  }

  changeCategory() {
    this.getPosts(this.category, this.limit);     
  }

}
