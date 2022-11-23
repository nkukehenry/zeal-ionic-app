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

    public baseUrl = 'http://artisandistro.io/';
    public oauthUrl = `${this.baseUrl}oauth/`;
    public apiUrl = `${this.baseUrl}api/`;
    user: any = {};
    constructor() {
        const user = window.localStorage.getItem('USER_INFO');
        this.user = (user) ? JSON.parse(user) : {};
    }

    //Endpoints
    //auth
    public postRegistrationUrl = () => `${this.baseUrl}user/register`;
    public getTokenUrl = () => `${this.oauthUrl}token`;
    // eslint-disable-next-line max-len
    public getProductsUrl = (limit:any, SortField:any, SortType:any, search:any) => `${this.apiUrl}Products?limit=${limit}&SortField=${SortField}&SortType=${SortType}&search=${search}`;
    public getProductDetailsUrl = (id:any) => `${this.apiUrl}Products/Detail/${id}`;
    public getClientPaymentsUrl = (id:any) => `${this.apiUrl}report/client_payments`;
    public getClientOrdersUrl = (id:any, limit:any) => `${this.apiUrl}report/client_Sales?id=${id}&limit=${limit}`;
    public postClientOrderUrl = () => `${this.apiUrl}sales`;
    public getClientOrderPaymentsUrl = (orderId:any) => `${this.apiUrl}sales/payments/${orderId}`;
    public getResourcesUrl = () => `${this.apiUrl}resources`;

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
