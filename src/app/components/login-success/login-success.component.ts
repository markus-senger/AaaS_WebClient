import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent {

    constructor(public auth: AuthenticationService, private router: Router) {
        setTimeout(() => { 
            if(!auth.isLoggedIn()) {
                router.navigate(['/clientInstance']);
            }
         }, 500);
    }

}
