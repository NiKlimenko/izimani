import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
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

  public currencies: Observable<CurrencyRate[]>;

  private currencyService: CurrencyService;

  /**
   * @param {CurrencyService} currencyService
   */
  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
  }

  public ngOnInit() {
    this.currencies = this.currencyService.getCurrencies();
  }
}
