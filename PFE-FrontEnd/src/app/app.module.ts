import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
// import { TankRoutingModule } from './agriculteur/agriculteur/tank/tank-routing.module';
import { OperationRoutingModule } from './agriculteur/operation/operation-routing.module';
import { VacheRoutingModule } from './agriculteur/vache/vache-routing.module';
import { BonRoutingModule } from './agriculteur/bon/bon-routing.module';
import { ProduitRoutingModule } from './agriculteur/produit/produit-routing.module';
import { FournisseurRoutingModule } from './agriculteur/fournisseur/fournisseur-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
