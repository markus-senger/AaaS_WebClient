import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAppGuard implements CanActivate {

    constructor(protected auth: AuthenticationService, public dialog: MatDialog) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(!this.auth.isLoggedIn()) {
            this.dialog.open(LoginComponent, { disableClose: true});
            return false;
        }

        return true;
    }
  
}
