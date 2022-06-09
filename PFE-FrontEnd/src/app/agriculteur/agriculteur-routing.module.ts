import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriculteurComponent } from './agriculteur.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AgriculteurComponent,
    children: [
      {
        path: 'bon',
        loadChildren: () => import('./bon/bon.module').then((m) => m.BonModule),
      },
      {
        path: 'operation',
        loadChildren: () =>
          import('./operation/operation.module').then((m) => m.OperationModule),
      },
      {
        path: 'produit',
        loadChildren: () =>
          import('./produit/produit.module').then((m) => m.ProduitModule),
      },
      {
        path: 'fournisseur',
        loadChildren: () =>
          import('./fournisseur/fournisseur.module').then(
            (m) => m.FournisseurModule
          ),
      },
      {
        path: 'tank',
        loadChildren: () =>
          import('./tank/tank.module').then((m) => m.TankModule),
      },
      {
        path: 'vache',
        loadChildren: () =>
          import('./vache/vache.module').then((m) => m.VacheModule),
      },
      {
        path: 'collecteur',
        loadChildren: () =>
          import('./collecteur/collecteur.module').then(
            (m) => m.CollecteurModule
          ),
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgriculteurRoutingModule {}
