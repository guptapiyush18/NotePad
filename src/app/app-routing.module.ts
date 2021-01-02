import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { ListNotesComponent } from './notes/list-notes/list-notes.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'notes/list' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'notes',
    canActivate: [AuthGuard],
    component: NotesComponent,
    children: [
      { path: 'create', component: CreateNoteComponent },
      { path: 'list', component: ListNotesComponent },
    ],
  },
  { path: '**', redirectTo: 'notes/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
