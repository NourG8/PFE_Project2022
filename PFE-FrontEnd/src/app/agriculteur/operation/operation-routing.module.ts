import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OperationComponent } from './operation.component';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { CreateOperationRemplissageComponent } from './create-operation-remplissage/create-operation-remplissage.component';
import { PageOperationsComponent } from './page-operations/page-operations.component';
import { ListeOperationsRetraitComponent } from './liste-operations-retrait/liste-operations-retrait.component';
import { DetailsOperationTankComponent } from './details-operation-tank/details-operation-tank.component';


const routes: Routes = [
  {  path: '', component: OperationComponent,},
  { path: 'listeOperation', component: ListeOperationComponent },
  { path: 'addOperation', component: CreateOperationComponent  },
  { path: 'addOperationR', component: CreateOperationRemplissageComponent  },
  { path: 'detailsOperation/:id', component: DetailsOperationComponent   },
  { path: 'updateOperation/:id', component: UpdateOperationComponent  },
  { path: 'operationPage', component: PageOperationsComponent  },
  { path: 'listeOperationRetrait', component: ListeOperationsRetraitComponent  },
  { path: 'detailsOperationTank/:id', component: DetailsOperationTankComponent  },
  { path:'',redirectTo:'/operation',pathMatch:'full'},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
