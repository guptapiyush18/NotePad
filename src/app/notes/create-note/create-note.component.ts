import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../model/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private noteService: NotesService
  ) {}
  @ViewChild('formDirective', { static: false }) formGroupDirective: NgForm;
  createForm: FormGroup;
  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }
  onCreateNote() {

    this.noteService.addNote(
      this.createForm.value.title,
      this.createForm.value.description
    );

    this.snackBar.open('Note Created !!', 'X');
    this.createForm.reset();
    this.formGroupDirective.resetForm();
  }
}
