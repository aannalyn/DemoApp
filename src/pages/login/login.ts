import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authProvider: AuthProvider,
    private toast: ToastProvider,
    private loading: LoadingProvider) {
    
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  login(user: User) {

    if (this.loginForm.valid) {
      this.authProvider.signIn(user).then(() => {
        let loader = this.loading.show('Loading', 3000, { dismissOnPageChange: true }).present();
        loader.then(() => this.navCtrl.setRoot('HomePage'));
      },err => {
        this.toast.show(err.message);
      });
    } 

  }

  

}
