import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
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
