import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClrAlertModule, ClrDropdownModule, ClrIconModule, ClrModalModule} from 'clarity-angular';
import {CurrencyService} from '../../shared/services/currency.service';
import {PaymentsService} from '../../shared/services/payments.service';
import {SharedModule} from '../shared/shared.module';
import {CardsComponent} from './cards/cards.component';
import {CurrencyComponent} from './currency/currency.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

/**
 * Dashboard module
 */

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ClrIconModule,
    ClrDropdownModule,
    ClrModalModule,
    FormsModule,
    ReactiveFormsModule,
    ClrAlertModule
  ],
  declarations: [DashboardComponent, CardsComponent, CurrencyComponent],
  providers: [CurrencyService, PaymentsService]
})
export class DashboardModule {}
