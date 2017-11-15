import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Card} from '../card';

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
}
