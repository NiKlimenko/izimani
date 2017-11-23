import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {CreateCardComponent} from './create-card/create-card.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'create-card', component: CreateCardComponent}
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
