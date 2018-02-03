import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { NoteService } from '../../app/note.service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class Detail {

  note;
  notekey;

  newNoteFlag = false;
  deleteNoteFlag = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NoteService, private alertCtrl: AlertController) {
    this.note = this.navParams.get('note');
    this.notekey = this.navParams.get('notekey');   
    
    if(!this.note){
      this.note = {
        date: '', 
        title: '',
        content: ''         
      };
      this.newNoteFlag = true;      
    }
  }

  onTrash(){
    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: `Are you sure you want to delete this note: "${this.note.title}?"`, // use back tick to insert string desc
      buttons: [
        {
          text: 'Cancel' // don't do anything when cancel   
        },
        {
          text: 'Confirm',
          handler: () => {            
            this.deleteNoteFlag = true;      
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  } 

  ionViewWillLeave() {

    if(this.note.title === "" && this.note.date === "" && this.note.content === ""){      
      // if note is blank don't do anything      
    }
    else if(this.newNoteFlag){
      console.log("add note");
      this.noteService.addItem(this.note);    
    }
    else if(this.deleteNoteFlag){
      console.log("delete note");
      this.noteService.deleteItem(this.note.key); 
    }
    else {
      console.log("edit note");
      console.log(this.note.key);
      this.noteService.updateItem(this.note.key, this.note);
    }
  }

}
