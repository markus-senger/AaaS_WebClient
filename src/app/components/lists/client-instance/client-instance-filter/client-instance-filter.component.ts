import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-client-instance-filter',
  templateUrl: './client-instance-filter.component.html',
  styleUrls: ['./client-instance-filter.component.css']
})
export class ClientInstanceFilterComponent {

    @Output() applyFilter: EventEmitter<any> = new EventEmitter();

    filterSettings: FormGroup;

    filterOpen: boolean = false;
    connectionError: boolean = false;

    descriptionFieldEmpty: string = "";
    stateFieldEmpty: undefined;


    constructor(private fb: FormBuilder) { 
        this.filterSettings = fb.group({
            selectedDescription: undefined,
            selectedState: undefined
        });
    }

    filterToggle(): void {
        this.filterOpen = this.filterOpen == true ? false : true;
    }

    resetDescriptionField(): void {
        this.descriptionFieldEmpty = "";
        this.filterSettings.patchValue({
            selectedDescription: undefined
        });
    }

    resetStateField(): void {
        this.stateFieldEmpty = undefined;
        this.filterSettings.patchValue({
            selectedState: undefined
        });
    }

    submitFilter(): void {
        this.applyFilter.emit(this.filterSettings.value);
    }


}
