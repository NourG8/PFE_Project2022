import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit.component';



const routes: Routes = [
  {  path: '', component: ProduitComponent,},
  {  path:'**', component: ProduitComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
