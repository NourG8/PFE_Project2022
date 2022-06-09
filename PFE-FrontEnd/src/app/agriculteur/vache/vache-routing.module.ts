import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VacheComponent } from './vache.component';
import { ListeVacheComponent } from './liste-vache/liste-vache.component';
import { CreateVacheComponent } from './create-vache/create-vache.component';
import { UpdateVacheComponent } from './update-vache/update-vache.component';
import { DetailsVacheComponent } from './details-vache/details-vache.component';

const routes: Routes = [
  { path: '', component: VacheComponent },
  { path: 'listeVache', component: ListeVacheComponent },
  { path: 'addVache', component: CreateVacheComponent },
  { path: 'detailsVache/:id', component: DetailsVacheComponent },
  { path: 'updateVache/:id', component: UpdateVacheComponent },
  { path: '', redirectTo: '/vache', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacheRoutingModule {}
