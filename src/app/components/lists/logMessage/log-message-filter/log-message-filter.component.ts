import { Component, OnInit } from '@angular/core';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { AaasService } from 'src/app/shared/aaas.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-log-message-filter',
  templateUrl: './log-message-filter.component.html',
  styleUrls: ['./log-message-filter.component.css']
})
export class LogMessageFilterComponent implements OnInit {

    filterSettings: FormGroup;

    filterOpen: boolean = false;

    clientInstances: ClientInstance[] = [];

    messageFieldEmpty: string = "";
    typeFieldEmpty: undefined;
    clientFieldEmpty: undefined;
    dateFieldEmpty: string = "";


    constructor(private aaasService: AaasService, private fb: FormBuilder) { 
        this.filterSettings = fb.group({
            selectedMessage: undefined,
            selectedType: undefined,
            selectedClientInstance: undefined,
            selectedDateStart: undefined,
            selectedDateEnd: undefined
        })
    }

    ngOnInit(): void {
        this.aaasService.getAllClientInstance().subscribe({next: res => this.clientInstances = res});
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
        console.log(this.filterSettings.value);
    }

}
