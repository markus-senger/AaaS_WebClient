import { Component, Input, OnInit } from '@angular/core';
import { LogMessage } from 'src/app/shared/modules/log-message';

@Component({
  selector: 'app-log-message-list-item',
  templateUrl: './log-message-list-item.component.html',
  styleUrls: ['./log-message-list-item.component.css']
})
export class LogMessageListItemComponent implements OnInit {

  @Input() log: LogMessage = new LogMessage();
  details: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  EntryClick(): void {
    this.details = this.details == false ? true : false;
  }

}
