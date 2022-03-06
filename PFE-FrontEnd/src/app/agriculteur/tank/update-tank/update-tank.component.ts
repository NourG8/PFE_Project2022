import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Service/tank.service';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css']
})
export class UpdateTankComponent implements OnInit {
  tank:Tank=new Tank();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private dialogClose: MatDialog,
    private tankService:TankService,


  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.tankService.getTank(JSON.parse(localStorage.getItem('IdT') || '[]') || []).subscribe(o =>{
      this.tank = o;
      console.log(this.tank);
    });

  }

  updateTank(){

    this.tankService
        .updateTank(this.tank.idTank,this.tank)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Tank modifié avec succes ! "]));
          window.location.reload();
          console.log(this.tank);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'poidVide' : new FormControl(null,[Validators.required,]),
      'poidActuel' : new FormControl(null,[Validators.required, ]),
      'etat' : new FormControl(null,[Validators.required, ]),
      });
 }


 get poidVide(){
  return this.myForm.get('poidVide') ;
}

get poidActuel(){
  return this.myForm.get('poidActuel') ;
}

get etat(){
  return this.myForm.get('etat') ;
}

  onClose() {
    this.dialogClose.closeAll();
  }

}
