import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Item } from 'ionic-angular/components/item/item';

@Injectable()
export class NoteService{    

  itemsRef: AngularFireList<any>;
  itemsObservable: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {      
  }

  fetchItems(usedId): Observable<any[]> {
    this.itemsRef = this.db.list<Item>('/notes/' + usedId);
    
    this.itemsObservable = this.itemsRef.snapshotChanges().map(actions => {
      return actions.map(action => ({
        key: action.key, ...action.payload.val()
      }));
    })

    return this.itemsObservable;
  }
  
  addItem(newText: string, usedId) {
    this.itemsRef = this.db.list<Item>('/notes/' + usedId);

    this.itemsRef.push(newText);
  }

  updateItem(key: string, newText: string, usedId) {
    this.itemsRef = this.db.list<Item>('/notes/' + usedId);

    this.itemsRef.update(key, newText);
  }

  deleteItem(key: string, usedId) {    
    this.itemsRef = this.db.list<Item>('/notes/' + usedId);

    this.itemsRef.remove(key); 
  }

}
