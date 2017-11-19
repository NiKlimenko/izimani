import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, ObservableInput} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {Card} from '../card';
import {TransferPayload} from '../transfer-payload';

/**
 * Service for working with credit cards
 */
@Injectable()
export class CardService {
  private http: HttpClient;

  /**
   * @param {HttpClient} http
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Returns all user cards
   * @returns {Observable<Card[]>}
   */
  public getCurrentUserCards(): Observable<Card[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get<Card[]>('api/bankcard/user/cards').pipe(
      map((cards: Card[]) => cards.map((card: Card) => Card.CONVERT(card)))
    );
  }

  /**
   * Lock specific user card
   * @param {string} iban
   * @returns {Observable<void>}
   */
  public lockCard(iban: string): Observable<void> {
    return this.http.put(`api/bankcard/${iban}/lock`, null, {responseType: 'blob'}).pipe(
      map(() => null)
    );
  }

  /**
   * Unlock specific user card
   * @param {string} iban
   * @returns {Observable<void>}
   */
  public unLockCard(iban: string): Observable<void> {
    return this.http.put(`api/bankcard/${iban}/unlock`, null, {responseType: 'blob'}).pipe(
      map(() => null)
    );
  }

  /**
   * Transfer money to another card
   * @param {string} fromIban
   * @param {TransferPayload} payload
   * @returns {Observable<void>}
   */
  public transferToCard(fromIban: string, payload: TransferPayload): Observable<void> {
    return this.http.post(`api/cardtocard/${fromIban}/transact`, payload.convertToBE(), {responseType: 'text'}).pipe(
      map(() => null),
      catchError(this.parseError)
    );
  }

  private parseError(response: HttpErrorResponse): ObservableInput<{}> {
    const error: {ModelState: {}[]} = JSON.parse(response.error);

    const states: {}[] = error.ModelState;

    if (states) {
      return Observable.throw(states[Object.keys(states)[0]][0]);
    } else {
      return Observable.throw(null);
    }
  }
}
