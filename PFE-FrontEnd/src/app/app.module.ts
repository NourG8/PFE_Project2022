import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { MatDialogModule} from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
