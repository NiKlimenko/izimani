import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '/bank', pathMatch: 'full'},
  {path: 'bank', loadChildren: 'app/bank/bank.module#BankModule'},
  {path: 'login', loadChildren: 'app/login/login.module#LoginModule'}
];

/**
 * Routes for the main app module.
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
