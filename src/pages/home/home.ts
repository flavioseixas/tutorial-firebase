import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { QuizPage } from '../quiz/quiz';

import { QuestionsProvider } from '../../providers/questions/questions';

import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userId;
  testId: any;

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private questionProvider: QuestionsProvider) {

  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(authState => {
      this.userId = authState.uid;
    })
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  onClickGo() {
    this.questionProvider.getQuestions(this.testId)
      .subscribe(data => {
      console.log(data);

      if (data.length === 0) {
        const alert = this.alertCtrl.create({
          title: 'Teste não encontrado',
          message: 'Verificar se você entrou com o código do teste correto.',
          buttons: ['Ok']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);
      }
      else {
        this.navCtrl.push(QuizPage, {
          userId: this.userId,
          testId: this.testId,
          questions: data 
        });
      }
    }),
    error => console.log(error);
  }

}
