import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuestionsProvider } from '../../providers/questions/questions';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('slides') slides: any;

  questions: any;
  correct: any = [];
  answerQ: any = [];

  hasAnswered: boolean = false;
  score: number = 0;
  answerN: number = 0;
  slideOptions: any;

  userId: any;
  testId: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private questionProvider: QuestionsProvider) {

  }

  ionViewDidLoad() {
    this.testId = this.navParams.get('testId');
    this.userId = this.navParams.get('userId');
    this.questions = this.navParams.get('questions');

    for (let i of this.questions) {
      for (let j of i.answers) {
        if (j.correct) {
          this.correct.push(j.answer);
          this.answerN++;
        }
      }
    }
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {
    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct) {
      this.score++;
    }
    this.answerQ.push(answer.correct);

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }

  saveQuiz() {
    this.questionProvider.saveAnswer(
      this.userId,
      this.testId,
      this.answerQ,
      Math.round(this.score/this.answerN*100));

    this.navCtrl.setRoot(HomePage);
  }

  randomizeAnswers(rawAnswers: any[]): any[] {
    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }
    return rawAnswers;
  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }


}
