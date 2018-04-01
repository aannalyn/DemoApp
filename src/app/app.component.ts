import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthProvider } from '../providers/auth/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:string;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private AuthProvider: AuthProvider,
    private menuCtrl: MenuController,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'home' },      
      { title: 'Reddits', component: 'RedditsPage', icon: 'megaphone' },      
      { title: 'ToDo', component: 'ToDoPage', icon: 'list' }      
    ];

    this.afAuth.authState.subscribe(user => {
      this.rootPage = (user) ? 'HomePage' : 'LoginPage';
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.AuthProvider.signOut();

    this.menuCtrl.close();
    this.menuCtrl.enable(false, 'mainmenu');
  }
}
