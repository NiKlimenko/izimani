import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AppAlertParams} from '../../dashboard/app-alert/app-alert.component';

/**
 * Service for working with app level alerts
 */

@Injectable()
export class AppAlertService {

  /**
   * Notification observer.
   * Don't use it directly
   * @type {Subject<any>}
   */
  public requestToShowAlert: Subject<AppAlertParams> = new Subject();

  /**
   * Show an alert with parameters
   * @param {AppAlertParams} params
   */
  public showAlert(params: AppAlertParams) {
    this.requestToShowAlert.next(params);
  }
}
