import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {}
  links = ['Create', 'List'];
  activeLink = this.links[1];
  isAuth: boolean = false;
  subscription: Subscription;

  setRoute(link) {
    this.activeLink = link;
    if (link === 'Create') this.route.navigate(['/notes/create']);
    else this.route.navigate(['/notes/list']);
  }
  ngOnInit() {
    this.isAuth = this.authService.getAuth();
    this.subscription = this.authService.isAuthUpdate.subscribe(
      (value) => (this.isAuth = value)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
