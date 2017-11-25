import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Transaction} from '../transaction';

/**
 * Service for working with transactions
 */

@Injectable()
export class TransactionsService {

  private http: HttpClient;

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Gets transactions
   * @param {string} iban
   * @returns {Observable<Transaction[]>}
   */
  public getTransactions(iban?: string): Observable<Transaction[]> {
    const url: string = iban ? `api/transaction/${iban}` : 'api/transaction';

    return this.http.get(url).pipe(
      map((transaction: Transaction[]) => transaction.map((trans: Transaction) => Transaction.CONVERT(trans)))
    );
  }
}
