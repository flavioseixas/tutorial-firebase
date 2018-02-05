import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../app/auth.service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  username = '';
  password = '';

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignUp() {

    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    this.authService.signUp(this.username, this.password)
      .then(
        data => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
      )
      .catch(
        error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signup failed',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );

  }

}
