import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OperationComponent } from './operation.component';



const routes: Routes = [
  {  path: '', component: OperationComponent,},
  {  path:'**', component: OperationComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
