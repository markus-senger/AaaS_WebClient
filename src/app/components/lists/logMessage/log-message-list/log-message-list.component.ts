import { Component, OnInit } from '@angular/core';
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

    filter(value: any): void {
        if(!this.applyFilterClientInstance(value)) {
            if(!this.applyFilterDate(value)) {
                this.aaasService.getAllLogMessage().subscribe(
                    {
                        next: res => 
                                    {  
                                        this.logMessages = res; 
                                        this.applyFilterType(value);
                                        this.applyFilterMessage(value);
                                    },
                        error: () => this.connectionError = true
                    }
                );
            }
        }
    }

    applyFilterType(value: any): void {
        if(value.selectedType != undefined) {
            this.logMessages = this.logMessages.filter(log => log.type?.toLowerCase() == value.selectedType.toLowerCase());
        }
    }

    applyFilterMessage(value: any): void {
        if(value.selectedMessage != undefined) {
            this.logMessages = this.logMessages.filter(log => log.message?.toLowerCase().includes(value.selectedMessage.toLowerCase()));
        }
    }

    applyFilterClientInstance(value: any): boolean {
        if(value.selectedClientInstance != undefined) {
            if(value.selectedDateStart != undefined || value.selectedDateEnd != undefined) {
                this.aaasService.getAllLogMessageByClientInstanceByTime(
                    value.selectedClientInstance.clientID, value.selectedDateStart, value.selectedDateEnd).subscribe(
                    {
                        next: res => 
                                    {
                                        this.logMessages = res;
                                        this.applyFilterType(value);
                                        this.applyFilterMessage(value);
                                    }, error: () => this.connectionError = true
                    });
            }
            else {
                this.aaasService.getAllLogMessageByClientInstance(value.selectedClientInstance.clientID).subscribe(
                    {
                        next: res => 
                                    {
                                        this.logMessages = res;
                                        this.applyFilterType(value);
                                        this.applyFilterMessage(value);
                                    }, error: () => this.connectionError = true
                    }
                );
            }
            return true;
        }
        return false;
    }

    applyFilterDate(value: any): boolean {
        if(value.selectedDateStart != undefined || value.selectedDateEnd != undefined) {
            this.aaasService.getAllLogMessagebyDate(
                value.selectedDateStart, value.selectedDateEnd).subscribe(
                {
                    next: res => 
                                {
                                    this.logMessages = res;
                                    this.applyFilterType(value);
                                    this.applyFilterMessage(value);
                                }, error: () => this.connectionError = true
                }
            );
            return true;
        }
        return false;
    }




}

