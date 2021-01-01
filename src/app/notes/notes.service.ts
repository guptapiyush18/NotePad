import { Injectable } from '@angular/core';
import { Note } from './model/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private note: Note[] = [
    {
      title: 'First Title',
      description: 'Example Discription 1 for checking expansion',
    },
    {
      title: 'Second Title',
      description: 'Example Discription 2 for checking expansion',
    },
  ];

  getNotes() {
    return this.note.slice();
  }

  addNote(note: Note) {
    this.note.push(note);
  }
}
