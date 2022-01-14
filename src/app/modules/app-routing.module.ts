import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogMessageListComponent } from '../components/lists/logMessage/log-message-list/log-message-list.component';
import { HomeComponent } from '../components/home/home.component';
import { ClientInstanceListComponent } from '../components/lists/client-instance/client-instance-list/client-instance-list.component';
import { HeartbeatDetectorListComponent } from '../components/lists/heartbeatDetector/heartbeat-detector-list/heartbeat-detector-list.component';
import { MetricDetectorListComponent } from '../components/lists/metricDetector/metric-detector-list/metric-detector-list.component';
import { MetricListComponent } from '../components/lists/metric/metric-list/metric-list.component';

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
        path: 'clientInstance',
        component: ClientInstanceListComponent
    },
    {
        path: 'logMessages',
        component: LogMessageListComponent
    },
    {
        path: 'metric',
        component: MetricListComponent
    },
    {
        path: 'heartBeatDetector',
        component: HeartbeatDetectorListComponent
    },
    {
        path: 'metricDetector',
        component: MetricDetectorListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }