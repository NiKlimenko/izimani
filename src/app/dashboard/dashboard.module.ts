import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClarityModule, ClrDropdownModule, ClrIconModule, ClrModalModule} from 'clarity-angular';
import {CardService} from '../shared/services/card.service';
import {CurrencyService} from '../shared/services/currency.service';
import {CardsComponent} from './cards/cards.component';
import {CurrencyComponent} from './currency/currency.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header/header.component';

/**
 * Dashboard module
 */

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClrIconModule,
    ClrDropdownModule,
    ClrModalModule,
    ClarityModule
  ],
  declarations: [DashboardComponent, HeaderComponent, CardsComponent, CurrencyComponent],
  providers: [CardService, CurrencyService]
})
export class DashboardModule {}
