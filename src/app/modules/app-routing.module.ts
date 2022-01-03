import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogMessageListComponent } from '../components/lists/logMessage/log-message-list/log-message-list.component';
import { HomeComponent } from '../components/home/home.component';
import { CounterListComponent } from '../components/lists/counter/counter-list/counter-list.component';
import { MeasurementListComponent } from '../components/lists/measurement/measurement-list/measurement-list.component';
import { TimeIntervalListComponent } from '../components/lists/timeInterval/time-interval-list/time-interval-list.component';
import { LogMessageListItemDetailComponent } from '../components/lists/logMessage/log-message-list-item-detail/log-message-list-item-detail.component';

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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }