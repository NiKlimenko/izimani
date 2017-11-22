import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'register', component: RegisterComponent}
  ]}
];

/**
 * Routs for the admin module
 */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
