import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const produitGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  //comme ça on fait l'injection des dependences 
  const router : Router = inject(Router);
  const authService : AuthService = inject(AuthService);

  if (authService.isAdmin())
    return true;
  else
  {
    router.navigate(['app-forbidden']);
    return false;
  }
};


//ancienne version : avec implementation de "CanActivate" 
//we need to add "ProduitGuard" to providers in app.module
/*@Injectable()
export class ProduitGuard {
    constructor (private authService: AuthService,
    private router : Router) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (this.authService.isAdmin())
          return true;
        else
        {
          this.router.navigate(['app-forbidden']);
          return false;
        }
      }
}*/
