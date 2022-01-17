import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private oauthService: OAuthService) { }

    login(): boolean {
        this.oauthService.initCodeFlow();
        return true;
    }

    logout(): boolean {
        this.oauthService.logOut();
        return true;
    }

    isLoggedIn() {
        return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    }

}
