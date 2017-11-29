import {DBRelation, ObjectModel} from './object-model';

/**
 * Available auto payment types
 */
export type AutoPaymentType = 'single'|'cyclic';

/**
 * Available auto payment periods
 */
export type AutoPaymentPeriodType = 'minutely'|'daily'|'monthly'|'yearly';

/**
 * Base payment model
 */
export class Payment extends ObjectModel<Payment> {

  public RELATIONS: DBRelation[] = [
    {BE: 'iban', FE: 'iban'},
    {BE: 'contract_field_value', FE: 'contractValue'},
    {BE: 'amount', FE: 'amount'},
    {BE: 'datetime_to_start', FE: 'autoStartDatetime'},
    {BE: 'autopayment_type', FE: 'autoType'},
    {BE: 'period_type', FE: 'autoPeriod'}
  ];

  public iban: string;
  public contractValue: string;
  public amount: number;
  public autoStartDatetime: string;
  public autoType: AutoPaymentType;
  public autoPeriod: AutoPaymentPeriodType;

  constructor(iban?: string, contractValue?: string, amount?: number, autoStartDatetime?: string,
              autoType?: AutoPaymentType, autoPeriod?: AutoPaymentPeriodType) {

    super();
    this.iban = iban;
    this.contractValue = contractValue;
    this.amount = amount;
    this.autoStartDatetime = autoStartDatetime;
    this.autoType = autoType;
    this.autoPeriod = autoPeriod;
  }

  public static CONVERT(beData: {}): Payment {
    const payment: Payment = new Payment();
    payment.convertFromBE(beData);

    return payment;
  }
}

/**
 * Payment payload model
 */
export class PaymentPayload extends Payment {

  public RELATIONS: DBRelation[] = this.RELATIONS.concat([
    {BE: 'Automatic', FE: 'isAuto'}
  ]);

  public isAuto: boolean;

  constructor(isAuto?: boolean, iban?: string, contractValue?: string, amount?: number, autoStartDatetime?: string,
              autoType?: AutoPaymentType, autoPeriod?: AutoPaymentPeriodType) {
    super(iban, contractValue, amount, autoStartDatetime, autoType, autoPeriod);
    this.isAuto = isAuto;
  }

  public static CONVERT(beData: {}): PaymentPayload {
    const payload: PaymentPayload = new PaymentPayload();
    payload.convertFromBE(beData);

    return payload;
  }
}

export class AutoPayment extends Payment {

  public RELATIONS: DBRelation[] = this.RELATIONS.concat([
    {BE: 'autopayment_key', FE: 'id'},
    {BE: 'service_category', FE: 'serviceCategory'},
    {BE: 'service_name', FE: 'serviceName'}
  ]);

  public id: string;
  public serviceCategory: string;
  public serviceName: string;

  public static CONVERT(beData: {}): AutoPayment {
    const payload: AutoPayment = new AutoPayment();
    payload.convertFromBE(beData);

    return payload;
  }
}
