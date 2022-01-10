import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import * as moment from 'moment';

import { LogMessage } from './models/log-message';
import { TelemetryData } from './models/telemetry-data';
import { ClientInstance } from './models/client-instance';
import { Detector } from './models/detector';
import { HeartbeatDetector } from './models/heartbeat-detector';
import { HeartbeatDetectorUpdate } from './models/heartbeat-detector-update';
import { Action } from './models/action';
import { EMail } from './models/e-mail';
import { EMailUpdate } from './models/e-mail-update';
import { WebHook } from './models/web-hook';
import { WebHookUpdate } from './models/web-hook-update';


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

    getAllLogMessagebyDate(start: string = "", end: string = ""): Observable<Array<LogMessage>> { 
        return this.http.get<any>(`${environment.server}/logMessages/allByDates`, {
                    params: {
                        StartTime: start == "" || start == null ? "1970-01-01T00:00" : start,
                        EndTime: end == "" || end == null ? moment().utcOffset(0, true).format() : end
                    }
                }).pipe(catchError(this.errorHandler));
    }

    getAllLogMessageByClientInstance(clientID: string): Observable<Array<LogMessage>> {
        return this.http.get<any>(`${environment.server}/logMessages/allByClientId/${clientID}`)
            .pipe(catchError(this.errorHandler));
    }

    getAllLogMessageByClientInstanceByTime(clientID: string, start: string = "", end: string = ""): Observable<Array<LogMessage>> {    
        return this.http.get<any>(`${environment.server}/logMessages/allByClientIdAndDate`, {
                    params: {
                        ClientId: clientID,
                        StartTime: start == "" || start == null ? "1970-01-01T00:00" : start,
                        EndTime: end == "" || end == null ? moment().utcOffset(0, true).format() : end
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

    getAllHeartbeatDetectors(): Observable<Array<HeartbeatDetector>> {
        return this.http.get<any>(`${environment.server}/heartbeatDetectors`)
            .pipe(catchError(this.errorHandler));
    }

    updateHeartbeatDetector(id?: string, hb?: HeartbeatDetectorUpdate): Observable<Array<HeartbeatDetector>> {
        return this.http.put<any>(`${environment.server}/heartbeatDetectors/${id}`, hb)
            .pipe(catchError(this.errorHandler));
    }

    getDetectorByID(id?: string): Observable<Detector> { 
        return this.http.get<any>(`${environment.server}/detectors/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    getActionByDetectorID(id?: string): Observable<Action> {
        return this.http.get<any>(`${environment.server}/actions/byDetectorId/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    getEMailByDetectorID(id?: string): Observable<EMail> {
        return this.http.get<any>(`${environment.server}/eMails/byDetectorId/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    updateEMail(id?: string, em?: EMailUpdate): Observable<Array<HeartbeatDetector>> {
        return this.http.put<any>(`${environment.server}/eMails/${id}`, em)
            .pipe(catchError(this.errorHandler));
    }

    getWebHookByDetectorID(id?: string): Observable<WebHook> {
        return this.http.get<any>(`${environment.server}/webHooks/byDetectorId/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    updateWebHook(id?: string, wh?: WebHookUpdate): Observable<Array<HeartbeatDetector>> {
        return this.http.put<any>(`${environment.server}/webHooks/${id}`, wh)
            .pipe(catchError(this.errorHandler));
    }
}
