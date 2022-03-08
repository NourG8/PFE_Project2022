import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Vache } from 'src/app/Models/vache';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import { VacheService } from 'src/app/Service/vache.service';

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation:Operation = new Operation();
  submitted = false;
  msg="";
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
      dateOperation : new FormControl(null,[Validators.required ]),
      typeOp : new FormControl(null,[Validators.required ]),
      tank : new FormControl(null,[Validators.required ]),
      vache : new FormControl(null,[Validators.required ]),
    
  })
  vaches!:Observable<Vache[]>;
  tanks!:Observable<Tank[]>;

  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private vacheService:VacheService,
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.vaches=this.vacheService.getVaches();
    this.tanks=this.tankService.getTanks();
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {
    this.operationService
        .createOperation(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            "dateOperation":this.myForm.get('dateOperation')?.value,
            "typeOp":this.myForm.get('typeOp')?.value,
            "tank":{
              "idTank":this.myForm.get('tank')?.value,
            },
            "vache":{
            "idVache":this.myForm.get('vache')?.value,
            }
          }
        )
        .subscribe(o=>{
          window.location.reload();
          console.log(this.operation);
        });
    }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperation']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}

get dateOperation(){
  return this.myForm.get('dateOperation') ;
}

get typeOp(){
  return this.myForm.get('typeOp') ;
}

get tank(){
  return this.myForm.get('tank') ;
}


get vache(){
  return this.myForm.get('vache') ;
}

}

