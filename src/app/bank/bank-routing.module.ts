import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankComponent} from './bank.component';

const routes: Routes = [
  {path: '', component: BankComponent, children: [
    {path: '', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'}
  ]}
];

/**
 * Routs for the bank module
 */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }