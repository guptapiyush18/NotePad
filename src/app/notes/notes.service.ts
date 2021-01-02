import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './model/note.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class NotesService {
  constructor(private http: HttpClient) {}
  private note: Note[];
  private notesUpdated = new Subject<Note[]>();

  getNotes() {
    this.http
      .get<{ notes: any }>('https://note-pad-heroku.herokuapp.com/api/notes')
      .pipe(
        map((noteData) => {
          return noteData.notes.map((note) => {
            return {
              title: note.title,
              description: note.description,
              id: note._id,
            };
          });
        })
      )

      .subscribe((data) => {
        this.note = data;
        this.notesUpdated.next([...this.note]);
      });
  }
  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }
  addNote(title, desc) {
    this.http
      .post<{ messageL: string; note: any }>(
        'https://note-pad-heroku.herokuapp.com/api/notes',
        { title: title, description: desc }
      )
      .subscribe((data) => {
        console.log(data);
        this.note.unshift({
          id: data.note._id,
          title: data.note.title,
          description: data.note.descriptions,
        });
        // this.note.push({
        //   id: data.note._id,
        //   title: data.note.title,
        //   description: data.note.descriptions,
        // });
        this.notesUpdated.next([...this.note]);
      });
  }
}
