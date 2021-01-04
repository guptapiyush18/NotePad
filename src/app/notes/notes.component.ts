import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { NotesService } from "./notes.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService,
    private noteService: NotesService
  ) {}
  links = ['Create', 'List'];
  activeLink = this.links[0];
  isAuth: boolean = false;
  subscription: Subscription;
  listsubscription: Subscription;

  listCount;

  setRoute(link) {
    this.activeLink = link;
    if (link === 'Create') this.route.navigate(['/notes/create']);
    else if (link === 'List') {
      this.route.navigate(['/notes/list']);
    }
  }
  ngOnInit() {
    this.listsubscription = this.noteService.getNoteUpdateListener().subscribe(data => {
      this.listCount = data?.length || 0;
    })
    this.isAuth = this.authService.getAuth();
    this.subscription = this.authService.isAuthUpdate.subscribe(
      (value) => (this.isAuth = value)
    );
    this.setRoute(this.activeLink);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
