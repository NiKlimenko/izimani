import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';
import {CurrencyRate} from '../../shared/currency-rate';
import {CurrencyService} from '../../shared/services/currency.service';

/**
 * Component that displays a table with currencies
 */

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  public rates: Observable<CurrencyRate[]>;
  public currencies: Observable<string[]>;
  public amount: number;
  public base: string;
  public destination: string;
  public exchangeResult: Observable<number>;

  private currencyService: CurrencyService;

  /**
   * @param {CurrencyService} currencyService
   */
  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
    this.rates = this.currencyService.getCurrencyRates();
    this.currencies = this.currencyService.getCurrencies().pipe(
      tap((currencies: string[]) => {
        if (!this.base) {
          this.base = currencies[0];
        }

        if (!this.destination) {
          this.destination = currencies[0];
        }
      })
    );
  }

  public ngOnInit() {
    this.exchange();
  }

  /**
   * On amount changed
   * @param {number} amount
   */
  public amountChanged(amount: number) {
    this.amount = amount;
    this.exchange();
  }

  /**
   * On base (from) currency changed
   * @param {string} currency
   */
  public baseCurrencySelected(currency: string) {
    this.base = currency;
    this.exchange();
  }

  /**
   * On destination (to) currency changed
   * @param {string} currency
   */
  public destinationCurrencySelected(currency: string) {
    this.destination = currency;
    this.exchange();
  }

  /**
   * Swapped currencies
   */
  public swapCurrencies() {
    [this.base, this.destination] = [this.destination, this.base];
    this.exchange();
  }

  private exchange() {
    if (!this.amount) {
      this.exchangeResult = Observable.of(0);
    } else if (this.base === this.destination) {
      this.exchangeResult = Observable.of(this.amount);
    } else {
      this.exchangeResult = this.rates.pipe(
        map((rates: CurrencyRate[]) => {
          const rate: CurrencyRate = rates.find((r: CurrencyRate) =>
            r.baseCurrency === this.base && r.destinationCurrency === this.destination);

          return this.amount * rate.value;
        })
      );
    }
  }
}
