import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AaasService } from 'src/app/shared/aaas.service';
import { LogMessage } from 'src/app/shared/models/log-message';

@Component({
  selector: 'app-log-message-list',
  templateUrl: './log-message-list.component.html',
  styleUrls: ['./log-message-list.component.css']
})
export class LogMessageListComponent implements OnInit {

  logMessages: LogMessage[] = [];
  connectionError: boolean = false;

  constructor(private aaasService: AaasService) { }

  ngOnInit(): void {
    this.aaasService.getAllLogMessage().subscribe({next: res => this.logMessages = res, error: () => this.connectionError = true});
  }

}

