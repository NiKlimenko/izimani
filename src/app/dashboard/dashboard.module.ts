import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClrDropdownModule, ClrIconModule, ClrModalModule} from 'clarity-angular';
import {CardService} from '../shared/services/card.service';
import {CardsComponent} from './cards/cards.component';
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
    ClrModalModule
  ],
  declarations: [DashboardComponent, HeaderComponent, CardsComponent],
  providers: [CardService]
})
export class DashboardModule {}
