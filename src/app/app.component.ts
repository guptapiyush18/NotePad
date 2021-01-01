import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  subscription: Subscription;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isAuth = this.authService.getAuth();
    this.subscription = this.authService.isAuthUpdate.subscribe(
      (value) => (this.isAuth = value)
    );
  }

  links = ['Create', 'List'];
  activeLink = this.links[1];

  setRoute(link) {
    this.activeLink = link;
    if (link === 'Create') this.route.navigate(['/notes/create']);
    else this.route.navigate(['/notes/list']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
