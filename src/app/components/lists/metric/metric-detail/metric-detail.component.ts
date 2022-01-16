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
        //indexAxis: 'y',
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
        let lastFoundMeasurementSumValue;
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
                lastFoundMeasurementSumValue = foundMeasurementSumValue;
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
        this.chartType = "bar";
        let dataArray: number[] = [];
        let labels: string[] = [];
        if(newInit) this.timeIntervals.reverse();
        let lastFoundTimeInterval;
        let endDate = new Date(this.curDate);
        endDate.setDate(this.curDate.getDate() + 1);

        for(let i = 0; i <= 10; i++) {
            endDate.setDate(endDate.getDate() - 1);

            let foundTimeInterval = this.timeIntervals.find(t => compareDates(new Date(t.start ?? ""), endDate));
            if(foundTimeInterval) {
                dataArray.push(Number(foundTimeInterval.value));
                labels.push((this.datepipe.transform(foundTimeInterval.start, 'dd-MMM-YYYY')?.concat(" ").concat(this.datepipe.transform(foundTimeInterval.end, 'dd-MMM-YYYY') ?? "") ?? ""));
                lastFoundTimeInterval = foundTimeInterval;
            }
            else {
                if(endDate < new Date()) {
                    dataArray.push(0);
                }
                labels.push(this.datepipe.transform(endDate, 'dd-MMM-YYYY') ?? "");
                
            }
        }
        this.chartData = [{data: dataArray.reverse(), label: 'Zeit-Intervalle'}];
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
