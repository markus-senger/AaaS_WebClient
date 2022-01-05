import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LogMessage } from './models/log-message';
import { TelemetryData } from './models/telemetry-data';
import { ClientInstance } from './models/client-instance';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AaasService {

    constructor(private http: HttpClient) { }

    private createDate(date: string, endFlag: boolean = false): string {
        if(endFlag && date == null) {
            console.log(new Date().toJSON());
            return new Date().toJSON();
        }
        var d = new Date(date);
        d.setHours(d.getHours() + 1);
        if(endFlag) d.setHours(d.getHours() + 24);
        return d.toJSON();
    }

    private errorHandler(error: Error | any): Observable<any> {
        console.log(error);
        return throwError(() => "Server Error");  
    } 

    getAllLogMessage(): Observable<Array<LogMessage>> {
        return this.http.get<any>(`${environment.server}/logMessages`)
            .pipe(catchError(this.errorHandler));
    }

    getAllLogMessagebyDate(start: string = "0000", end: string = ""): Observable<Array<LogMessage>> {   
        return this.http.get<any>(`${environment.server}/logMessages/allByDates`, {
                    params: {
                        StartTime: this.createDate(start),
                        EndTime: this.createDate(end, true)
                    }
                }).pipe(catchError(this.errorHandler));
    }

    getAllLogMessageByClientInstance(clientID: string): Observable<Array<LogMessage>> {
        return this.http.get<any>(`${environment.server}/logMessages/allByClientId/${clientID}`)
            .pipe(catchError(this.errorHandler));
    }

    getAllLogMessageByClientInstanceByTime(clientID: string, start: string = "0000", end: string = ""): Observable<Array<LogMessage>> {    
        return this.http.get<any>(`${environment.server}/logMessages/allByClientIdAndDate`, {
                    params: {
                        ClientId: clientID,
                        StartTime: this.createDate(start),
                        EndTime: this.createDate(end, true)
                    }
                }).pipe(catchError(this.errorHandler));
    }

    getLogMessageByDataIDAndEntryID(dataID?: string, entryID?: string): Observable<LogMessage> {
        return this.http.get<any>(`${environment.server}/logMessages/${dataID}/${entryID}`)
            .pipe(catchError(this.errorHandler));
    }

    getTelemetryDataByDataID(dataID?: string): Observable<TelemetryData> {
        return this.http.get<any>(`${environment.server}/telemetryData/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getAllClientInstance(): Observable<Array<ClientInstance>> {
        return this.http.get<any>(`${environment.server}/clientInstances`)
            .pipe(catchError(this.errorHandler));
    }

    getClientInstanceByAppKeyAndClientID(appKey?: string, clientID?: string): Observable<ClientInstance> {
        return this.http.get<any>(`${environment.server}/clientInstances/${appKey}/${clientID}`)
            .pipe(catchError(this.errorHandler));
    }
}
