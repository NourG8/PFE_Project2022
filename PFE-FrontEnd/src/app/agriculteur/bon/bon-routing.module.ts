import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BonComponent } from './bon.component';

const routes: Routes = [
  {  path: '', component: BonComponent,},
  {  path:'**', component: BonComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BonRoutingModule { }
