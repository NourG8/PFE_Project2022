import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Service/tank.service';

@Component({
  selector: 'app-create-tank',
  templateUrl: './create-tank.component.html',
  styleUrls: ['./create-tank.component.css']
})
export class CreateTankComponent implements OnInit {

  tank:Tank = new Tank();
  submitted = false;
  myForm!:FormGroup;

  constructor(private tankService: TankService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.tank = new Tank();

  }


  save() {
    console.log(this.tank);
    this.tank.idTank = 1;
    this.tankService
        .createTank(this.tank)
        .subscribe(o=>{
          window.location.reload();
          console.log(this.tank);
        });
    }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/Tank/listeTank']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
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


}

