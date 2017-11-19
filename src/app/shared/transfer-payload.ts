import {DBRelation, ObjectModel} from './object-model';

/**
 * Class for working with the parameters of the payload, which is used to request the transfer to the card
 */

export class TransferPayload extends ObjectModel<TransferPayload> {

  public RELATIONS: DBRelation[] = [
    {BE: 'card_number', FE: 'toCardNumber'},
    {BE: 'CVV', FE: 'cvv'},
    {BE: 'amount', FE: 'amount'}
  ];

  public toCardNumber: string;
  public cvv: string;
  public amount: number;

  /**
   * @param {string} toCardNumber
   * @param {string} cvv
   * @param {number} amount
   */
  constructor(toCardNumber: string, cvv: string, amount: number) {
    super();
    this.toCardNumber = toCardNumber;
    this.cvv = cvv;
    this.amount = amount;
  }
}
