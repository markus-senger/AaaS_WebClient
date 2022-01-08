import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { AaasService } from 'src/app/shared/aaas.service';

@Component({
  selector: 'app-heartbeat-detector-filter',
  templateUrl: './heartbeat-detector-filter.component.html',
  styleUrls: ['./heartbeat-detector-filter.component.css']
})
export class HeartbeatDetectorFilterComponent implements OnInit {

    @Output() applyFilter: EventEmitter<any> = new EventEmitter();

    filterSettings: FormGroup;
    
    filterOpen: boolean = false;
    connectionError: boolean = false;

    clientInstances: ClientInstance[] = [];

    nameFieldEmpty: string = "";
    typeFieldEmpty: undefined;
    clientFieldEmpty: undefined;

    constructor(private aaasService: AaasService, private fb: FormBuilder) {
        this.filterSettings = fb.group({
            selectedName: undefined,
            selectedType: undefined,
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
        this.nameFieldEmpty = "";
        this.filterSettings.patchValue({
            selectedName: undefined
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

    submitFilter(): void {
        this.applyFilter.emit(this.filterSettings.value);
    }

}
