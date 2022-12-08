//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  loaderToShow: any;
  constructor(public uiService: UiService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    //Authentication by setting header with token value
    // if (this.authService.authToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this.authService.authToken}`
    //     }
    //   });
    // }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: { 'content-type': 'application/json' }
      });
    }
    request = request.clone({
      headers: request.headers.set('timeout',`${20000}`)
    })

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    this.log(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // this.hideLoader();
        if (event instanceof HttpResponse) {
          this.log(event);
          if (event.status !== 200) {
            this.uiService.showAlert(`An Error has occurred <br><b></b>${event.body?.message}</b>`);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.log(error);
        //this.hideLoader();
        return throwError(error);
      }));
  }

  log(message:any) {
    console.log(message);
  }

}
