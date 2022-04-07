import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitRoutingModule } from './produit-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';

import { MatDialogModule} from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// AddForPaginator
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
//add For Sorted
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
//add Snackbar
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ListeProduitComponent,
    CreateProduitComponent,
    UpdateProduitComponent,
    DetailsProduitComponent
  ],
  imports: [
    ProduitRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
     //add For Sorted
     MatSortModule,
     // AddForPaginator
     MatPaginatorModule,
     MatFormFieldModule,
     MatInputModule,
     MatTableModule,
     MatSnackBarModule,
  ]
})

export class ProduitModule { 
  defaultValue= {hour: 13, minute: 30};

  timeChangeHandler(event: Event) {
    console.log(event);
}
 }
