import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {CurrencyRate} from '../currency-rate';

/**
 * Service for working with currencies
 */

@Injectable()
export class CurrencyService {
  private http: HttpClient;

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Returns all currency rates
   * Can be truncated to provided number
   * @param {number} takeNumber
   * @returns {Observable<CurrencyRate[]>}
   */
  public getCurrencyRates(takeNumber?: number): Observable<CurrencyRate[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get<CurrencyRate[]>('api/exchangerates/all').pipe(
      map((rates: CurrencyRate[]) => rates.slice(0, takeNumber).map((rate: CurrencyRate) => CurrencyRate.CONVERT(rate))),
      publishReplay(1),
      refCount()
    );
  }

  /**
   * Returns all available currencies
   * @returns {Observable<string[]>}
   */
  public getCurrencies(): Observable<string[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get<string[]>('api/exchangerates/available').pipe(
      publishReplay(1),
      refCount()
    );
  }
}
