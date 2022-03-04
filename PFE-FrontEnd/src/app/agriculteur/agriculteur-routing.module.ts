import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgriculteurComponent } from './agriculteur.component';
import { BonComponent } from './bon/bon.component';
import { OperationComponent } from './operation/operation.component';
import { ProduitComponent } from './produit/produit.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: AgriculteurComponent, children: [
      { path: 'bon',loadChildren: () => import('./bon/bon.module').then(m => m.BonModule)},
      { path: 'operation', loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule) },
      { path: 'produit', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
       { path: 'fournisseur', loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule) },
       { path: 'tank', loadChildren: () => import('./tank/tank.module').then(m => m.TankModule) },
       { path: 'vache', loadChildren: () => import('./vache/vache.module').then(m => m.VacheModule) },
      { path: '**', component: NotFoundComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriculteurRoutingModule { }
