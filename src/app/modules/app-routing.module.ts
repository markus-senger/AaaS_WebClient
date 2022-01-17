import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogMessageListComponent } from '../components/lists/logMessage/log-message-list/log-message-list.component';
import { ClientInstanceListComponent } from '../components/lists/client-instance/client-instance-list/client-instance-list.component';
import { HeartbeatDetectorListComponent } from '../components/lists/heartbeatDetector/heartbeat-detector-list/heartbeat-detector-list.component';
import { MetricDetectorListComponent } from '../components/lists/metricDetector/metric-detector-list/metric-detector-list.component';
import { MetricListComponent } from '../components/lists/metric/metric-list/metric-list.component';
import { CanNavigateToAppGuard } from '../can-navigate-to-app.guard';
import { LoginSuccessComponent } from '../components/login-success/login-success.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'clientInstance',
        pathMatch: 'full'
    },
    {
        path: 'index.html',
        redirectTo: 'clientInstance',
        pathMatch: 'full'
    },
    {
        path: 'success',
        component: LoginSuccessComponent
    },
    {
        path: 'clientInstance',
        component: ClientInstanceListComponent,
        canActivate: [CanNavigateToAppGuard]
    },
    {
        path: 'logMessages',
        component: LogMessageListComponent,
        canActivate: [CanNavigateToAppGuard]
    },
    {
        path: 'metric',
        component: MetricListComponent,
        canActivate: [CanNavigateToAppGuard]
    },
    {
        path: 'heartBeatDetector',
        component: HeartbeatDetectorListComponent,
        canActivate: [CanNavigateToAppGuard]
    },
    {
        path: 'metricDetector',
        component: MetricDetectorListComponent,
        canActivate: [CanNavigateToAppGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }