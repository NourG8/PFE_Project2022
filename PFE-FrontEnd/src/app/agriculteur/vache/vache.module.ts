import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacheRoutingModule } from './vache-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListeVacheComponent } from './liste-vache/liste-vache.component';
import { CreateVacheComponent } from './create-vache/create-vache.component';
import { UpdateVacheComponent } from './update-vache/update-vache.component';
import { DetailsVacheComponent } from './details-vache/details-vache.component';

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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ListeVacheComponent,
    CreateVacheComponent,
    UpdateVacheComponent,
    DetailsVacheComponent,
  ],
  imports: [
    CommonModule,
    VacheRoutingModule,
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
export class VacheModule {
  defaultValue = { hour: 13, minute: 30 };

  timeChangeHandler(event: Event) {
    console.log(event);
  }
}
