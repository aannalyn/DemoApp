import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  
  user = {} as User;
  signUpForm: FormGroup;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private fb: FormBuilder,
    private authProvider: AuthProvider,
    private toast: ToastProvider,
    private loading: LoadingProvider) {
    
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  signUp(user: User) {
    
    if (this.signUpForm.valid) {
      this.authProvider.signUp(user).then(res => {
        let loader = this.loading.show('Loading', 3000).present();
        loader.then(() => this.navCtrl.setRoot('LoginPage'));
      },err => {
        this.toast.show(err.message);
      });

    }
  }

}
