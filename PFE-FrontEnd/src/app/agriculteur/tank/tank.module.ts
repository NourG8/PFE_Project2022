import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankRoutingModule } from './tank-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListeTankComponent } from './liste-tank/liste-tank.component';
import { CreateTankComponent } from './create-tank/create-tank.component';
import { UpdateTankComponent } from './update-tank/update-tank.component';
import { DetailsTankComponent } from './details-tank/details-tank.component';

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
    ListeTankComponent,
    CreateTankComponent,
    UpdateTankComponent,
    DetailsTankComponent
  ],
  imports: [
    CommonModule,
    TankRoutingModule,
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
export class TankModule { 
  defaultValue= {hour: 13, minute: 30};

timeChangeHandler(event: Event) {
  console.log(event);
}
}
