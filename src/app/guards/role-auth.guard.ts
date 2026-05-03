import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class RoleAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService, private ngZone: NgZone) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentRoleType = this.authService.currentUserSubject.getValue().RoleType;
        const currentRoleId = this.authService.currentUserSubject.getValue().RoleId;
        if (route.data.allowedRole && route.data.allowedRole.length) {
            if (!route.data.allowedRole.includes(currentRoleId)) {
                return false
            }
        }

        if (route.data.disallowedRole && route.data.disallowedRole.length) {
            if (route.data.disallowedRole.includes(currentRoleId)) {
                return false;
            }
        }


        if (route.data.allowedRoleType && route.data.allowedRoleType.length) {
            if (!route.data.allowedRoleType.includes(currentRoleType)) {
                return false;
            }
        }


        if (route.data.disallowedRoleType && route.data.disallowedRoleType.length) {
            if (route.data.disallowedRoleType.includes(currentRoleType)) {
                return false;
            }
        }
        return true;
    }
}
