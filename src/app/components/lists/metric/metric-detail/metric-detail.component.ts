import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetricFull } from 'src/app/shared/models/metric-full';
import { ChartType } from 'chart.js';
import { AaasService } from 'src/app/shared/aaas.service';
import { finalize, forkJoin, Observable } from 'rxjs';
import { Counter } from 'src/app/shared/models/counter';
import { Measurement } from 'src/app/shared/models/measurement';
import { TimeInterval } from 'src/app/shared/models/time-interval';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-metric-detail',
  templateUrl: './metric-detail.component.html',
  styleUrls: ['./metric-detail.component.css']
})
export class MetricDetailComponent implements OnInit {

    datepipe: DatePipe = new DatePipe('en-US');
    curDate: Date;

    metric: MetricFull;

    counters: Counter[] = [];
    measurements: Measurement[] = [];
    timeIntervals: TimeInterval[] = [];

    lastCounter: Counter = new Counter();
    lastMeasurement: Measurement = new Measurement();
    lastTimeInterval: TimeInterval = new TimeInterval();

    loading: boolean = false;
    connectionError: boolean = false;

    chartOptions = {
        scaleShowVerticalLines: false,
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                ticks: {
                    precision: 0
                },
            }
        }
    };
    chartLabels: string[] = [];
    chartType: ChartType = "line";
    chartLegend = true;
    chartData = [
        {data: [0], label: ''}
    ];

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private aaasService: AaasService) {
        this.metric = data;
        this.curDate = new Date();
    }

    ngOnInit(): void {
        this.getMetricDetails();

        
    }

    getMetricDetails(): void {
        this.loading = true;

        forkJoin([
            this.getLastInsertedCounter(),
            this.getLastInsertedMeasurement(),
            this.getLastInsertedTimeInterval()
        ]).subscribe(() => this.initDiagram());
    }

    initDiagram(): void {
        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);

        if(this.lastCounter != undefined) {
            if(this.metric.t_dataID != undefined)
                this.aaasService.getCounterByDataIdAndDate(this.metric.t_dataID, startDate.toJSON(), endDate.toJSON())
                    .pipe(finalize(() => this.loading = false)).subscribe({
                        next: res => {
                            this.counters = res;
                            this.initDiagramForCounter();
                        },
                        error: () => {
                            this.connectionError = true;
                        }
                    });
        }
        else if(this.lastMeasurement != undefined) {
            if(this.metric.t_dataID != undefined)
                this.aaasService.getMeasurementByDataIdAndDate(this.metric.t_dataID, startDate.toJSON(), endDate.toJSON())
                    .pipe(finalize(() => this.loading = false)).subscribe({
                        next: res => {
                            this.measurements = res;
                            this.initDiagramForMeasurement();
                        },
                        error: () => {
                            this.connectionError = true;
                        }
                    });
        }
        else if(this.lastTimeInterval != undefined) {
            if(this.metric.t_dataID != undefined)
                this.aaasService.getTimeIntervalByDataIdAndDate(this.metric.t_dataID, startDate.toJSON(), endDate.toJSON())
                    .pipe(finalize(() => this.loading = false)).subscribe({
                        next: res => {
                            this.timeIntervals = res;
                            this.initDiagramForTimeInterval();
                        },
                        error: () => {
                            this.connectionError = true;
                        }
                    });
        }
    }

    initDiagramForCounter(newInit: boolean = true): void {
        let dataArray: number[] = [];
        let labels: string[] = [];
        if(newInit) this.counters.reverse();
        let lastFoundCounter;
        let endDate = new Date(this.curDate);
        endDate.setDate(this.curDate.getDate() + 1);

        for(let i = 0; i <= 20; i++) {
            endDate.setDate(endDate.getDate() - 1);

            let foundCounter = this.counters.find(e => compareDates(new Date(e.timestamp ?? ""), endDate));
            if(foundCounter) {
                dataArray.push(Number(foundCounter.state));
                labels.push(this.datepipe.transform(foundCounter.timestamp, 'dd-MMM-YYYY') ?? "");
                lastFoundCounter = foundCounter;
            }
            else {
                if(endDate < new Date()) {
                    if(new Date(lastFoundCounter?.timestamp ?? "") < endDate) dataArray.push(Number(lastFoundCounter?.state));
                    else if(new Date(this.lastCounter?.timestamp ?? "") < endDate) dataArray.push(Number(this.lastCounter?.state));
                    else dataArray.push(0);
                }
                labels.push(this.datepipe.transform(endDate, 'dd-MMM-YYYY') ?? "");
                
            }
        }
        this.chartData = [{data: dataArray.reverse(), label: 'Zählerstand'}];
        this.chartLabels = labels.reverse();
    }

    initDiagramForMeasurement(newInit: boolean = true): void {
        let dataArray: number[] = [];
        let labels: string[] = [];
        if(newInit) this.measurements.reverse();
        let endDate = new Date(this.curDate);
        endDate.setDate(this.curDate.getDate() + 1);

        for(let i = 0; i <= 20; i++) {
            endDate.setDate(endDate.getDate() - 1);

            let foundMeasurementSumValue = this.measurements.filter(m => compareDates(new Date(m.timestamp ?? ""), endDate))
                                        .reduce((sum, cur) => sum += Number(cur.value), 0);
            let foundMeasurement = this.measurements.find(m => compareDates(new Date(m.timestamp ?? ""), endDate))
            if(foundMeasurement) {
                dataArray.push(Number(foundMeasurementSumValue));
                labels.push(this.datepipe.transform(foundMeasurement.timestamp, 'dd-MMM-YYYY') ?? "");
            }
            else {
                if(endDate < new Date()) {
                    dataArray.push(0);
                }
                labels.push(this.datepipe.transform(endDate, 'dd-MMM-YYYY') ?? "");
                
            }
        }
        this.chartData = [{data: dataArray.reverse(), label: 'Messungen (Sum pro Tag)'}];
        this.chartLabels = labels.reverse();
    }

    initDiagramForTimeInterval(newInit: boolean = true): void {
        let dataArray = [];
        let labels: string[] = [];
        if(newInit) this.timeIntervals.reverse();
        let endDate = new Date(this.curDate);
        let startDate = new Date(this.curDate);
        startDate.setDate(startDate.getDate() - 10);

        let foundTimeIntervals = this.timeIntervals.filter(t => 
            compareDatesSmaller(new Date(t.start ?? ""), endDate) && compareDatesLarger(new Date(t.end ?? ""), startDate));

        endDate.setDate(this.curDate.getDate() + 1);

        let output: number[][] = [];
        for(let i = 0; i <= 10; i++) {
            endDate.setDate(endDate.getDate() - 1);

            for(let i = 0; i < 10; i++) {
                if(foundTimeIntervals[i] && 
                    compareDatesSmaller(new Date(foundTimeIntervals[i].start ?? ""), endDate) && 
                    compareDatesLarger(new Date(foundTimeIntervals[i].end ?? ""), endDate)) {
                    
                    if(!output[i]) output[i] = [];
                    output[i].push(Number(foundTimeIntervals[i].value));
                }
                else {
                    if(!output[i]) output[i] = [];
                    output[i].push(0);
                }
            }
            labels.push(this.datepipe.transform(endDate, 'dd-MMM-YYYY') ?? "");
        }
        for(let i = 9; i >= 0; i--) {
            dataArray.push({data: output[i].reverse(), label: ''});
        }

        this.chartData = dataArray;
        this.chartLabels = labels.reverse();
    }

    getLastInsertedCounter(): Observable<any> {
        var obs = this.aaasService.getLastInsertedCounter(this.metric.t_dataID);
        obs.subscribe(
            {
                next: res => this.lastCounter = res,
                error: () => this.connectionError = true
            });
        return obs;
    }

    getLastInsertedMeasurement(): Observable<any> {
        var obs = this.aaasService.getLastInsertedMeasurement(this.metric.t_dataID);
        obs.subscribe(
            {
                next: res => this.lastMeasurement = res,
                error: () => this.connectionError = true
            });
        return obs;
    }

    getLastInsertedTimeInterval(): Observable<any> {
        var obs = this.aaasService.getLastInsertedTimeInterval(this.metric.t_dataID);
        obs.subscribe(
            {
                next: res => this.lastTimeInterval = res,
                error: () => this.connectionError = true
            });
        return obs;
    }

    leftDate(): void {
        this.curDate.setDate(this.curDate.getDate() - 5);
        if(this.lastCounter != undefined) this.initDiagramForCounter(false);
        else if(this.lastMeasurement != undefined) this.initDiagramForMeasurement(false);
        else if(this.lastTimeInterval != undefined) this.initDiagramForTimeInterval(false);
    }

    strongLeftDate(): void {
        this.curDate.setDate(this.curDate.getDate() - 10);
        if(this.lastCounter != undefined) this.initDiagramForCounter(false);
        else if(this.lastMeasurement != undefined) this.initDiagramForMeasurement(false);
        else if(this.lastTimeInterval != undefined) this.initDiagramForTimeInterval(false);
    }

    rightDate(): void {
        this.curDate.setDate(this.curDate.getDate() + 5);
        if(this.lastCounter != undefined) this.initDiagramForCounter(false);
        else if(this.lastMeasurement != undefined) this.initDiagramForMeasurement(false);
        else if(this.lastTimeInterval != undefined) this.initDiagramForTimeInterval(false);
    }

    strongRightDate(): void {
        this.curDate.setDate(this.curDate.getDate() + 10);
        if(this.lastCounter != undefined) this.initDiagramForCounter(false);
        else if(this.lastMeasurement != undefined) this.initDiagramForMeasurement(false);
        else if(this.lastTimeInterval != undefined) this.initDiagramForTimeInterval(false);
    }

}

function compareDates(date1: Date, date2: Date): boolean {
    return  date1.getFullYear() == date2.getFullYear() && 
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate();
}

function compareDatesLarger(date1: Date, date2: Date): boolean {
    let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return  d1 >= d2;
}

function compareDatesSmaller(date1: Date, date2: Date): boolean {
    let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return  d1 <= d2;
}
