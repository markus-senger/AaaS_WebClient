import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AaasService } from 'src/app/shared/aaas.service';
import { MetricDetector } from 'src/app/shared/models/metric-detector';
import { HeartbeatDetectorUpdate } from 'src/app/shared/models/heartbeat-detector-update';
import { finalize } from 'rxjs';
import { WebHookUpdate } from 'src/app/shared/models/web-hook-update';
import { EMailUpdate } from 'src/app/shared/models/e-mail-update';
import { SlidingWindowDetectorUpdate } from 'src/app/shared/models/sliding-window-detector-update';
import { MinMaxDetectorUpdate } from 'src/app/shared/models/min-max-detector-update';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDetectorComponent } from 'src/app/components/remove-detector/remove-detector.component';
import { LoadingDisplayComponent } from 'src/app/components/loading-display/loading-display.component';

@Component({
  selector: 'app-metric-detector-item',
  templateUrl: './metric-detector-item.component.html',
  styleUrls: ['./metric-detector-item.component.css']
})
export class MetricDetectorItemComponent {

    @Input() metricDetector: MetricDetector = new MetricDetector();
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

        this.metricDetector.d_active = this.metricDetector.d_active == true ? false : true;
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
        if(this.metricDetector.a_w_url == undefined) {
            this.aaasService.deleteEMail(this.metricDetector.a_actionID).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
        else {
            this.aaasService.deleteWebHook(this.metricDetector.a_actionID).
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
            if(this.metricDetector.d_m_min == undefined) {
                var updateSliding = new SlidingWindowDetectorUpdate();
                updateSliding.timeInterval = this.metricDetector.d_s_timeInterval;
                updateSliding.aggregationOp = this.metricDetector.d_s_aggregationOp;
                updateSliding.threshold = this.metricDetector.d_s_threshold;
                updateSliding.comparisonOp = this.metricDetector.d_s_comparisonOp;
                updateSliding.name = this.metricDetector.d_name;
                updateSliding.timeBetweenChecks = this.metricDetector.d_timeBetweenChecks;
                updateSliding.active = this.metricDetector.d_active;

                this.aaasService.updateSlidingWindowDetector(this.metricDetector.d_detectorID, updateSliding)
                    .pipe(finalize(() => this.loading = false)).
                        subscribe(
                        {
                            next: () => this.refresh(),
                            error: () => this.connectionError = true
                        });
            }
            else {
                var updateMinMax = new MinMaxDetectorUpdate();
                updateMinMax.min = this.metricDetector.d_m_min;
                updateMinMax.max = this.metricDetector.d_m_max;
                updateMinMax.threshold = this.metricDetector.d_m_threshold;
                updateMinMax.name = this.metricDetector.d_name;
                updateMinMax.timeBetweenChecks = this.metricDetector.d_timeBetweenChecks;
                updateMinMax.active = this.metricDetector.d_active;

                this.aaasService.updateMinMaxDetector(this.metricDetector.d_detectorID, updateMinMax)
                    .pipe(finalize(() => this.loading = false)).
                        subscribe(
                        {
                            next: () => this.refresh(),
                            error: () => this.connectionError = true
                        });
            }
            this.detectorUpdate = false;
        }
    }

    removeDetectorAndAction(): void {
        let dialogRef = this.dialog.open(RemoveDetectorComponent, {
            data: {
                message: 'Detektor wirklich löschen?',
                buttonText: {
                    ok: 'Löschen',
                    cancel: 'Abbrechen'
                }
            }
        });
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if(confirmed) {
                this.removeDetectorAfterAction();
            }
        });
    }

    removeDetectorAfterAction(): void {
        if(this.metricDetector.a_w_url != undefined) {
            this.aaasService.deleteWebHook(this.metricDetector.a_actionID).
                subscribe(
                {
                    next: () => this.removeDetector(),
                    error: () => this.connectionError = true
                });
        }
        else if(this.metricDetector.a_e_sentTo != undefined) {
            this.aaasService.deleteEMail(this.metricDetector.a_actionID).
                subscribe(
                {
                    next: () => this.removeDetector(),
                    error: () => this.connectionError = true
                });
        }
        else {
            this.removeDetector()
        }
    }

    removeDetector(): void {
        if(this.metricDetector.d_m_min != undefined) {
            this.aaasService.deleteMinMaxDetector(this.metricDetector.d_detectorID).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
        else if(this.metricDetector.d_s_aggregationOp != undefined) {
            this.aaasService.deleteSlidingWindowDetector(this.metricDetector.d_detectorID).
                subscribe(
                {
                    next: () => this.refresh(),
                    error: () => this.connectionError = true
                });
        }
    }

    refresh() {
        this.dialog.open(LoadingDisplayComponent, { disableClose: true, 
            data: this.reload
        });
    }
}
