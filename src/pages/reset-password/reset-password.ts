import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  user = {} as User;
  resetPasswordForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authProvider: AuthProvider,
    private toast: ToastProvider,
    private loading: LoadingProvider) {
    
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  resetPassword(user: User) {

    if (this.resetPasswordForm.valid) {
      this.authProvider.resetPassword(user).then(res => {
        console.log(res);
        let loader = this.loading.show('Loading', 3000, { dismissOnPageChange: true }).present();
        loader.then(() => this.navCtrl.setRoot('LoginPage'));
        this.toast.show('We just sent you a reset link to your email.', 5000);
      },err => {
        this.toast.show(err.message);
      });
    } 

  }

}
