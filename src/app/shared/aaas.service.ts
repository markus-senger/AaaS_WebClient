import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LogMessage } from './modules/log-message';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AaasService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  getAllLogMessage(): Observable<Array<LogMessage>> {
      return this.http.get<any>(`${environment.server}/logMessages`)
        .pipe(catchError(this.errorHandler));
  }
}
