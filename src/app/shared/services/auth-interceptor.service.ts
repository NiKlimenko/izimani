import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import {Observable, ObservableInput} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {AppConfig} from '../app.config';

/**
 * Authentication interceptor.
 * Adds the auth header for every request if the auth token exists.
 */

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    const token: string = window.localStorage.getItem(AppConfig.lsTokenName);

    if (token) {
      const authRequest: HttpRequest<{}> = req.clone(
        //tslint:disable-next-line: no-backbone-get-set-outside-model
        {headers: req.headers.set('Authorization', `Bearer ${token}`)}
      );

      return next.handle(authRequest).pipe(catchError((error: HttpErrorResponse) => this.handleUnauthorize(error)));
    } else {
      return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleUnauthorize(error)));
    }
  }

  private handleUnauthorize(error: HttpErrorResponse): ObservableInput<HttpEvent<{}>> {
    if (error.status === 401) {
      this.router.navigateByUrl('/login');
    }

    return Observable.of(error);
  }
}
