import { Component, OnInit } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { HeartbeatDetector } from 'src/app/shared/models/heartbeat-detector';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-heartbeat-detector-list',
  templateUrl: './heartbeat-detector-list.component.html',
  styleUrls: ['./heartbeat-detector-list.component.css']
})
export class HeartbeatDetectorListComponent implements OnInit {

    heartBeatDet: HeartbeatDetector[] = [];
    connectionError: boolean = false;
    loading: boolean = false;
    loadingFilter: boolean = false;

    currentPage: any;

    constructor(private aaasService: AaasService) { }

    ngOnInit(): void {
        this.loading = true;
        this.aaasService.getAllHeartbeatDetectors().pipe(finalize(() => this.loading = false)).
            subscribe(
            {
                next: res => this.heartBeatDet = res, 
                error: () => this.connectionError = true
            });
    }

    pageChanged(event:any): void {
        this.currentPage = event;
    }

    filter(value: any): void {
        this.loadingFilter = true;
        this.aaasService.getAllHeartbeatDetectors()
            .pipe(finalize(() => this.loadingFilter = false)).subscribe(
            {
                next: res => 
                            {  
                                this.heartBeatDet = res; 
                                this.getClientAndDetector(value);
                                //this.applyFilterType(value);
                                //this.applyFilterName(value);
                            },
                error: () => this.connectionError = true
            }
        );
    }

    getClientAndDetector(value: any): void {
        
    }

    /*applyFilterType(value: any): void {
        if(value.selectedType != undefined) {
            this.heartBeatDet = this.heartBeatDet.filter(det => det.?.toLowerCase() == value.selectedType.toLowerCase());
        }
    }

    applyFilterName(value: any): void {
        if(value.selectedMessage != undefined) {
            this.heartBeatDet = this.heartBeatDet.filter(det => det.?.toLowerCase().includes(value.selectedMessage.toLowerCase()));
        }
    }*/

}
