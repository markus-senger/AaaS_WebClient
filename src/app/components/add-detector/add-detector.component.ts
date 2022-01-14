import { ValueTransformer } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AaasService } from 'src/app/shared/aaas.service';
import { Metric } from 'src/app/shared/models/metric';

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
        
        this.reload.emit("update");
        this.dialogRef.close();
    }

    submitSlidingWindowDetector(): void {
        
        this.reload.emit("update");
        this.dialogRef.close();
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

