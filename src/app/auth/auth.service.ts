import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated: boolean = false;
  isAuthUpdate = new Subject<boolean>();
  setAuth(authValue) {
    this.isAuthenticated = authValue;
    this.isAuthUpdate.next(authValue);
  }
  getAuth() {
    return this.isAuthenticated;
  }
}
