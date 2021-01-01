import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) {
    if (!this.authService.getAuth()) {
    console.log(this.authService.getAuth());

      return this.route.createUrlTree(['/login'])
    }
    else {
      return true;
    }
  }
}
