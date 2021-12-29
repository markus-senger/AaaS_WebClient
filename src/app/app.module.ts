import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogMessageListItemComponent } from './components/lists/logMessage/log-message-list-item/log-message-list-item.component';
import { LogMessageListComponent } from './components/lists/logMessage/log-message-list/log-message-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogMessageListComponent,
    LogMessageListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
