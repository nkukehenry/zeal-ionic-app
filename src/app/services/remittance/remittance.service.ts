import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class RemittanceService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  getResources(): Observable<any> {
    return this.http.get(this.getResourcesUrl())
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getResourcesUrl', []))
      );
  }

}
