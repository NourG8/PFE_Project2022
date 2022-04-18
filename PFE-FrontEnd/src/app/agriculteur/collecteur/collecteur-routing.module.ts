import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CollecteurComponent } from './collecteur.component';
import { CreateCollecteurComponent } from './create-collecteur/create-collecteur.component';
import { ListeCollecteurComponent } from './liste-collecteur/liste-collecteur.component';
import { DetailsCollecteurComponent } from './details-collecteur/details-collecteur.component';
import { UpdateCollecteurComponent } from './update-collecteur/update-collecteur.component';


const routes: Routes = [
  { path: '', component: CollecteurComponent},
  { path: 'listeCollecteur', component: ListeCollecteurComponent },
  { path: 'addCollecteur', component: CreateCollecteurComponent  },
  { path: 'detailsCollecteur/:id', component: DetailsCollecteurComponent   }, 
  { path: 'updateCollecteur/:id', component: UpdateCollecteurComponent  },
  { path:'',redirectTo:'/collecteur',pathMatch:'full'},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollecteurRoutingModule { }
