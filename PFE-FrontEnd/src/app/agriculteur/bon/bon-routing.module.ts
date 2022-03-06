import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BonComponent } from './bon.component';
import { CreateBonComponent } from './create-bon/create-bon.component';
import { ListeBonComponent } from './liste-bon/liste-bon.component';
import { DatailsBonComponent } from './datails-bon/datails-bon.component';
import { UpdateBonComponent } from './update-bon/update-bon.component';




const routes: Routes = [
  { path: '', component: BonComponent},
  { path: 'listeBon', component: ListeBonComponent },
  { path: 'addBon', component: CreateBonComponent  },
  { path: 'detailsBon/:id', component: DatailsBonComponent   },
  { path: 'updateBon/:id', component: UpdateBonComponent  },
  { path:'',redirectTo:'/bon',pathMatch:'full'},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BonRoutingModule { }
