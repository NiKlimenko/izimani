import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {AppConfig} from '../app.config';
import {User} from '../user';

/**
 * User credentials data type
 */
export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * Authentication service
 */
@Injectable()
export class AuthService {
  private http: HttpClient;
  private currentUser: Observable<User>;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public authenticate(credentials: UserCredentials): Observable<void> {
    const credentialsForm: URLSearchParams = new URLSearchParams();
    credentialsForm.append('grant_type', 'password');
    Object.keys(credentials).forEach((property: string) => credentialsForm.append(property, credentials[property]));

    return this.http.post('token', credentialsForm.toString()).pipe(
      map((response: {access_token: string}) => {
        window.localStorage.setItem(AppConfig.lsTokenName, response.access_token);
      })
    );
  }

  public logOut(): Observable<void> {
    return this.http.post('api/account/logout', null, {responseType: 'blob'}).pipe(
      map((e: {}) => window.localStorage.removeItem(AppConfig.lsTokenName))
    );
  }

  public getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      this.currentUser = this.requestCurrentUser();

      return this.currentUser;
    }
  }

  public clearUserCache() {
    this.currentUser = null;
  }

  private requestCurrentUser(): Observable<User> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get<User>('api/account/userinfo').pipe(
      publishReplay(1),
      refCount()
    );
  }
}
