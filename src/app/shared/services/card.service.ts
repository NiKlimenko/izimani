import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {Card, CardPayload, CurrencyType} from '../card';
import {TransferPayload} from '../transfer-payload';
import {parseError} from './util.service';

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
      catchError(parseError)
    );
  }

  /**
   * Creation of a new credit card
   * @param {CardPayload} payload
   * @returns {Observable<void>}
   */
  public createCard(payload: CardPayload): Observable<void> {
    return this.http.post('api/bankcard/add', payload.convertToBE(), {responseType: 'text'}).pipe(
      map(() => null),
      catchError(parseError)
    );
  }

  /**
   * Requests all cards
   * @returns {Observable<Card[]>}
   */
  public getAllCards(): Observable<Card[]> {
    //tslint:disable-next-line: no-backbone-get-set-outside-model
    return this.http.get('api/bankcard/all').pipe(
      map((cards: Card[]) => cards.map((card: Card) => Card.CONVERT(card)))
    );
  }

  /**
   * Funding provided card
   * @param {string} iban
   * @param {number} amount
   * @param {CurrencyType} currencyType
   * @returns {Observable<any>}
   */
  public fundCard(iban: string, amount: number, currencyType: CurrencyType): Observable<null> {
    return this.http.put(`api/bill/${iban}`, {amount: amount, currency_type: currencyType}, {responseType: 'text'}).pipe(
      map(() => null),
      catchError(parseError)
    );
  }

  /**
   * Deletes provided card
   * @param {string} iban
   * @returns {Observable<any>}
   */
  public deleteCard(iban: string): Observable<null> {
    return this.http.delete(`api/bankcard/${iban}`, {responseType: 'text'}).pipe(
      map(() => null),
      catchError(parseError)
    );
  }
}
