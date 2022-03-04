import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitRoutingModule } from './produit-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProduitRoutingModule,
  ]
})

export class ProduitModule { 
  defaultValue= {hour: 13, minute: 30};

  timeChangeHandler(event: Event) {
    console.log(event);
}
 }

