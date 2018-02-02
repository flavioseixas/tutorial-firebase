import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NoteService } from '../../app/note.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes: any;

  constructor(public navCtrl: NavController,
    private noteService: NoteService,
    private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.noteService.fetchItems().subscribe(items => {
      this.notes = items;
      console.log(this.notes);
      return items.map(item => item.key);
    },
    err => {
      console.log(err);
    });
  }

  onItemClick(note){        
    this.navCtrl. push('Detail', {
      notekey : note.key,
      note : note
    });             
  } 

  onAddClick(){    
    this.navCtrl.push('Detail'); // for add, don’t pass in any parameters.
  }
}
