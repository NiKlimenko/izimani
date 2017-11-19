import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrAlertModule, ClrDropdownModule, ClrIconModule, ClrModalModule} from 'clarity-angular';
import {AppAlertService} from '../shared/services/app-alert.service';
import {CardService} from '../shared/services/card.service';
import {CurrencyService} from '../shared/services/currency.service';
import {AppAlertComponent} from './app-alert/app-alert.component';
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
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ClrAlertModule
  ],
  declarations: [DashboardComponent, HeaderComponent, CardsComponent, CurrencyComponent, AppAlertComponent],
  providers: [CardService, CurrencyService, AppAlertService]
})
export class DashboardModule {}
