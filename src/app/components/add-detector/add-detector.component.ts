import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AaasService } from 'src/app/shared/aaas.service';
import { DetectorInsert } from 'src/app/shared/models/detector-insert';
import { Metric } from 'src/app/shared/models/metric';
import { MinMaxDetectorInsert } from 'src/app/shared/models/min-max-detector-insert';
import { SlidingWindowDetectorInsert } from 'src/app/shared/models/sliding-window-detector-insert';

@Component({
  selector: 'app-add-detector',
  templateUrl: './add-detector.component.html',
  styleUrls: ['./add-detector.component.css']
})
export class AddDetectorComponent implements OnInit {

    @Output() reload = new EventEmitter();

    metrics: Metric[] = [];
    filterMetrics: Observable<Metric[]> = new Observable();
    data = new FormControl('', 
        { validators: [autocompleteObjectValidator(), Validators.required] });

    minMaxDetectorForm: FormGroup;
    slidingWindowDetectorForm: FormGroup;

    connectionError: boolean = false;

    constructor(private aaasService: AaasService, private fb: FormBuilder, public dialogRef: MatDialogRef<any>) {
        this.minMaxDetectorForm = this.fb.group({
            name: [ "", [Validators.required]],
            timeBetweenChecks: [ "", [Validators.required]],
            data: this.data,
            min: [ "", [Validators.required]],
            max: [ "", [Validators.required]],
            threshold: [ "", [Validators.required]]
        });

        this.slidingWindowDetectorForm = this.fb.group({
            name: [ "", [Validators.required]],
            timeBetweenChecks: [ "", [Validators.required]],
            data: this.data,
            timeInterval: [ "", [Validators.required]],
            aggregationOp: [ "", [Validators.required]],
            comparisonOp: [ "", [Validators.required]],
            threshold: [ "", [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.aaasService.getAllMetrics().subscribe(
            {
                next: res => {
                    this.metrics = res;
                    this.filterMetrics = this.data.valueChanges.pipe(
                        startWith(''),
                        map(value => { 
                            if(typeof value == "string") return this._filter(value); 
                            return [];
                        })
                    );
                }, 
                error: () => this.connectionError = true
            });
    }

    private _filter(value: string): Metric[] {
        const filterValue = value.toLowerCase();
        return this.metrics.filter(metric => metric.description?.toLowerCase().includes(filterValue)).slice(0, 25);
    }

    close(): void {
        this.dialogRef.close();
    }

    submitMinMaxDetector(): void {
        var insert = new MinMaxDetectorInsert();
        insert.dataID = this.minMaxDetectorForm.value.data.dataID;
        insert.detectorDto = new DetectorInsert();
        insert.detectorDto.name = this.minMaxDetectorForm.value.name;
        insert.detectorDto.timeBetweenChecks = this.minMaxDetectorForm.value.timeBetweenChecks;
        insert.max = this.minMaxDetectorForm.value.max;
        insert.min = this.minMaxDetectorForm.value.min;
        insert.threshold = this.minMaxDetectorForm.value.threshold;

        this.aaasService.insertMinMaxDetector(insert)
                    .subscribe(
                    {
                        next: () => {
                            this.dialogRef.close(true);
                        },
                        error: () => this.connectionError = true
                    });
    }

    submitSlidingWindowDetector(): void {
        var insert = new SlidingWindowDetectorInsert();
        insert.dataID = this.slidingWindowDetectorForm.value.data.dataID;
        insert.detectorDto = new DetectorInsert();
        insert.detectorDto.name = this.slidingWindowDetectorForm.value.name;
        insert.detectorDto.timeBetweenChecks = this.slidingWindowDetectorForm.value.timeBetweenChecks;
        insert.aggregationOp = this.slidingWindowDetectorForm.value.aggregationOp;
        insert.comparisonOp = this.slidingWindowDetectorForm.value.comparisonOp;
        insert.threshold = this.slidingWindowDetectorForm.value.threshold;
        insert.timeInterval = this.slidingWindowDetectorForm.value.timeInterval;

        this.aaasService.insertSlidingWindowDetector(insert)
                    .subscribe(
                    {
                        next: () => {
                            this.dialogRef.close(true);
                        },
                        error: () => this.connectionError = true
                    });
    }

    displayFn(m: Metric): string {
        if(m.description != undefined) return m.description;
        return "";
    }

}

function autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (typeof control.value === 'string') {
            return { 'invalidAutocompleteObject': { value: control.value } }
        }
        return null  /* valid option selected */
    }
  }

