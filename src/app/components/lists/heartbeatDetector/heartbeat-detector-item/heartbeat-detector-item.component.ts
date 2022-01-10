import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { HeartbeatDetector } from 'src/app/shared/models/heartbeat-detector';
import { HeartbeatDetectorUpdate } from 'src/app/shared/models/heartbeat-detector-update';
import { finalize } from 'rxjs';
import { WebHookUpdate } from 'src/app/shared/models/web-hook-update';
import { EMailUpdate } from 'src/app/shared/models/e-mail-update';

@Component({
  selector: 'app-heartbeat-detector-item',
  templateUrl: './heartbeat-detector-item.component.html',
  styleUrls: ['./heartbeat-detector-item.component.css']
})
export class HeartbeatDetectorItemComponent {

    @Input() heartbeatDetector: HeartbeatDetector = new HeartbeatDetector();
    @Output() reload = new EventEmitter();

    details: boolean = false;
    editDetector: boolean = false;
    createEMail: boolean = false;
    createWebHook: boolean = false;
    
    connectionError: boolean = false;
    loading: boolean = false;

    update: boolean = false;

    constructor(private aaasService: AaasService) { }

    openDetails(): void {
        this.details = this.details == false ? true : false;
    }

    edit(): void {
        this.editDetector = this.editDetector == false ? true : false;
        if(!this.editDetector) {
            this.reload.emit("update");
            this.createEMail = false;
            this.createWebHook = false;
        }
    }

    updateDetector(): void {
        if(this.update) {
            this.loading = true;
            var update = new HeartbeatDetectorUpdate();
            update.maxMissedBeats = this.heartbeatDetector.d_maxMissedBeats;
            update.name = this.heartbeatDetector.d_name;
            update.timeBetweenChecks = this.heartbeatDetector.d_timeBetweenChecks;

            this.aaasService.updateHeartbeatDetector(this.heartbeatDetector.d_detectorID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        error: () => this.connectionError = true
                    });
            this.update = false;
        }
    }

    updateWebHook(): void {
        if(this.update) {
            this.loading = true;
            var update = new WebHookUpdate();
            update.tool = this.heartbeatDetector.a_w_tool;
            update.url = this.heartbeatDetector.a_w_url;

            this.aaasService.updateWebHook(this.heartbeatDetector.a_actionID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        error: () => this.connectionError = true
                    });
            this.update = false;
        }
    }

    updateEMail(): void {
        if(this.update) {
            this.loading = true;
            var update = new EMailUpdate();
            update.content = this.heartbeatDetector.a_e_content;
            update.sentTo = this.heartbeatDetector.a_e_sentTo;
            update.subject = this.heartbeatDetector.a_e_subject;

            this.aaasService.updateEMail(this.heartbeatDetector.d_detectorID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        error: () => this.connectionError = true
                    });
            this.update = false;
        }
    }

}
