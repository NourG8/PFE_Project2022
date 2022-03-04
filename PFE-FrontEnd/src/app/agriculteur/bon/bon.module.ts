import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonRoutingModule } from './bon-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BonRoutingModule,
  ]
})
export class BonModule {
  defaultValue= {hour: 13, minute: 30};

  timeChangeHandler(event: Event) {
    console.log(event);
}
 }
