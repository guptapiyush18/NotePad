import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './model/note.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class NotesService {
  constructor(private http: HttpClient) {}
  private note: Note[];
  private notesUpdated = new Subject<Note[]>();

  getNote(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/notes`, {
      params: {
        id: id,
      },
    });
  }
  getNotes() {
    this.http
      .get<{ notes: any }>(`${environment.apiUrl}/notes`)
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
  addNote(title: string, desc: string) {
    this.http
      .post<{ message: string; note: any }>(`${environment.apiUrl}/notes`, {
        userId: localStorage.getItem('userId'),
        title: title,
        description: desc,
      })
      .subscribe((data) => {
        console.log(data);
        this.note.push({
          id: data.note._id,
          title: data.note.title,
          description: data.note.descriptions,
        });
        this.notesUpdated.next([...this.note]);
      });
  }

  updateNote(id: string, title: string, description: string) {
    this.http
      .put<{ message: string }>(
        `${environment.apiUrl}/notes`,
        {
          userId: localStorage.getItem('userId'),
          id: id,
          title: title,
          description: description,
        },
        {
          params: {
            id: id,
          },
        }
      )
      .subscribe((response) => {
        const updatedNotes = [...this.note];
        const oldPostIndex = updatedNotes.findIndex((p) => p.id === id);
        const newNote: Note = {
          id: id,
          title: title,
          description: description,
        };
        updatedNotes[oldPostIndex] = newNote;
        this.note = updatedNotes;
        this.notesUpdated.next([...this.note]);
      });
  }

  deleteNote(note: Note) {
    this.http
      .delete(`${environment.apiUrl}/notes`, {
        params: {
          id: note.id,
        },
      })
      .subscribe((data) => {
        const updatedPosts = this.note.filter((notes) => notes.id !== note.id);
        this.note = updatedPosts;
        this.notesUpdated.next([...this.note]);
      });
  }
}
