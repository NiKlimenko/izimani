import {Component, ViewChild} from '@angular/core';
import {Alert} from 'clarity-angular';
import {AppAlertService} from '../../shared/services/app-alert.service';

/**
 * Class for working with app level alert parameters
 */
export class AppAlertParams {
  public alertType: string;
  public isClosable: boolean;
  public isSmall: boolean;
  public alertText: string;
  public duration: number;

  /**
   * @param {string} alertText - text to show in the alert
   * @param {number} duration - duration of the alert in milliseconds
   * @param {string} alertType
   * @param {boolean} isClosable
   * @param {boolean} isSmall
   */
  constructor(alertText: string, duration?: number, alertType: string = 'info', isClosable: boolean = true, isSmall: boolean = false) {
    this.alertType = alertType;
    this.isClosable = isClosable;
    this.isSmall = isSmall;
    this.alertText = alertText;
    this.duration = duration;
  }
}

/**
 * App level alert component
 */

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.scss']
})
export class AppAlertComponent {

  @ViewChild('alert')
  public alert: Alert;

  public alertType: string;
  public isClosable: boolean;
  public isSmall: boolean;
  public alertText: string;
  public isAlertClosed: boolean = true;

  /**
   * @param {AppAlertService} appAlertService
   */
  constructor(appAlertService: AppAlertService) {
    appAlertService.requestToShowAlert.subscribe((params: AppAlertParams) => this.show(params));
  }

  /**
   * Show an alert with the provided parameters
   * @param {AppAlertParams} params
   */
  public show(params: AppAlertParams) {

    this.alertText = params.alertText;
    this.alertType = params.alertType;
    this.isClosable = params.isClosable;
    this.isSmall = params.isSmall;

    this.alert.open();

    if (params.duration) {
      setTimeout(() => this.hide(), params.duration);
    }
  }

  /**
   * Hide an alert
   */
  public hide() {
    this.alertText = '';

    this.alert.close();
  }
}
