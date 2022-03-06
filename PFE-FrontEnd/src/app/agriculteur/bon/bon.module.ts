import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonRoutingModule } from './bon-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListeBonComponent } from './liste-bon/liste-bon.component';
import { CreateBonComponent } from './create-bon/create-bon.component';
import { UpdateBonComponent } from './update-bon/update-bon.component';
import { DatailsBonComponent } from './datails-bon/datails-bon.component';
import { MatDialogModule} from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
    ListeBonComponent,
    CreateBonComponent,
    UpdateBonComponent,
    DatailsBonComponent
  ],
  imports: [
    CommonModule,
    BonRoutingModule,
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
export class BonModule {
  defaultValue= {hour: 13, minute: 30};

  timeChangeHandler(event: Event) {
    console.log(event);
}
 }
