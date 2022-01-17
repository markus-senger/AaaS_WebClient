import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

import { NgChartsModule } from 'ng2-charts';

import { LogMessageListItemComponent } from './components/lists/logMessage/log-message-list-item/log-message-list-item.component';
import { LogMessageListComponent } from './components/lists/logMessage/log-message-list/log-message-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LogMessageListItemDetailComponent } from './components/lists/logMessage/log-message-list-item-detail/log-message-list-item-detail.component';
import { ConnectingErrorComponent } from './components/utils/connecting-error/connecting-error.component';
import { LogMessageFilterComponent } from './components/lists/logMessage/log-message-filter/log-message-filter.component';
import { LoadingSpinnerComponent } from './components/utils/loading-spinner/loading-spinner.component';
import { ClientInstanceFilterComponent } from './components/lists/client-instance/client-instance-filter/client-instance-filter.component';
import { ClientInstanceListComponent } from './components/lists/client-instance/client-instance-list/client-instance-list.component';
import { HeartbeatDetectorListComponent } from './components/lists/heartbeatDetector/heartbeat-detector-list/heartbeat-detector-list.component';
import { HeartbeatDetectorItemComponent } from './components/lists/heartbeatDetector/heartbeat-detector-item/heartbeat-detector-item.component';
import { HeartbeatDetectorFilterComponent } from './components/lists/heartbeatDetector/heartbeat-detector-filter/heartbeat-detector-filter.component';
import { EMailFormForCreatingComponent } from './components/actionForms/email-form-for-creating/email-form-for-creating.component';
import { WebHookFormForCreatingComponent } from './components/actionForms/web-hook-form-for-creating/web-hook-form-for-creating.component';
import { MetricDetectorListComponent } from './components/lists/metricDetector/metric-detector-list/metric-detector-list.component';
import { MetricDetectorItemComponent } from './components/lists/metricDetector/metric-detector-item/metric-detector-item.component';
import { MetricDetectorFilterComponent } from './components/lists/metricDetector/metric-detector-filter/metric-detector-filter.component';
import { AddDetectorComponent } from './components/add-detector/add-detector.component';
import { MetricListComponent } from './components/lists/metric/metric-list/metric-list.component';
import { RemoveDetectorComponent } from './components/remove-detector/remove-detector.component';
import { LoadingDisplayComponent } from './components/loading-display/loading-display.component';
import { MetricDetailComponent } from './components/lists/metric/metric-detail/metric-detail.component';
import { MetricFilterComponent } from './components/lists/metric/metric-filter/metric-filter.component';
import { LoginComponent } from './components/login/login.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';


@NgModule({
  declarations: [
    AppComponent,
    LogMessageListComponent,
    LogMessageListItemComponent,
    SidebarComponent,
    LogMessageListItemDetailComponent,
    ConnectingErrorComponent,
    LogMessageFilterComponent,
    LoadingSpinnerComponent,
    ClientInstanceFilterComponent,
    ClientInstanceListComponent,
    HeartbeatDetectorListComponent,
    HeartbeatDetectorItemComponent,
    HeartbeatDetectorFilterComponent,
    EMailFormForCreatingComponent,
    WebHookFormForCreatingComponent,
    MetricDetectorListComponent,
    MetricDetectorItemComponent,
    MetricDetectorFilterComponent,
    AddDetectorComponent,
    MetricListComponent,
    RemoveDetectorComponent,
    LoadingDisplayComponent,
    MetricDetailComponent,
    MetricFilterComponent,
    LoginComponent,
    LoginSuccessComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule,
    NgxMatTimepickerModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    OAuthModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
