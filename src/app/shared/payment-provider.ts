import {DBRelation, ObjectModel} from './object-model';

/**
 * Available contract types
 */
export type ContractType = 'phone_number'|'contract_number'|'order_number';

/**
 * Payment provider model
 */
export class PaymentProvider extends ObjectModel<PaymentProvider> {

  public RELATIONS: DBRelation[] = [
    {BE: 'service_key', FE: 'id'},
    {BE: 'service_category', FE: 'category'},
    {BE: 'service_name', FE: 'name'},
    {BE: 'contract_identifier', FE: 'contractType'}
  ];

  public id: string;
  public category: string;
  public name: string;
  public contractType: ContractType;

  public static CONVERT(beData: {}): PaymentProvider {
    const paymentProvider: PaymentProvider = new PaymentProvider();
    paymentProvider.convertFromBE(beData);

    return paymentProvider;
  }
}
