import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialuiModule } from '../materialui/materialui.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


import { BreadcrumbModule } from "xng-breadcrumb";
import { BreadcrumbService } from 'xng-breadcrumb';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialuiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BreadcrumbModule
  ],
  providers: [
    BreadcrumbService
  ]
})
export class PagesModule {}
