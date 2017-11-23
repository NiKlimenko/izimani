import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrIconModule} from 'clarity-angular';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {CreateCardComponent} from './create-card/create-card.component';
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
  declarations: [AdminComponent, RegisterComponent, CreateCardComponent]
})
export class AdminModule { }
