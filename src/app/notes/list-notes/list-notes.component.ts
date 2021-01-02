import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../model/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css'],
})
export class ListNotesComponent implements OnInit {
  notes: Note[];
  subscription: Subscription;
  isLoading = false;
  constructor(private noteService: NotesService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.noteService.getNotes();
    this.noteService.getNoteUpdateListener().subscribe((data) => {
      this.isLoading = false;
      this.notes = data;
    });
  }

}
