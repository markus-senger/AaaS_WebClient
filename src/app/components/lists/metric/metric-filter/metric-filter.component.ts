import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AaasService } from 'src/app/shared/aaas.service';
import { ClientInstance } from 'src/app/shared/models/client-instance';

@Component({
  selector: 'app-metric-filter',
  templateUrl: './metric-filter.component.html',
  styleUrls: ['./metric-filter.component.css']
})
export class MetricFilterComponent implements OnInit {

    @Output() applyFilter: EventEmitter<any> = new EventEmitter();

    filterSettings: FormGroup;

    filterOpen: boolean = false;
    connectionError: boolean = false;

    clientInstances: ClientInstance[] = [];

    messageFieldEmpty: string = "";
    clientFieldEmpty: undefined;


    constructor(private aaasService: AaasService, private fb: FormBuilder) { 
        this.filterSettings = fb.group({
            selectedMessage: undefined,
            selectedClientInstance: undefined
        });
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

    resetClientField(): void {
        this.clientFieldEmpty = undefined;
        this.filterSettings.patchValue({
            selectedClientInstance: undefined
        });
    }

    submitFilter(): void {
        this.applyFilter.emit(this.filterSettings.value);
    }


}
