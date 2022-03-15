import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TankComponent } from './tank/tank.component';
import { OperationComponent } from './operation/operation.component';
import { VacheComponent } from './vache/vache.component';
import { BonComponent } from './bon/bon.component';
import { ProduitComponent } from './produit/produit.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AgriculteurComponent } from './agriculteur.component';
import { AgriculteurRoutingModule } from './agriculteur-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScaleLinear, ScalePoint, ScaleTime,ScaleBand } from 'd3-scale'



@NgModule({
  declarations: [
    AgriculteurComponent,
    NavbarComponent,
    SidebarComponent,
    TankComponent,
    OperationComponent,
    VacheComponent,
    BonComponent,
    ProduitComponent,
    FournisseurComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AgriculteurRoutingModule,
    NgxChartsModule,
    MatSnackBarModule,
  ]
})
export class AgriculteurModule { }
