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

}
