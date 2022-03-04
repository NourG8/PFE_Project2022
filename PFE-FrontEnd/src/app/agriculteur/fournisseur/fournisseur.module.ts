import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({

  declarations: [
    // EmployeesListComponent,
    // EmployeeDetailsComponent,
    // CreateEmployeeComponent,
    // DashboardAdminComponent,
    // UpdateEmployeeComponent,
    // MailboxComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    HttpClientModule,
  ]
})
export class FournisseurModule { }
