import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { mapMetric } from 'src/app/components/utils/Mapper';
import { AaasService } from 'src/app/shared/aaas.service';
import { MetricFull } from 'src/app/shared/models/metric-full';
import { MetricDetailComponent } from '../metric-detail/metric-detail.component';

@Component({
  selector: 'app-metric-list',
  templateUrl: './metric-list.component.html',
  styleUrls: ['./metric-list.component.css']
})
export class MetricListComponent implements OnInit {

    showMetrics: MetricFull[] = [];
    metrics: MetricFull[] = [];
    connectionError: boolean = false;
    loading: boolean = false;
    loadingFilter: boolean = false;

    currentPage: any;

    constructor(private aaasService: AaasService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getAllMetrics();
    }

    showDiagramm() {
        this.dialog.open(MetricDetailComponent);
    }

    pageChanged(event:any): void {
        this.currentPage = event;
    }

    filter(value: any): void {
        this.loadingFilter = true;

        this.showMetrics = this.metrics;

        this.applyFilterName(value);
        this.applyFilterType(value);

        this.loadingFilter = false;
        this.currentPage = 1;
    }

    applyFilterType(value: any): void {
        if(value.selectedType != undefined) {
            //this.showMetrics = this.showMetrics.filter(det => det.c_state?.toLowerCase() == value.selectedType.toLowerCase());
        }
    }

    applyFilterName(value: any): void {
        if(value.selectedName != undefined) {
            //this.showMetrics = this.showMetrics.filter(det => det.d_name?.toLowerCase().includes(value.selectedName.toLowerCase()));
        }
    }

    getAllMetrics(): void {
        this.loading = true;
        this.aaasService.getAllMetrics().pipe(finalize(() => { this.loading = false; })).
            subscribe(
            {
                next: res => {
                    this.metrics = mapMetric(res);
                    this.getClientAndDetectorAndAction();
                    this.showMetrics = this.metrics;
                }, 
                error: () => this.connectionError = true
            });
    }

    getClientAndDetectorAndAction(): void {
        for(var entry of this.metrics) {
            this.getTelemetryData(entry);
        }
    }

    getTelemetryData(m: MetricFull): void {
        this.aaasService.getTelemetryDataByDataID(m.t_dataID)
            .subscribe(
                {
                    next: res => 
                                {
                                    m.c_clientID = res.clientID; 
                                    m.c_appKey = res.appKey;
                                    m.t_name = res.name;
                                    this.getClient(m);
                                },
                    error: () => this.connectionError = true
                }
        );
    }

    getClient(m: MetricFull): void {
        this.aaasService.getClientInstanceByAppKeyAndClientID(m.c_appKey, m.c_clientID)
            .subscribe(
                {
                    next: res => 
                                {  
                                    m.c_description = res.description; 
                                },
                    error: () => this.connectionError = true
                }
        );
    }

}
