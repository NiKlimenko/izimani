import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Modal} from 'clarity-angular';
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
  @ViewChild('transactions')
  public transactionsComponent: TransactionsComponent;

  @Input()
  public admin: boolean;

  @Output()
  public logout: EventEmitter<void> = new EventEmitter();

  public navState: ActiveState = 'bank';

  /**
   * @param {Router} router
   */
  constructor(router: Router) {
    const lastRouteSegment: string = router.url.split('/').slice(-1)[0];
    this.navState = <ActiveState> lastRouteSegment;
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
}
