import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { HeartbeatDetector } from 'src/app/shared/models/heartbeat-detector';
import { HeartbeatDetectorUpdate } from 'src/app/shared/models/heartbeat-detector-update';
import { finalize } from 'rxjs';
import { WebHookUpdate } from 'src/app/shared/models/web-hook-update';
import { EMailUpdate } from 'src/app/shared/models/e-mail-update';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDisplayComponent } from 'src/app/components/loading-display/loading-display.component';

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

    detectorUpdate: boolean = false;
    eMailUpdate: boolean = false;
    webHookUpdate: boolean = false;

    constructor(private aaasService: AaasService, public dialog: MatDialog) { }

    disableEnableDetector(): void {
        this.details = false;
        this.editDetector = false;

        this.heartbeatDetector.d_active = this.heartbeatDetector.d_active == true ? false : true;
        this.detectorUpdate = true;
        this.updateDetector();
    }

    openDetails(): void {
        this.details = this.details == false ? true : false;
    }

    edit(): void {
        this.editDetector = this.editDetector == false ? true : false;
        if(!this.editDetector) {
            this.createEMail = false;
            this.createWebHook = false;
        }
    }

    removeAction(): void {
        if(this.heartbeatDetector.a_w_url == undefined) {
            this.aaasService.deleteEMail(this.heartbeatDetector.a_actionID).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
        else {
            this.aaasService.deleteWebHook(this.heartbeatDetector.a_actionID).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
    }

    updateDetector(): void {
        if(this.detectorUpdate) {
            this.loading = true;
            var update = new HeartbeatDetectorUpdate();
            update.maxMissedBeats = this.heartbeatDetector.d_maxMissedBeats;
            update.name = this.heartbeatDetector.d_name;
            update.timeBetweenChecks = this.heartbeatDetector.d_timeBetweenChecks;
            update.active = this.heartbeatDetector.d_active;

            this.aaasService.updateHeartbeatDetector(this.heartbeatDetector.d_detectorID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        next: () => this.refresh(),
                        error: () => this.connectionError = true
                    });
            this.detectorUpdate = false;
        }
    }

    updateWebHook(): void {
        if(this.webHookUpdate) {
            this.loading = true;
            var update = new WebHookUpdate();
            update.tool = this.heartbeatDetector.a_w_tool;
            update.url = this.heartbeatDetector.a_w_url;

            this.aaasService.updateWebHook(this.heartbeatDetector.a_actionID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        next: () => this.refresh(),
                        error: () => this.connectionError = true
                    });
            this.webHookUpdate = false;
        }
    }

    updateEMail(): void {
        if(this.eMailUpdate) {
            this.loading = true;
            var update = new EMailUpdate();
            update.content = this.heartbeatDetector.a_e_content;
            update.sentTo = this.heartbeatDetector.a_e_sentTo;
            update.subject = this.heartbeatDetector.a_e_subject;

            this.aaasService.updateEMail(this.heartbeatDetector.d_detectorID, update)
                .pipe(finalize(() => this.loading = false)).
                    subscribe(
                    {
                        next: () => this.refresh(),
                        error: () => this.connectionError = true
                    });
            this.eMailUpdate = false;
        }
    }

    refresh() {
        this.dialog.open(LoadingDisplayComponent, { disableClose: true, 
            data: this.reload
        });
    }

}
