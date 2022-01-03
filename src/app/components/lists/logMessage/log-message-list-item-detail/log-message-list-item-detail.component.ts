import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AaasService } from 'src/app/shared/aaas.service';
import { ClientInstance } from 'src/app/shared/models/client-instance';
import { LogMessage } from 'src/app/shared/models/log-message';
import { TelemetryData } from 'src/app/shared/models/telemetry-data';

@Component({
  selector: 'app-log-message-list-item-detail',
  templateUrl: './log-message-list-item-detail.component.html',
  styleUrls: ['./log-message-list-item-detail.component.css']
})
export class LogMessageListItemDetailComponent implements OnInit {

  @Input() logMessage: LogMessage = new LogMessage();
  telemetryData: TelemetryData = new TelemetryData();
  clientInstance: ClientInstance = new ClientInstance();
  connectionError: boolean = false;

  constructor(private route: ActivatedRoute, 
              private aaasService: AaasService) { }

  ngOnInit(): void { 
    this.aaasService.getTelemetryDataByDataID(this.logMessage.dataID)
      .subscribe({next: res => { this.telemetryData = res; this.getClientInstance(); }, error: () => this.connectionError = true});
  }

  getClientInstance(): void {
    this.aaasService.getClientInstanceByAppKeyAndClientID(this.telemetryData.appKey, this.telemetryData.clientID)
      .subscribe({next: res => this.clientInstance = res, error: () => this.connectionError = true});
  }

}
