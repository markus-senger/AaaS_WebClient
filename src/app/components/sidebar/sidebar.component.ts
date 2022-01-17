import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  projectTitle: string = "AaaS.Web";
  isSmall: Boolean = false;

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef, private auth: AuthenticationService) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)', '(max-height: 660px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.disableClose = 'false';
        this.isSmall = true;
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.disableClose = 'true';
        this.isSmall = false;
        this.sidenav.open();
      }
      this.cd.detectChanges();
    });
  }

  logout(): void {
    this.auth.logout();
  }

}
