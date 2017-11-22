import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrIconModule} from 'clarity-angular';
import {UserService} from '../../shared/services/user.service';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {RegisterComponent} from './register/register.component';

/**
 * Admin module
 */

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClrIconModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [AdminComponent, RegisterComponent],
  providers: [UserService]
})
export class AdminModule { }
