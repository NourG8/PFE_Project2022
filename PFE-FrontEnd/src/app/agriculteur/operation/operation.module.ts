import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationRoutingModule } from './operation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';

import { MatDialogModule } from '@angular/material/dialog';
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
import { CreateOperationRemplissageComponent } from './create-operation-remplissage/create-operation-remplissage.component';
import { PageOperationsComponent } from './page-operations/page-operations.component';
import { ListeOperationsRetraitComponent } from './liste-operations-retrait/liste-operations-retrait.component';
import { DetailsOperationTankComponent } from './details-operation-tank/details-operation-tank.component';
import { UpdateOperationRetraitComponent } from './update-operation-retrait/update-operation-retrait.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ListeOperationComponent,
    CreateOperationComponent,
    UpdateOperationComponent,
    DetailsOperationComponent,
    CreateOperationRemplissageComponent,
    PageOperationsComponent,
    ListeOperationsRetraitComponent,
    DetailsOperationTankComponent,
    UpdateOperationRetraitComponent,
  ],
  imports: [
    MatTableExporterModule,
    CommonModule,
    OperationRoutingModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class OperationModule {
  defaultValue = { hour: 13, minute: 30 };

  timeChangeHandler(event: Event) {
    console.log(event);
  }
}
