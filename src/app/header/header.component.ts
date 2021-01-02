import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService,private route: Router) {}
  isLoggedIn: boolean;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.getAuth();
    this.authService.isAuthUpdate.subscribe(
      (value) => (this.isLoggedIn = value)
    );
  }
  onLogOut() {

      this.authService.setAuth(false);
      this.route.navigate(['/login']);
  }
}
