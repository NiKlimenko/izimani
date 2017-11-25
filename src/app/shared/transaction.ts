import {CurrencyType} from './card';
import {DBRelation, ObjectModel} from './object-model';

/**
 * Type describes the transaction type
 */
export type TransactionType = 'card_to_card'|'service_payment'|'other';

/**
 * Transaction model
 */
export class Transaction extends ObjectModel<Transaction> {

  public RELATIONS: DBRelation[] = [
    {BE: 'transaction_id', FE: 'transactionId'},
    {BE: 'outcome_iban', FE: 'outIban'},
    {BE: 'income_iban', FE: 'inIban'},
    {BE: 'transaction_type', FE: 'transactionType'},
    {BE: 'currency_type', FE: 'currencyType'},
    {BE: 'amount', FE: 'amount'},
    {BE: 'datetime', FE: 'datetime'},
    {BE: 'card_to_card_transaction_detail', FE: 'ctcDetails'},
    {BE: 'payment_service_pay_transaction_detail', FE: 'psDetails'}
  ];

  public transactionId: number;
  public outIban: string;
  public inIban: string;
  public transactionType: TransactionType;
  public currencyType: CurrencyType;
  public amount: number;
  public datetime: string;
  public ctcDetails?: CtCDetails;
  public psDetails?: PSDetails;

  public static CONVERT(beData: {}): Transaction {
    const transaction: Transaction = new Transaction();
    transaction.convertFromBE(beData);

    const ctcDetails: CtCDetails = new CtCDetails();
    ctcDetails.convertFromBE(transaction.ctcDetails);

    const psDetails: PSDetails = new PSDetails();
    psDetails.convertFromBE(transaction.psDetails);

    transaction.ctcDetails = ctcDetails;
    transaction.psDetails = psDetails;

    return transaction;
  }
}

/**
 * Card to Card transaction details model
 */
export class CtCDetails extends ObjectModel<CtCDetails> {

  public RELATIONS: DBRelation[] = [
    {BE: 'CardNumber', FE: 'cardNumber'},
    {BE: 'CVV', FE: 'cvv'}
  ];

  public cardNumber: string;
  public cvv: string;

  public static CONVERT(beData: {}): CtCDetails {
    const ctCDetails: CtCDetails = new CtCDetails();
    ctCDetails.convertFromBE(beData);

    return ctCDetails;
  }
}

/**
 * Payments service transaction details model
 */
export class PSDetails extends ObjectModel<CtCDetails> {

  public RELATIONS: DBRelation[] = [
    {BE: 'ServiceCategory', FE: 'serviceCategory'},
    {BE: 'ServiceName', FE: 'serviceName'},
    {BE: 'ContractFieldValue', FE: 'contractValue'}
  ];

  public serviceCategory: string;
  public serviceName: string;
  public contractValue: string;

  public static CONVERT(beData: {}): PSDetails {
    const psDetails: PSDetails = new PSDetails();
    psDetails.convertFromBE(beData);

    return psDetails;
  }
}
