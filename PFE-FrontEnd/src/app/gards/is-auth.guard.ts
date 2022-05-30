import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isLoggedIn = this.authService.isLoggedIn();

    if (!localStorage.getItem('jwt')==null) {
      this.router.navigate(['/login']);
      console.log("yeesssssssssssssssssssssssssssssss nourrrrr !!!!!!!!!")
      return false;
    }else{
      return true;
    }
    
  }
  
}
