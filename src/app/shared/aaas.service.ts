import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LogMessage } from './modules/log-message';
import { TelemetryData } from './modules/telemetry-data';
import { ClientInstance } from './modules/client-instance';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AaasService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return throwError(() => "Server Error");  
  } 

  getAllLogMessage(): Observable<Array<LogMessage>> {
    return this.http.get<any>(`${environment.server}/logMessages`)
      .pipe(catchError(this.errorHandler));
  }

  getLogMessageByDataIDAndEntryID(dataID?: string, entryID?: string): Observable<LogMessage> {
    return this.http.get<any>(`${environment.server}/logMessages/${dataID}/${entryID}`)
      .pipe(catchError(this.errorHandler));
  }

  getTelemetryDataByDataID(dataID?: string): Observable<TelemetryData> {
    return this.http.get<any>(`${environment.server}/telemetryData/${dataID}`)
        .pipe(catchError(this.errorHandler));
  }

  getClientInstanceByAppKeyAndClientID(appKey?: string, clientID?: string): Observable<ClientInstance> {
    return this.http.get<any>(`${environment.server}/clientInstances/${appKey}/${clientID}`)
        .pipe(catchError(this.errorHandler));
  }
}
