import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Modal} from 'clarity-angular';
import {Observable} from 'rxjs/Observable';
import {finalize, tap} from 'rxjs/operators';
import {AutoPayment} from '../../shared/payment';
import {PaymentsService} from '../../shared/services/payments.service';
import {TransactionsComponent} from '../shared/transactions/transactions.component';

type ActiveState = 'bank'|'admin';

/**
 * Header for dashboard
 */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('reportModal')
  public reportModal: Modal;
  @ViewChild('autoPaymentModal')
  public autoPaymentModal: Modal;
  @ViewChild('transactions')
  public transactionsComponent: TransactionsComponent;

  @Input()
  public admin: boolean;

  @Output()
  public logout: EventEmitter<void> = new EventEmitter();

  public navState: ActiveState = 'bank';

  public isAutoPaymentsLoading: boolean = false;
  public autoPayments: Observable<AutoPayment[]>;
  public autoPaymentsCount: number;
  public removeAutoPaymentError: string;

  private paymentsService: PaymentsService;

  /**
   * @param {Router} router
   * @param {PaymentsService} paymentsService
   */
  constructor(router: Router, paymentsService: PaymentsService) {
    const lastRouteSegment: string = router.url.split('/').slice(-1)[0];
    this.navState = <ActiveState> lastRouteSegment;
    this.paymentsService = paymentsService;
  }

  /**
   * Header link click handle
   * @param {ActiveState} nav
   */
  public headerLinkClicked(nav: ActiveState) {
    this.navState = nav;
  }

  /**
   * Requests all of the user transactions
   */
  public showAllReports() {
    this.transactionsComponent.requestTransactions();
    this.reportModal.open();
  }

  /**
   * Opens auto payments modal
   */
  public showAutoPayments() {
    delete this.removeAutoPaymentError;
    this.autoPaymentModal.open();
    this.requestAutoPayments();
  }

  /**
   * Returns auto payment type to show
   * @param {AutoPayment} autoPayment
   * @returns {string}
   */
  public getAutoPaymentType(autoPayment: AutoPayment): string {
    return autoPayment.autoType === 'single' ? autoPayment.autoType : autoPayment.autoPeriod;
  }

  /**
   * Removes auto payment
   * @param {AutoPayment} autoPayment
   */
  public removeAutoPayment(autoPayment: AutoPayment) {
    this.isAutoPaymentsLoading = true;
    this.paymentsService.deleteAutoPayment(autoPayment.id).pipe(
      tap(() => this.requestAutoPayments()),
      finalize(() => this.isAutoPaymentsLoading = false)
    ).subscribe(null, (error: string) => this.removeAutoPaymentError = error);
  }

  private requestAutoPayments() {
    this.isAutoPaymentsLoading = true;
    this.autoPayments = this.paymentsService.getAutoPayments().pipe(
      tap((autoPayments: AutoPayment[]) => this.autoPaymentsCount = autoPayments.length),
      finalize(() => this.isAutoPaymentsLoading = false)
    );
  }
}
