import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, map, publishReplay, refCount} from 'rxjs/operators';
import {AutoPayment, PaymentPayload} from '../payment';
import {PaymentProvider} from '../payment-provider';
import {parseError} from './util.service';

/**
 * Service for working with payments
 */

@Injectable()
export class PaymentsService {

  private http: HttpClient;
  private availablePayments: Observable<PaymentProvider[]>;

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get available payment providers
   * @returns {Observable<PaymentProvider[]>}
   */
  public getAvailablePayments(): Observable<PaymentProvider[]> {
    if (this.availablePayments) {
      return this.availablePayments;
    } else {
      this.availablePayments = this.requestAvailablePayments();

      return this.availablePayments;
    }
  }

  /**
   * Clear cached available payment providers
   */
  public clearAvailablePaymentsCache() {
    this.availablePayments = null;
  }

  /**
   * Pay for the services
   *
   * @param {string} serviceId
   * @param {PaymentPayload} payload
   * @returns {Observable<void>}
   */
  public payService(serviceId: string, payload: PaymentPayload): Observable<void> {
    return this.http.post(`api/paymentservice/${serviceId}/pay`, payload.convertToBE(), {responseType: 'text'}).pipe(
      map(() => null),
      catchError(parseError)
    );
  }

  /**
   * Get auto payments
   * @returns {Observable<AutoPayment[]>}
   */
  public getAutoPayments(): Observable<AutoPayment[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get('api/autopayment').pipe(
      map((autoPayments: AutoPayment[]) => autoPayments.map((autoPayment: AutoPayment) => AutoPayment.CONVERT(autoPayment)))
    );
  }

  /**
   * Delete auto payment
   * @param {string} autoPaymentId
   * @returns {Observable<any>}
   */
  public deleteAutoPayment(autoPaymentId: string): Observable<null> {
    return this.http.delete(`api/autopayment/${autoPaymentId}`, {responseType: 'text'}).pipe(
      map(() => null),
      catchError(parseError)
    );
  }

  private requestAvailablePayments(): Observable<PaymentProvider[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get('api/paymentservice/available').pipe(
      map((providers: PaymentProvider[]) => providers.map((provider: PaymentProvider) => PaymentProvider.CONVERT(provider))),
      publishReplay(1),
      refCount()
    );
  }
}
