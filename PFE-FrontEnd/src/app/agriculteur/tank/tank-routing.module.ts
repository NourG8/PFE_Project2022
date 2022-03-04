import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TankComponent } from './tank.component';



const routes: Routes = [
  {  path: '', component: TankComponent,},
  {  path:'**', component: TankComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TankRoutingModule { }
