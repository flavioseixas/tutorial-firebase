import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Item } from 'ionic-angular/components/item/item';

@Injectable()
export class QuestionsProvider {

  itemsRef: AngularFireList<any>;
  itemsObservable: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    public http: HttpClient) {
  }
/*
  getQuestions(): Observable<any> {
    return this.http.get('assets/data/questions.json');
  }
*/
  getQuestions(testId: string): Observable<any[]> {
    this.itemsRef = this.db.list<Item>('/data/' + testId + '/questions');
    
    this.itemsObservable = this.itemsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({
        key: action.key, ...action.payload.val()
      }));
    })

    return this.itemsObservable;
  }

  saveAnswer(userId, testId, answer, score) {
    var date = new Date();
    var dateText = '';
    dateText = dateText + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' Nota: ' + score;

    this.itemsRef = this.db.list<Item>('/results/' + testId + '/' + userId);
    this.itemsRef.set(dateText, answer);
  }

}
