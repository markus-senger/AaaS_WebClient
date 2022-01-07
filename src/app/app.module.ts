import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

import { LogMessageListItemComponent } from './components/lists/logMessage/log-message-list-item/log-message-list-item.component';
import { LogMessageListComponent } from './components/lists/logMessage/log-message-list/log-message-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { CounterListComponent } from './components/lists/counter/counter-list/counter-list.component';
import { MeasurementListComponent } from './components/lists/measurement/measurement-list/measurement-list.component';
import { TimeIntervalListComponent } from './components/lists/timeInterval/time-interval-list/time-interval-list.component';
import { LogMessageListItemDetailComponent } from './components/lists/logMessage/log-message-list-item-detail/log-message-list-item-detail.component';
import { ConnectingErrorComponent } from './components/utils/connecting-error/connecting-error.component';
import { LogMessageFilterComponent } from './components/lists/logMessage/log-message-filter/log-message-filter.component';
import { LoadingSpinnerComponent } from './components/utils/loading-spinner/loading-spinner.component';
import { ClientInstanceFilterComponent } from './components/lists/client-instance/client-instance-filter/client-instance-filter.component';
import { ClientInstanceListComponent } from './components/lists/client-instance/client-instance-list/client-instance-list.component';


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
    ConnectingErrorComponent,
    LogMessageFilterComponent,
    LoadingSpinnerComponent,
    ClientInstanceFilterComponent,
    ClientInstanceListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
