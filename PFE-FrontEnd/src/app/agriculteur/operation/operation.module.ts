import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationRoutingModule } from './operation-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OperationRoutingModule,
  ]
})

export class OperationModule {
   defaultValue= {hour: 13, minute: 30};

timeChangeHandler(event: Event) {
  console.log(event);
}
}
