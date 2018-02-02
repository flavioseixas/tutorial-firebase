import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Item } from 'ionic-angular/components/item/item';

@Injectable()
export class NoteService{    

  itemsRef: AngularFireList<any>;
  itemsObservable: Observable<any[]>;

  constructor(private storage : Storage,
    private db: AngularFireDatabase) {      
      this.itemsRef = db.list<Item>('/notes/');
      this.itemsObservable = this.itemsRef.snapshotChanges().map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val() }));
    })
  }

  fetchItems(): Observable<any[]> {   
    return this.itemsObservable;
  }
  
  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }

  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, newText);
  }

  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

}
