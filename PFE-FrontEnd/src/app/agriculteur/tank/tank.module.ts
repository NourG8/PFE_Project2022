import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankRoutingModule } from './tank-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TankRoutingModule,
  ]
})
export class TankModule { 
  defaultValue= {hour: 13, minute: 30};

timeChangeHandler(event: Event) {
  console.log(event);
}
}
