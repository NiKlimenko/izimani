import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
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

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Authenticate the user by credentials and save the authentication token in the local storage
   * @param {UserCredentials} credentials
   * @returns {Observable<void>}
   */
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

  /**
   * Logged out user from API and remove the authentication token from the local storage
   * @returns {Observable<void>}
   */
  public logOut(): Observable<void> {
    return this.http.post('api/account/logout', null, {responseType: 'blob'}).pipe(
      map((e: {}) => window.localStorage.removeItem(AppConfig.lsTokenName))
    );
  }
}
