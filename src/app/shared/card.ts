//tslint:disable:variable-name

import {DBRelation, ObjectModel} from './object-model';

/**
 * Type describes the payment systems
 */
export type PaymentSystemType = 'visa'|'master_card';

/**
 * Type describes the card type
 */
export type CardType = 'standard'|'classic'|'gold';

/**
 * Type described currency type
 */
export type CurrencyType = 'USD'|'EUR';

/**
 * Credit card model
 */
export class Card extends ObjectModel<Card> {

  public RELATIONS: DBRelation[] = [
    {BE: 'IBAN', FE: 'iban'},
    {BE: 'payment_system_type', FE: 'paymentSystemType'},
    {BE: 'card_type', FE: 'cardType'},
    {BE: 'card_number', FE: 'cardNumber'},
    {BE: 'currency_type', FE: 'currencyType'},
    {BE: 'CVV', FE: 'cvv'},
    {BE: 'amount', FE: 'amount'},
    {BE: 'PIN', FE: 'pin'},
    {BE: 'expiration_date', FE: 'expirationDate'},
    {BE: 'locked', FE: 'isLocked'},
    {BE: 'first_name', FE: 'holderName'},
    {BE: 'last_name', FE: 'holderLastName'}
  ];

  public amount: number;
  public iban: string;
  public paymentSystemType: PaymentSystemType;
  public cardType: CardType;
  public cardNumber: string;
  public currencyType: CurrencyType;
  public cvv: string;
  public pin: string;
  public expirationDate: string;
  public isLocked: boolean;
  public holderName: string;
  public holderLastName: string;

  public static CONVERT(beData: {}): Card {
    return new Card().convertFromBE(beData);
  }
}
