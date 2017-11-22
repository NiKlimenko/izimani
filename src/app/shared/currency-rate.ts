import {DBRelation, ObjectModel} from './object-model';

/**
 * Currency rate model
 */

export class CurrencyRate extends ObjectModel<CurrencyRate> {

  public RELATIONS: DBRelation[] = [
    {BE: 'base_currency_name', FE: 'baseCurrency'},
    {BE: 'destination_currency_name', FE: 'destinationCurrency'},
    {BE: 'value', FE: 'value'}
  ];

  public baseCurrency: string;
  public destinationCurrency: string;
  public value: number;

  public static CONVERT(beData: {}): CurrencyRate {
    const rate: CurrencyRate = new CurrencyRate();
    rate.convertFromBE(beData);

    return rate;
  }
}
