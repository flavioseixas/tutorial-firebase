import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../app/auth.service';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username = '';
  password = '';

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  signIn() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authService.signIn(this.username, this.password)
      .then(authState => {
        loading.dismiss();
        console.log("login-then", authState);
        this.navCtrl.setRoot(HomePage);
    })
      .catch(error => {
        loading.dismiss();
        console.log(error);
        const alert = this.alertCtrl.create({
          title: 'Signin failed.',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
    });

    console.log(this.username + ' ' + this.password);
  }

  signUp() {
    this.navCtrl.setRoot(SignupPage);
  }
}
