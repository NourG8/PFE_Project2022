import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BonComponent } from './bon.component';
import { CreateBonComponent } from './create-bon/create-bon.component';
import { ListeBonComponent } from './liste-bon/liste-bon.component';
import { DatailsBonComponent } from './datails-bon/datails-bon.component';
import { UpdateBonComponent } from './update-bon/update-bon.component';
import { ListeBonSortieComponent } from './liste-bon-sortie/liste-bon-sortie.component';
import { CreateBonSortieComponent } from './create-bon-sortie/create-bon-sortie.component';
import { UpdateBonSortieComponent } from './update-bon-sortie/update-bon-sortie.component';
import { DetailsBonSortieComponent } from './details-bon-sortie/details-bon-sortie.component';




const routes: Routes = [
  { path: '', component: BonComponent},
  { path: 'listeBon', component: ListeBonComponent },
  { path: 'listeBonSortie', component: ListeBonSortieComponent },
  { path: 'addBon', component: CreateBonComponent  },
  { path: 'addBonSortie', component: CreateBonSortieComponent  },
  { path: 'detailsBon/:id', component: DatailsBonComponent   },
  { path: 'detailsBonSortie/:id', component: DetailsBonSortieComponent },    
  { path: 'updateBon/:id', component: UpdateBonComponent  },
  { path: 'updateBonSortie/:id', component: UpdateBonSortieComponent  },
  { path:'',redirectTo:'/bon',pathMatch:'full'},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BonRoutingModule { }
