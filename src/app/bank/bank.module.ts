import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClarityModule, ClrAlertModule, ClrDropdownModule, ClrIconModule} from 'clarity-angular';
import {AppAlertService} from '../shared/services/app-alert.service';
import {CardService} from '../shared/services/card.service';
import {UserService} from '../shared/services/user.service';
import {AppAlertComponent} from './app-alert/app-alert.component';
import {BankRoutingModule} from './bank-routing.module';
import {BankComponent} from './bank.component';
import {HeaderComponent} from './header/header.component';

/**
 * Bank module
 */

@NgModule({
  imports: [
    CommonModule,
    BankRoutingModule,
    ClarityModule,
    ClrIconModule,
    ClrDropdownModule,
    ClrAlertModule
  ],
  declarations: [BankComponent, AppAlertComponent, HeaderComponent],
  providers: [AppAlertService, UserService, CardService]
})
export class BankModule { }
