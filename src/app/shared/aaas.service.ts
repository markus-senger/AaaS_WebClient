import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import * as moment from 'moment';

import { TelemetryData } from './models/telemetry-data';
import { Metric } from './models/metric';
import { LogMessage } from './models/log-message';
import { ClientInstance } from './models/client-instance';
import { Detector } from './models/detector';
import { HeartbeatDetector } from './models/heartbeat-detector';
import { HeartbeatDetectorUpdate } from './models/heartbeat-detector-update';
import { MetricDetector } from './models/metric-detector';
import { SlidingWindowDetectorUpdate } from './models/sliding-window-detector-update';
import { MinMaxDetectorUpdate } from './models/min-max-detector-update';
import { Action } from './models/action';
import { EMail } from './models/e-mail';
import { EMailUpdate } from './models/e-mail-update';
import { EMailInsert } from './models/e-mail-insert';
import { WebHook } from './models/web-hook';
import { WebHookUpdate } from './models/web-hook-update';
import { WebHookInsert } from './models/web-hook-insert';
import { MinMaxDetectorInsert } from './models/min-max-detector-insert';
import { SlidingWindowDetectorInsert } from './models/sliding-window-detector-insert';
import { Counter } from './models/counter';
import { TimeInterval } from './models/time-interval';
import { Measurement } from './models/measurement';


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

    getTelemetryDataByDataID(dataID?: string): Observable<TelemetryData> {
        return this.http.get<any>(`${environment.server}/telemetryData/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getAllMetrics(): Observable<Array<Metric>> {
        return this.http.get<any>(`${environment.server}/metrics`)
            .pipe(catchError(this.errorHandler));
    }

    getMetricByDataID(dataID?: string): Observable<Metric> {
        return this.http.get<any>(`${environment.server}/metrics/byDataId/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getCounterByDataIdAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<Counter>> {        
        return this.http.get<any>(`${environment.server}/counters/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getLastInsertedCounter(dataID?: string): Observable<Counter> {
        return this.http.get<any>(`${environment.server}/counter/lastInsert/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getCountersByDataIDAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<Counter>> {
        return this.http.get<any>(`${environment.server}/counters/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getMeasurementByDataIdAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<Measurement>> {        
        return this.http.get<any>(`${environment.server}/measurements/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getLastInsertedMeasurement(dataID?: string): Observable<Measurement> {
        return this.http.get<any>(`${environment.server}/measurements/lastInsert/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getMeasurementsByDataIDAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<Measurement>> {
        return this.http.get<any>(`${environment.server}/measurements/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getTimeIntervalByDataIdAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<TimeInterval>> {        
        return this.http.get<any>(`${environment.server}/timeIntervals/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getLastInsertedTimeInterval(dataID?: string): Observable<TimeInterval> {
        return this.http.get<any>(`${environment.server}/timeInterval/lastInsert/${dataID}`)
            .pipe(catchError(this.errorHandler));
    }

    getTimeIntervalsByDataIDAndDate(dataID: string, startDate: string, endDate: string): Observable<Array<TimeInterval>> {
        return this.http.get<any>(`${environment.server}/timeIntervals/allByDataIdAndDate`, {
                    params: {
                            DataId: dataID,
                            StartTime: startDate,
                            EndTime: endDate
                        }
                    }).pipe(catchError(this.errorHandler));
    }

    getLogMessageByDataIDAndEntryID(dataID?: string, entryID?: string): Observable<LogMessage> {
        return this.http.get<any>(`${environment.server}/logMessages/${dataID}/${entryID}`)
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

    updateHeartbeatDetector(id?: string, hb?: HeartbeatDetectorUpdate): Observable<HeartbeatDetector> {
        return this.http.put<any>(`${environment.server}/heartbeatDetectors/${id}`, hb)
            .pipe(catchError(this.errorHandler));
    }

    deleteHeartbeatDetector(id?: string): Observable<HeartbeatDetector> {
        return this.http.delete<any>(`${environment.server}/heartbeatDetectors/${id}`);
    }

    getAllMinMaxDetectors(): Observable<Array<MetricDetector>> {
        return this.http.get<any>(`${environment.server}/minMaxDetectors`)
            .pipe(catchError(this.errorHandler));
    }

    updateMinMaxDetector(id?: string, mm?: MinMaxDetectorUpdate): Observable<MetricDetector> {
        return this.http.put<any>(`${environment.server}/minMaxDetectors/${id}`, mm)
            .pipe(catchError(this.errorHandler));
    }

    insertMinMaxDetector(mm?: MinMaxDetectorInsert): Observable<MetricDetector> {
        return this.http.post<any>(`${environment.server}/minMaxDetector`, mm)
            .pipe(catchError(this.errorHandler));
    }

    deleteMinMaxDetector(id?: string): Observable<any> {
        return this.http.delete(`${environment.server}/minMaxDetectors/${id}`, {"responseType": 'text'})
            .pipe(catchError(this.errorHandler));
    }

    getAllSlidingWindowDetectors(): Observable<Array<MetricDetector>> {
        return this.http.get<any>(`${environment.server}/slidingWindowDetectors`)
            .pipe(catchError(this.errorHandler));
    }

    updateSlidingWindowDetector(id?: string, sw?: SlidingWindowDetectorUpdate): Observable<MetricDetector> {
        return this.http.put<any>(`${environment.server}/slidingWindowDetectors/${id}`, sw)
            .pipe(catchError(this.errorHandler));
    }

    deleteSlidingWindowDetector(id?: string): Observable<any> {
        return this.http.delete(`${environment.server}/slidingWindowDetectors/${id}`, {"responseType": 'text'})
            .pipe(catchError(this.errorHandler));
    }

    insertSlidingWindowDetector(sw?: SlidingWindowDetectorInsert): Observable<MetricDetector> {
        return this.http.post<any>(`${environment.server}/slidingWindowDetector`, sw)
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

    updateEMail(id?: string, em?: EMailUpdate): Observable<EMail> {
        return this.http.put<any>(`${environment.server}/eMails/${id}`, em)
            .pipe(catchError(this.errorHandler));
    }

    deleteEMail(id?: string): Observable<any> {
        return this.http.delete(`${environment.server}/eMails/${id}`, {"responseType": 'text'})
            .pipe(catchError(this.errorHandler));
    }

    insertEMail(em?: EMailInsert): Observable<EMail> {
        return this.http.post<any>(`${environment.server}/eMail`, em)
            .pipe(catchError(this.errorHandler));
    }

    getWebHookByDetectorID(id?: string): Observable<WebHook> {
        return this.http.get<any>(`${environment.server}/webHooks/byDetectorId/${id}`)
            .pipe(catchError(this.errorHandler));
    }

    updateWebHook(id?: string, wh?: WebHookUpdate): Observable<WebHook> {
        return this.http.put<any>(`${environment.server}/webHooks/${id}`, wh)
            .pipe(catchError(this.errorHandler));
    }

    insertWebHook(wh?: WebHookInsert): Observable<WebHook> {
        return this.http.post<any>(`${environment.server}/webHook`, wh)
            .pipe(catchError(this.errorHandler));
    }

    deleteWebHook(id?: string): Observable<string> {
        return this.http.delete(`${environment.server}/webHooks/${id}`, {"responseType": 'text'})
            .pipe(catchError(this.errorHandler));
    }
}
