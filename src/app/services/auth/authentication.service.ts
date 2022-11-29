import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Injectable()
export class AuthenticationService extends BaseService {

  authState = new BehaviorSubject(false);
  authToken = null;

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private dataService: DataService,
    private http: HttpClient,
  ) {
    super();
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.dataService.getCache('ZEAL_USER_INFO').then((response) => {
      if (response) {
        this.user = response;
        this.authState.next(true);
      }
    });
  }

  remoteRegister(request:any): Observable<any> {
    return this.http.post(this.postRegistrationUrl(), request)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('remoteRegister', []))
      );
  }

  remoteLogin(request:any): Observable<any> {
    
    return this.http.post(this.getLoginUrl(), request)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('remoteLogin', []))
      );
  }

  saveProfileDEdit(request:any): Observable<any> {
    return this.http.post(this.getLoginUrl(), request)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('saveProfileDEdit', []))
      );
  }

  getIn(userdata:any) {

    this.user    = userdata;
    this.user.id = userdata.id;

    window.localStorage.setItem('ZEAL_USER_INFO', JSON.stringify(this.user));

    const user = window.localStorage.getItem('ZEAL_USER_INFO');
    this.dataService.cacheData('ZEAL_USER_INFO', this.user).then((response) => {

      this.router.navigate(['tabs']);
      this.authState.next(true);
      
    });
  }

  logout() {
    this.dataService.clearCache('ZEAL_USER_INFO').then(() => {
      this.router.navigate(['']);
      this.authState.next(false);
    });
  }
  isAuthenticated() {
    return this.authState.value;
  }

}
