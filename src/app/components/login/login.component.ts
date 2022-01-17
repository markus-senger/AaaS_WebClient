import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private auth: AuthenticationService, private dialogRef: MatDialogRef<LoginComponent>, private oauthService: OAuthService) { }

    login(): void {
        this.auth.login();
    }

}
