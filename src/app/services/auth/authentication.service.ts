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
    this.dataService.getCache('DISTRO_USER_INFO').then((response) => {
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
  remoteLogin(username = 'admin@example.com', password = '123456'): Observable<any> {
    const request = {
      grant_type: "password",
      client_id: '2',
      client_secret: "dXdWO1A8DG5TGdumiUVDXu2ovxCxFw3gPCsrsWhX",
      username: username,
      password: password
    };
    return this.http.post(this.getTokenUrl(), request)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('remoteLogin', []))
      );
  }

  saveProfileDEdit(request:any): Observable<any> {
    return this.http.post(this.getTokenUrl(), request)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('saveProfileDEdit', []))
      );
  }

  getIn(userdata:any) {
    this.user = userdata;
    this.user.collegeId = userdata.default_college_id;
    this.user.id = userdata.user_id;
    this.user.course = userdata.default_course_id;

    window.localStorage.setItem('DISTRO_USER_INFO', JSON.stringify(this.user));
    const user = window.localStorage.getItem('DISTRO_USER_INFO');
    this.dataService.cacheData('DISTRO_USER_INFO', this.user).then((response) => {
      this.router.navigate(['home']);
      this.authState.next(true);
    });
  }

  logout() {
    this.dataService.clearCache('DISTRO_USER_INFO').then(() => {
      this.router.navigate(['']);
      this.authState.next(false);
    });
  }
  isAuthenticated() {
    return this.authState.value;
  }

}
