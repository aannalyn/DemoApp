import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

import { UserProvider } from '../../providers/user/user';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileForm: FormGroup;
  userEmail: string;
  userID: string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private fb: FormBuilder,
    private userProvider: UserProvider,    
    private toast: ToastProvider,
    private loading: LoadingProvider) {
    
    this.createForm();

    this.userID = this.userProvider.getUserID();    
    this.userEmail = this.userProvider.getUserEmail();
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])]
    });
  }

  updateProfile(user: User) {
    user['key'] = this.userID;
    
    if (this.profileForm.valid) {
      this.userProvider.addUser(user).then(res => {
        console.log(res);
      
      },err => {
        this.toast.show(err.message);
      });
    }
  }

}
