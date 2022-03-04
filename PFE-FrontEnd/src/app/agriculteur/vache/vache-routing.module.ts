import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VacheComponent } from './vache.component';



const routes: Routes = [
  {  path: '', component: VacheComponent,},
  {  path:'**', component: VacheComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacheRoutingModule { }
