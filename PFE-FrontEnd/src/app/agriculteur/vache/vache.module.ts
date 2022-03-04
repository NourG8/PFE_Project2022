import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacheRoutingModule } from './vache-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VacheRoutingModule,
  ]
})
export class VacheModule { 
  defaultValue= {hour: 13, minute: 30};

timeChangeHandler(event: Event) {
  console.log(event);
}
}
