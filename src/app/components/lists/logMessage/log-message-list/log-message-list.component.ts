import { Component, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { LogMessage } from 'src/app/shared/modules/log-message';

@Component({
  selector: 'app-log-message-list',
  templateUrl: './log-message-list.component.html',
  styleUrls: ['./log-message-list.component.css']
})
export class LogMessageListComponent implements OnInit {

  logMessages: LogMessage[] = [];

  constructor(private aaasService: AaasService) { }

  ngOnInit(): void {
    this.aaasService.getAllLogMessage().subscribe(res => this.logMessages = res);
    console.log(this.logMessages);
  }

}

