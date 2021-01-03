import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}

  private isAuthenticated: boolean = false;
  isAuthUpdate = new Subject<boolean>();
  token: string;
  userId: string;
  tokenTimer: any;
  setAuth(authValue) {
    this.isAuthenticated = authValue;
    this.isAuthUpdate.next(authValue);
  }
  getAuth() {
    return this.isAuthenticated;
  }

  login(emailId: string, password: string) {
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${environment.apiUrl}/auth/login`,
        {
          emailId: emailId,
          password: password,
        }
      )
      .subscribe(
        (data) => {
          if (data.token) {
            this.token = data.token;
            this.setAuth(true);
            const expiresInDuration = data.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.userId = data.userId;
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(data.token, expirationDate, this.userId);

            this.route.navigate(['/']);
          }
        },
        (error) => {
          this.setAuth(false);
        }
      );
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.setAuth(false);
    this.token = null;
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();

    this.route.navigate(['/login']);
  }

  signUp(id: string, email: string, password: string) {
    this.http
      .post(`${environment.apiUrl}/auth/signup`, {
        userId: id,
        emailId: email,
        password: password,
      })
      .subscribe((data) => {
        console.log(data);
        this.setAuth(true);
      });
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  getToken() {
    return this.token;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.setAuth(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
