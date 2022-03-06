import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';

@Component({
  selector: 'app-update-operation',
  templateUrl: './update-operation.component.html',
  styleUrls: ['./update-operation.component.css']
})
export class UpdateOperationComponent implements OnInit {

  operation:Operation=new Operation();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private dialogClose: MatDialog,
    private operationService:OperationService,
  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.operationService.getOperation(JSON.parse(localStorage.getItem('IdOperation') || '[]') || []).subscribe(o =>{
      this.operation = o;
      console.log(this.operation);
    });

  }

  updateOperation(){

    this.operationService
        .updateOperation(this.operation.idOperation,this.operation)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Operation was successfully updated"]));
          window.location.reload();
          console.log(this.operation);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'poidsLait' : new FormControl(null,[Validators.required,]),
      'dateOperation' : new FormControl(null,[Validators.required, ]),
      'typeOp' : new FormControl(null,[Validators.required, ]),
     
      });
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


  onClose() {
    this.dialogClose.closeAll();
  }

}
