import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-message-filter',
  templateUrl: './log-message-filter.component.html',
  styleUrls: ['./log-message-filter.component.css']
})
export class LogMessageFilterComponent implements OnInit {

    selectedType: string = "";
    selectedClientInstance: string = "";


    constructor() { }

    ngOnInit(): void {
    }

}
