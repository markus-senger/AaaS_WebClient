import { Component, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { forkJoin, finalize, Observable } from 'rxjs';
import { MetricDetector } from 'src/app/shared/models/metric-detector';
import { mapMinMaxDetector, mapSlidingWindowDetector } from 'src/app/components/utils/Mapper';
import { observeNotification } from 'rxjs/internal/Notification';

@Component({
  selector: 'app-metric-detector-list',
  templateUrl: './metric-detector-list.component.html',
  styleUrls: ['./metric-detector-list.component.css']
})
export class MetricDetectorListComponent implements OnInit {

    metricDetectors: MetricDetector[] = [];
    minMaxDet: MetricDetector[] = [];
    slidingWindowDet: MetricDetector[] = [];
    connectionError: boolean = false;
    loading: boolean = false;
    loadingFilter: boolean = false;

    currentPage: any;

    constructor(private aaasService: AaasService) { }

    ngOnInit(): void {
        this.loading = true;
        this.metricDetectors = [];
        forkJoin([
            this.getAllMinMaxDetectors(),
            this.getAllSlidingWindowDetectors()
        ]).subscribe(() => {
            this.metricDetectors = this.minMaxDet.concat(this.slidingWindowDet).sort((a, b) => Number(b.t_dataID) - Number(a.t_dataID));
            this.loading = false;
        });
    }

    pageChanged(event:any): void {
        this.currentPage = event;
    }

    filter(value: any): void {
        this.loadingFilter = true;

        forkJoin([
            this.getAllMinMaxDetectors(value),
            this.getAllSlidingWindowDetectors(value)
        ]).subscribe(() => {
            this.loadingFilter = false;
            this.metricDetectors = this.minMaxDet.concat(this.slidingWindowDet).sort((a, b) => Number(b.t_dataID) - Number(a.t_dataID));
        });
    }

    getAllMinMaxDetectors(filterValue: any = undefined): Observable<any> {
        var obs = this.aaasService.getAllMinMaxDetectors();
            obs.subscribe(
            {
                next: res => {
                    this.minMaxDet = mapMinMaxDetector(res);
                    this.getDataAndDetectorAndAction(filterValue, this.minMaxDet);
                }, 
                error: () => this.connectionError = true
            });
        return obs;
    }

    getAllSlidingWindowDetectors(filterValue: any = undefined): Observable<any> {
        var obs = this.aaasService.getAllSlidingWindowDetectors();
            obs.subscribe(
            {
                next: res => {
                    this.slidingWindowDet = mapSlidingWindowDetector(res);
                    this.getDataAndDetectorAndAction(filterValue, this.slidingWindowDet);
                }, 
                error: () => this.connectionError = true
            });
        return obs;
    }

    getDataAndDetectorAndAction(filterValue: any, data: MetricDetector[]): void {
        var cnt = 0;
        for(var entry of data) {
            cnt++;
            this.getDetector(entry, cnt, data.length, filterValue).subscribe({
                    error: () => this.connectionError = true
                });
        }
    }

    getDetector(det: MetricDetector, cnt: number, dataSize: number, filterValue: any): Observable<any> {
        var obs = this.aaasService.getDetectorByID(det.d_detectorID);
         obs.subscribe(
            {
                next: res => 
                            {
                                det.d_name = res.name; 
                                det.t_dataID = res.dataID;
                                det.d_timeBetweenChecks = res.timeBetweenChecks;
                                det.d_lastCheck = res.lastCheck;
                                det.d_active = res.active;
                                forkJoin([
                                    this.getTelemetry(det),
                                    this.getMetric(det),
                                    this.getAction(det)]).subscribe(() => {
                                        cnt++;
                                        if(filterValue != undefined && cnt == dataSize) {
                                            this.applyFilterName(filterValue);
                                        }
                                    })
                            },
                error: () => this.connectionError = true
            }
        );
        return obs;
    }

    getTelemetry(det: MetricDetector): Observable<any> {
        var obs = this.aaasService.getTelemetryDataByDataID(det.t_dataID);
        obs.subscribe(
            {
                next: res => 
                            {
                                det.t_dataID = res.dataID; 
                                det.t_name = res.name;
                            },
                error: () => this.connectionError = true
            }
        );
        return obs;
    }

    getMetric(det: MetricDetector): Observable<any> {
        var obs = this.aaasService.getMetricByDataID(det.t_dataID);
        obs.subscribe(
            {
                next: res => 
                            {
                                det.t_dataID = res.dataID; 
                                det.t_description = res.description;
                            },
                error: () => this.connectionError = true
            }
        );
        return obs;
    }

    getAction(det: MetricDetector): Observable<any> {
        var obs = this.aaasService.getActionByDetectorID(det.d_detectorID);
        obs.subscribe(
            {
                next: res => 
                            { 
                                if(res != null) {
                                    det.a_actionID = res.actionID; 
                                    det.a_name = res.name;
                                    this.getEMail(det);
                                    this.getWebHook(det);
                                }
                            },
                error: () => ""
            }
        );
        return obs;
    }

    getEMail(det: MetricDetector): void {
        this.aaasService.getEMailByDetectorID(det.d_detectorID).subscribe(
            {
                next: res => 
                            {
                                if(res != null) { 
                                    det.a_e_subject = res.subject; 
                                    det.a_e_content = res.content;
                                    det.a_e_sentTo = res.sentTo;
                                }
                            },
                error: () => ""
            })
    }

    getWebHook(det: MetricDetector): void {
        this.aaasService.getWebHookByDetectorID(det.d_detectorID).subscribe(
            {
                next: res => 
                            {  
                                if(res != null) {
                                    det.a_w_url = res.url; 
                                    det.a_w_tool = res.tool;
                                }
                            },
                error: () => ""
            })
    }


    applyFilterName(value: any): void {
        if(value.selectedName != undefined) {
            this.minMaxDet = this.minMaxDet.filter(det => det.d_name?.toLowerCase().includes(value.selectedName.toLowerCase()));
        }
    }

}
