import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, map, publishReplay, refCount} from 'rxjs/operators';
import {User} from '../user';
import {parseError} from './util.service';

/**
 * Service for forking with users
 */

@Injectable()
export class UserService {
  private http: HttpClient;
  private currentUser: Observable<User>;

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Method for creation user
   * @param {User} user
   * @param {string} password
   * @param {string} confirmPassword
   * @returns {Observable<User | {}>}
   */
  public createUser(user: User, password: string, confirmPassword: string): Observable<User|{}> {
    return this.http.post('api/account/register',
      {...user.convertToBE(), ...{password: password, confirm_password: confirmPassword}},
      {responseType: 'text'})
      .pipe(
        catchError(parseError)
      );
  }

  /**
   * Returns current user
   * @returns {Observable<User>}
   */
  public getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      this.currentUser = this.requestCurrentUser();

      return this.currentUser;
    }
  }

  /**
   * Removes cached current user
   * Next request to API will update current user
   */
  public clearUserCache() {
    this.currentUser = null;
  }

  private requestCurrentUser(): Observable<User> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get<User>('api/account/userinfo').pipe(
      map((user: {}) => User.CONVERT(user)),
      publishReplay(1),
      refCount()
    );
  }
}
