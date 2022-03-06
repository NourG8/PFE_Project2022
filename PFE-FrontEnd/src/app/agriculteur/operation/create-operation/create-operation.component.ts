import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation:Operation = new Operation();
  submitted = false;
  myForm!:FormGroup;

  constructor(private operationService: OperationService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {
    console.log(this.operation);
    this.operation.idOperation = 1;
    this.operationService
        .createOperation(this.operation)
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


}

