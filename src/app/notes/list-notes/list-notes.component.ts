import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Note } from '../model/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
})
export class ListNotesComponent implements OnInit, OnDestroy {
  notes: Note[];
  subscription: Subscription;
  isLoading = false;
  constructor(private noteService: NotesService, private MatSnackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.noteService.getNotes();
    this.subscription = this.noteService
      .getNoteUpdateListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.notes = data;
      });
  }

  onDelete(note: Note) {
    this.noteService.deleteNote(note);
    this.MatSnackBar.open('Note Deleted.👍', 'X', {
      duration: 1500
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
