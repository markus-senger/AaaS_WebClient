import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LogMessageListItemComponent } from './components/lists/logMessage/log-message-list-item/log-message-list-item.component';
import { LogMessageListComponent } from './components/lists/logMessage/log-message-list/log-message-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CounterListComponent } from './components/lists/counter/counter-list/counter-list.component';
import { MeasurementListComponent } from './components/lists/measurement/measurement-list/measurement-list.component';
import { TimeIntervalListComponent } from './components/lists/timeInterval/time-interval-list/time-interval-list.component';
import { LogMessageListItemDetailComponent } from './components/lists/logMessage/log-message-list-item-detail/log-message-list-item-detail.component';
import { ConnectingErrorComponent } from './components/errors/connecting-error/connecting-error.component';

const routes: Routes = [
  {
   path: '',
   redirectTo: 'home',
   pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
   path: 'logMessages',
   component: LogMessageListComponent
  },
  {
    path: 'logMessages/:dataID/:entryID',
    component: LogMessageListItemDetailComponent
  },
  {
    path: 'counter',
    component: CounterListComponent
  },
  {
    path: 'measurement',
    component: MeasurementListComponent
  },
  {
    path: 'timeInterval',
    component: TimeIntervalListComponent
  }
 ];

@NgModule({
  declarations: [
    AppComponent,
    LogMessageListComponent,
    LogMessageListItemComponent,
    SidebarComponent,
    HomeComponent,
    CounterListComponent,
    MeasurementListComponent,
    TimeIntervalListComponent,
    LogMessageListItemDetailComponent,
    ConnectingErrorComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
