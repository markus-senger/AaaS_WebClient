import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AaasService } from 'src/app/shared/aaas.service';

@Component({
  selector: 'app-metric-detector-filter',
  templateUrl: './metric-detector-filter.component.html',
  styleUrls: ['./metric-detector-filter.component.css']
})
export class MetricDetectorFilterComponent {

    @Output() applyFilter: EventEmitter<any> = new EventEmitter();

    filterSettings: FormGroup;
    
    filterOpen: boolean = false;
    connectionError: boolean = false;

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
