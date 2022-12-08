// http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    public baseUrl = 'https://zealpesa.com/';
    public oauthUrl = `${this.baseUrl}api/`;
    public apiUrl = `${this.baseUrl}api/`;
    user: any = {};
    constructor() {
        const user = window.localStorage.getItem('USER_INFO');
        this.user = (user) ? JSON.parse(user) : {};
    }

    //Endpoints
    //auth
    public postRegistrationUrl = () => `${this.apiUrl}account/register`;
    public postVerifyRegistraionUrl = () => `${this.apiUrl}account/verify`;
    public postLoginUrl = () => `${this.apiUrl}account/login`;
    public postVerifyLoginUrl = () => `${this.apiUrl}account/secondfactor`;
    
    public getResourcesUrl   = ()    => `${this.apiUrl}forex/resources`;
    public getTransactionsUrl = ()   => `${this.apiUrl}transaction`;
    public postClientOrderUrl = ()   => `${this.apiUrl}transaction/order`;

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    /** Log a  message --- centralises log switching*/
    public log(message: string) {
        // console.log(message);
    }

}
