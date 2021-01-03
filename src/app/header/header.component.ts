import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthService,private route: Router) {}
  isLoggedIn: boolean;
  subscription: Subscription;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.getAuth();
    this.subscription= this.authService.isAuthUpdate.subscribe(
      (value) => (this.isLoggedIn = value)
    );
  }
  onLogOut() {
    this.authService.logout()
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
