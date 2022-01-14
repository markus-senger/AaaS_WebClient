import { Component, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { forkJoin, finalize, Observable } from 'rxjs';
import { mapHeartBeatDetector } from 'src/app/components/utils/Mapper';
import { HeartbeatDetector } from 'src/app/shared/models/heartbeat-detector';

@Component({
  selector: 'app-heartbeat-detector-list',
  templateUrl: './heartbeat-detector-list.component.html',
  styleUrls: ['./heartbeat-detector-list.component.css']
})
export class HeartbeatDetectorListComponent implements OnInit {

    showDetectors: HeartbeatDetector[] = [];
    heartBeatDet: HeartbeatDetector[] = [];
    connectionError: boolean = false;
    loading: boolean = false;
    loadingFilter: boolean = false;

    currentPage: any;

    constructor(private aaasService: AaasService) { }

    ngOnInit(): void {
        this.getAllHeartbeatDetectors();
    }

    pageChanged(event:any): void {
        this.currentPage = event;
    }

    filter(value: any): void {
        this.loadingFilter = true;

        this.showDetectors = this.heartBeatDet;

        this.applyFilterName(value);
        this.applyFilterType(value);

        this.loadingFilter = false;
    }

    applyFilterType(value: any): void {
        if(value.selectedType != undefined) {
            this.showDetectors = this.showDetectors.filter(det => det.c_state?.toLowerCase() == value.selectedType.toLowerCase());
        }
    }

    applyFilterName(value: any): void {
        if(value.selectedName != undefined) {
            this.showDetectors = this.showDetectors.filter(det => det.d_name?.toLowerCase().includes(value.selectedName.toLowerCase()));
        }
    }

    getAllHeartbeatDetectors(): void {
        this.loading = true;
        this.aaasService.getAllHeartbeatDetectors().pipe(finalize(() => { this.loading = false; })).
            subscribe(
            {
                next: res => {
                    this.heartBeatDet = mapHeartBeatDetector(res);
                    this.getClientAndDetectorAndAction();
                    this.showDetectors = this.heartBeatDet;
                }, 
                error: () => this.connectionError = true
            });
    }

    getClientAndDetectorAndAction(): void {
        var cnt = 0;
        for(var entry of this.heartBeatDet) {
            this.getDetector(entry);
            this.getClient(entry);
            this.getAction(entry);
        }
    }

    getDetector(det: HeartbeatDetector): Observable<any> {
        var obs = this.aaasService.getDetectorByID(det.d_detectorID);
        obs.subscribe(
            {
                next: res => 
                            {
                                det.d_name = res.name; 
                                det.d_timeBetweenChecks = res.timeBetweenChecks;
                                det.d_lastCheck = res.lastCheck;
                                det.d_active = res.active;
                            },
                error: () => this.connectionError = true
            }
        );
        return obs;
    }

    getClient(det: HeartbeatDetector): Observable<any> {
        var obs = this.aaasService.getClientInstanceByAppKeyAndClientID(det.c_appKey, det.c_clientID);
        obs.subscribe(
            {
                next: res => 
                            {  
                                det.c_description = res.description; 
                                det.c_state = res.state;
                                det.c_lastHeartbeat = res.lastHeartbeat;
                            },
                error: () => this.connectionError = true
            }
        );
        return obs;
    }

    getAction(det: HeartbeatDetector): Observable<any> {
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

    getEMail(det: HeartbeatDetector): void {
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

    getWebHook(det: HeartbeatDetector): void {
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

}
