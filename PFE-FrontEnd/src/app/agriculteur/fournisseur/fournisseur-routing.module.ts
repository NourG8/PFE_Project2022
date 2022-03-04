import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurComponent } from './fournisseur.component';


const routes: Routes = [
  { path: '', component: FournisseurComponent },
  {  path:'**', component: FournisseurComponent }
  // { path: 'employeesList', component: EmployeesListComponent },
  // { path: 'dashboardAdmin', component: DashboardAdminComponent },
  // { path: 'mailbox', component:  MailboxComponent },
  // { path: 'addemployee', component: CreateEmployeeComponent  },
  // { path: 'detailemployee/:id', component: EmployeeDetailsComponent   },
  // { path: 'updateemployee/:id', component: UpdateEmployeeComponent   },
  // { path:'',redirectTo:'/admin',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
