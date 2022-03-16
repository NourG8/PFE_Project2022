import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import {Lait } from 'src/app/Models/lait';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import  {LaitService } from 'src/app/Service/lait.service';

@Component({
  selector: 'app-create-operation-remplissage',
  templateUrl: './create-operation-remplissage.component.html',
  styleUrls: ['./create-operation-remplissage.component.css']
})
export class CreateOperationRemplissageComponent implements OnInit {

  operation:Operation = new Operation();
  submitted = false;
  msg="";
  l:Lait =new Lait();
  t:Tank=new Tank();
  msgErreur=0;
  msgErreur2=0;
  // qte de lait restante pour chaque vache
  qteRsetLait=0;
  //qte restante de lait pour un tank
  qteRsetLaitTank=0;
  valeur1=0;
  valeur2=0;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
     // dateOperation : new FormControl(null,[Validators.required ]),
      // typeOp : new FormControl(null,[Validators.required ]),
      // tank : new FormControl(null,[Validators.required ]),
      // lait : new FormControl(null,[Validators.required ]),

  })
  laits!:Observable<Lait[]>;
  tanks!:Observable<Tank[]>;

  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private laitService:LaitService,
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.laits=this.laitService.getLaits();
    this.tanks=this.tankService.getTanks();
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {


   

    this.operationService
        .createOperationRemplissage(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            // "dateOperation":this.myForm.get('dateOperation')?.value,
           // "typeOp":this.myForm.get('typeOp')?.value,
          }
        )
        .subscribe(o=>{
          window.location.reload();
          console.log(this.operation);

          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
          window.location.reload();      
        },
        (error) => {
          console.log("Failed")
        }
      );
    
      
  }


  onSubmit() {
    //this.submitted = true;
    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o)
      this.save();
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }

      
  });

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


get typeOp(){
  return this.myForm.get('typeOp') ;
}

get tank(){
  return this.myForm.get('tank') ;
}


get lait(){
  return this.myForm.get('lait') ;
}

}

