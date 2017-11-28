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
    {BE: 'card_number_sender', FE: 'cardNumberSender'},
    {BE: 'card_number_recipient', FE: 'cardNumberRecipient'},
    {BE: 'CVV', FE: 'cvv'}
  ];

  public cardNumberSender: string;
  public cardNumberRecipient: string;
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
    {BE: 'service_category', FE: 'serviceCategory'},
    {BE: 'service_name', FE: 'serviceName'},
    {BE: 'contract_field_value', FE: 'contractValue'},
    {BE: 'card_number', FE: 'cardNumber'}
  ];

  public serviceCategory: string;
  public serviceName: string;
  public contractValue: string;
  public cardNumber: string;

  public static CONVERT(beData: {}): PSDetails {
    const psDetails: PSDetails = new PSDetails();
    psDetails.convertFromBE(beData);

    return psDetails;
  }
}
