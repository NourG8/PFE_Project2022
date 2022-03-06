import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-bon',
  templateUrl: './update-bon.component.html',
  styleUrls: ['./update-bon.component.css']
})
export class UpdateBonComponent implements OnInit {

  bon:Bon=new Bon();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private dialogClose: MatDialog,
    private bonService:BonService,
  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.bonService.getBon(JSON.parse(localStorage.getItem('IdBon') || '[]') || []).subscribe(o =>{
      this.bon = o;
      console.log(this.bon);
    });

  }

  updateBon(){

    this.bonService
        .updateBon(this.bon.idBon,this.bon)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Bon was successfully updated"]));
          window.location.reload();
          console.log(this.bon);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'quantite' : new FormControl(null,[Validators.required,]),
      'type' : new FormControl(null,[Validators.required, ]),
      'date' : new FormControl(null,[Validators.required, ]),
      'prix' : new FormControl(null,[Validators.required, ]),
      });
 }


 get quantite(){
  return this.myForm.get('quantite') ;
}

get type(){
  return this.myForm.get('type') ;
}

get date(){
  return this.myForm.get('date') ;
}

get prix(){
  return this.myForm.get('prix') ;
}


  onClose() {
    this.dialogClose.closeAll();
  }

}
