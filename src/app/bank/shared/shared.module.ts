import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClrDatagridModule} from 'clarity-angular';
import {TransactionsService} from '../../shared/services/transactions.service';
import {TransactionsComponent} from './transactions/transactions.component';

/**
 * Shared module
 */

@NgModule({
  imports: [
    CommonModule,
    ClrDatagridModule
  ],
  declarations: [TransactionsComponent],
  exports: [TransactionsComponent],
  providers: [TransactionsService]
})
export class SharedModule { }
