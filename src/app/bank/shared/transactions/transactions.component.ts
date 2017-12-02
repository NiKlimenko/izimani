import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {finalize, tap} from 'rxjs/operators';
import {TransactionsService} from '../../../shared/services/transactions.service';
import {Transaction, TransactionType} from '../../../shared/transaction';

/**
 * Transactions component
 */

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  public isLoading: boolean = true;
  public transactions: Observable<Transaction[]>;
  public transactionsCount: number;

  private transactionTypes: {[key: string]: string};
  private transactionService: TransactionsService;

  constructor(transactionService: TransactionsService) {
    this.transactionService = transactionService;
    this.transactionTypes = {
      card_to_card: 'Card to Card',
      service_payment: 'Payment for Services',
      account_replenishment: 'Account Replenishment',
      other: 'Other'
    };
  }

  /**
   * Requests transactions
   * @param {string} iban
   */
  public requestTransactions(iban?: string) {
    this.isLoading = true;
    this.transactions = this.transactionService.getTransactions(iban).pipe(
      tap((transactions: Transaction[]) => this.transactionsCount = transactions.length),
      finalize(() => this.isLoading = false)
    );
  }

  /**
   * Returns the mapped transaction types
   * @param {TransactionType} transactionType
   * @returns {string}
   */
  public getTransactionType(transactionType: TransactionType): string {
    return this.transactionTypes[transactionType];
  }

  /**
   * Determines whether the given transaction type is a payment
   * @param {TransactionType} transactionType
   * @returns {boolean}
   */
  public isPaymentType(transactionType: TransactionType): boolean {
    return this.transactionTypes[transactionType] === this.transactionTypes.service_payment;
  }
}
