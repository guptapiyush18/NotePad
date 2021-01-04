import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
})
export class ErrorsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
