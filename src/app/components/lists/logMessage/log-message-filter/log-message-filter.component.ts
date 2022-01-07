import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { AaasService } from 'src/app/shared/aaas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-log-message-filter',
  templateUrl: './log-message-filter.component.html',
  styleUrls: ['./log-message-filter.component.css']
})
export class LogMessageFilterComponent implements OnInit {

    @Output() applyFilter: EventEmitter<any> = new EventEmitter();

    filterSettings: FormGroup;

    filterOpen: boolean = false;
    connectionError: boolean = false;

    clientInstances: ClientInstance[] = [];

    messageFieldEmpty: string = "";
    typeFieldEmpty: undefined;
    clientFieldEmpty: undefined;
    dateFieldEmpty: string = "";


    constructor(private aaasService: AaasService, private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) { 
        this.filterSettings = fb.group({
            selectedMessage: undefined,
            selectedType: undefined,
            selectedClientInstance: undefined,
            selectedDateStart: undefined,
            selectedDateEnd: undefined
        });
        this.dateAdapter.setLocale('en-GB');
    }

    ngOnInit(): void {
        this.aaasService.getAllClientInstance().subscribe(
            {
                next: res => this.clientInstances = res, 
                error: () => this.connectionError = true
            });
    }

    filterToggle(): void {
        this.filterOpen = this.filterOpen == true ? false : true;
    }

    resetMessageField(): void {
        this.messageFieldEmpty = "";
        this.filterSettings.patchValue({
            selectedMessage: undefined
        });
    }

    resetTypeField(): void {
        this.typeFieldEmpty = undefined;
        this.filterSettings.patchValue({
            selectedType: undefined
        });
    }

    resetClientField(): void {
        this.clientFieldEmpty = undefined;
        this.filterSettings.patchValue({
            selectedClientInstance: undefined
        });
    }

    resetDateField(): void {
        this.dateFieldEmpty = "";
        this.filterSettings.patchValue({
            selectedDateStart: undefined,
            selectedDateEnd: undefined
        });
    }

    submitFilter(): void {
        this.applyFilter.emit(this.filterSettings.value);
    }

}
