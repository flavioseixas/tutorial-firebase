import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { DetailPage } from '../detail/detail';

import { NoteService } from '../../app/note.service';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notes;
  userId;

  constructor(public navCtrl: NavController,
    private noteService: NoteService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(authState => {
      this.userId = authState.uid;
      
      this.noteService.fetchItems(this.userId).subscribe(items => {
        this.notes = items;
        console.log(this.notes);
        return items.map(item => item.key);
      },
      err => {
        console.log(err);
      });      
    });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }
  onItemClick(note){        
    this.navCtrl. push(DetailPage, {
      notekey : note.key,
      note : note,
      userId : this.userId
    });             
  } 

  onAddClick(){    
    this.navCtrl.push(DetailPage, {
      userId : this.userId
    });
  }
}
