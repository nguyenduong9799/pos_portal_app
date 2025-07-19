import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isUserAuthenticated()) {
      // Check if route requires specific roles
      const requiredRoles = route.data?.['roles'] as string[];
      if (requiredRoles && requiredRoles.length > 0) {
        if (this.authService.hasAnyRole(requiredRoles)) {
          return true;
        } else {
          // User doesn't have required role, redirect to unauthorized page
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      return true;
    }

    // User is not authenticated, redirect to login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
