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
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation:Operation = new Operation();
  t:Tank=new Tank();
  submitted = false;
  msg="";
  msgErreur=0;
  qteActLaitTank=0;
  som=10000;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
     // dateOperation : new FormControl(null,[Validators.required ]),
    //  typeOp : new FormControl(null,[Validators.required ]),
      //tank : new FormControl(null,[Validators.required ]),
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
    this.tanks=this.tankService.getTanksFiltres();
    this.operationService.getNbOp().subscribe(o=>{
    console.log(o);
    this.som=this.som+o+1;  
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    
    if(this.myForm.get('poidsLait')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
     

     if(this.myForm.get('poidsLait')?.value!=null){

    this.operationService
    .createOperation(
      {
        "poidsLait":this.myForm.get('poidsLait')?.value
        },
      
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
    //  ****************   Tank    ******************
//     let bb=this.tankService.getTank(this.myForm.get('tank')?.value).subscribe(o=>{
//       this.t=o;
//       console.log(o);
//       console.log(this.t);
//       console.log(o.poidActuel);
// if(o.poidActuel<this.myForm.get('poidsLait')?.value){
// this.msgErreur=1;
// this.qteActLaitTank=o.poidActuel;
//     }
// else
// this.msgErreur=0;
//     });
// if(this.qteActLaitTank>=this.myForm.get('poidsLait')?.value){

  
    
  }


  onSubmit() {
    this.tankService.getTanksQteGenerale().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o)
      this.save();
      else{
      this.msgErreur=1;
      this.qteActLaitTank=o;
      }
  });
}

  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperationRetrait']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


// get lait(){
//   return this.myForm.get('lait') ;
// }

}

