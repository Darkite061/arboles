import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private authService:AuthService, private router: Router){}

    canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> | UrlTree {
        if (this.authService.isAutenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}