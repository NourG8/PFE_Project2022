import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FournisseurComponent } from './fournisseur.component';
import { ListeFournisseurComponent } from './liste-fournisseur/liste-fournisseur.component';
import { CreateFournisseurComponent } from './create-fournisseur/create-fournisseur.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { DetailsFournissseurComponent } from './details-fournissseur/details-fournissseur.component';



const routes: Routes = [
  { path: '', component: FournisseurComponent },
  { path: 'listeFournisseur', component: ListeFournisseurComponent },
  { path: 'addFournisseur', component: CreateFournisseurComponent  },
  { path: 'detailsFournisseur/:id', component: DetailsFournissseurComponent   },
  { path: 'updateFournisseur/:id', component: UpdateFournisseurComponent  },
  { path:'',redirectTo:'/fournisseur',pathMatch:'full'},
  // {  path:'**', component: FournisseurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
