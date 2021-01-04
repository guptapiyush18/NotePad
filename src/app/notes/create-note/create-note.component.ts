import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../model/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  note: Note;
  mode = 'create';
  noteId: string;
  constructor(
    private snackBar: MatSnackBar,
    private noteService: NotesService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  @ViewChild('formDirective', { static: false }) formGroupDirective: NgForm;
  createForm: FormGroup;

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
    const url = this.route.url;
    if (url.includes('edit')) {
      this.mode = 'edit';
      this.noteId = url.split('?')[1].split('=')[1];
      this.noteService.getNote(this.noteId).subscribe((data) => {
        this.note = {
          id: data.note._id,
          title: data.note.title,
          description: data.note.description,
        };
        this.createForm.setValue({
          title: this.note.title,
          description: this.note.description,
        });
      });
    } else {
      this.mode = 'create';
      this.note = null;
    }
  }
  onCreateNote() {
    if (this.mode === 'create') {
      this.noteService.addNote(
        this.createForm.value.title,
        this.createForm.value.description
      );

      this.snackBar.open('Note Created !!', 'X', {
        duration: 1500,
      });
    }
    else if (this.mode === 'edit') {
      this.noteService.updateNote(this.noteId, this.createForm.value.title, this.createForm.value.description)
      this.snackBar.open('Note Updated !!', 'X', {
        duration: 1500,
      });
      this.route.navigate(['/notes/list'])
    }
    this.createForm.reset();
    this.formGroupDirective.resetForm();
  }
}
