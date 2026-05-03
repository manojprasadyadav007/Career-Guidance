import { Injectable, NgZone } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AccountStatusGuard implements CanActivate {

    constructor(private router: Router,private authService:AuthenticationService,private ngZone:NgZone) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (localStorage.getItem('currentUser')) {
        //     // logged in so return true
        //     return true;
        // }
        // if(this.authService.currentUserSubject.getValue().AccountVerificationStatus>0)
        // {
            return true;
        // }

        // not logged in so redirect to login page with the return url
        this.ngZone.run(()=> this.router.navigate(['/member/profile']));
        return false;
    }
}