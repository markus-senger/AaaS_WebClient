import { Component, OnInit, Input } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { forkJoin, Observable } from 'rxjs';
import { Detector } from 'src/app/shared/models/detector';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { HeartbeatDetector } from 'src/app/shared/models/heartbeat-detector';

@Component({
  selector: 'app-heartbeat-detector-item',
  templateUrl: './heartbeat-detector-item.component.html',
  styleUrls: ['./heartbeat-detector-item.component.css']
})
export class HeartbeatDetectorItemComponent implements OnInit {

    @Input() heartbeatDetector: HeartbeatDetector = new HeartbeatDetector();

    detector: Detector = new Detector();
    client: ClientInstance = new ClientInstance();
    
    connectionError: boolean = false;
    loading: boolean = false;

    constructor(private aaasService: AaasService) { }

    ngOnInit(): void {
        this.loading = true;
        forkJoin([
            this.getDetector(),
            this.getClient()
        ]).subscribe(() => this.loading = false);
    }

    getDetector(): Observable<any> {
        var obs = this.aaasService.getDetectorByID(this.heartbeatDetector.detectorID);
        obs.subscribe(
            {
                next: res => this.detector = res, 
                error: () => this.connectionError = true
            })
        return obs;
    }

    getClient(): Observable<any> {
        var obs = this.aaasService.getClientInstanceByAppKeyAndClientID(
            this.heartbeatDetector.appKey, this.heartbeatDetector.clientID);
        obs.subscribe(
            {
                next: res => this.client = res, 
                error: () => this.connectionError = true
            })
        return obs;
    }

}
