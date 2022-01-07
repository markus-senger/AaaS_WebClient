import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AaasService } from 'src/app/shared/aaas.service';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-client-instance',
  templateUrl: './client-instance-list.component.html',
  styleUrls: ['./client-instance-list.component.css']
})
export class ClientInstanceListComponent implements OnInit {

    clientInstance: ClientInstance[] = [];
    loading: boolean = false;
    loadingFilter: boolean = false;
    connectionError: boolean = false;

    currentPage: any;

    displayedColumns: string[] = ['description', 'status', 'heartbeat'];

    constructor(private aaasService: AaasService) { }

    ngOnInit(): void {
        this.loading = true;
        this.aaasService.getAllClientInstance().pipe(finalize(() => this.loading = false)).
            subscribe(
            {
                next: res => this.clientInstance = res, 
                error: () => this.connectionError = true
            });
    }

    pageChanged(event:any): void {
        this.currentPage = event;
    }

    filter(value: any): void {
        this.loadingFilter = true;
        this.aaasService.getAllClientInstance()
            .pipe(finalize(() => this.loadingFilter = false)).subscribe(
            {
                next: res => 
                            {  
                                this.clientInstance = res; 
                                this.applyFilterDescription(value);
                                this.applyFilterState(value);
                            },
                error: () => this.connectionError = true
            }
        );
    }

    applyFilterDescription(value: any): void {
        if(value.selectedDescription != undefined) {
            this.clientInstance = this.clientInstance.filter(c => c.description?.toLowerCase().includes(value.selectedDescription.toLowerCase()));
        }
    }

    applyFilterState(value: any): void {
        if(value.selectedState != undefined) {
            this.clientInstance = this.clientInstance.filter(c => c.state?.toLowerCase() == value.selectedState.toLowerCase());
        }
    }
}
