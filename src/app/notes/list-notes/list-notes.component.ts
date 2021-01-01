import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  notes: Note[];
  constructor(private noteService: NotesService) { }
  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

}
