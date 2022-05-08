import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Service/tank.service';
import { Router } from '@angular/router';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';

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
    private router: Router,
    private location:Location,
    private dialogClose: MatDialog,   
    private authService:AuthService,
    private tankService:TankService,


  ) { }

  ngOnInit(): void {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }
   
    this.ValidatedForm();
    this.tankService.getTank(JSON.parse(localStorage.getItem('IdT') || '[]') || []).subscribe(o =>{
      this.tank = o;
      console.log(this.tank);
    });

  }

  updateTank(){
    if(this.myForm.get('matricule')?.value!=null && this.myForm.get('poidVide')?.value!=null && this.myForm.get('poidVide')?.value>=30 ){
    this.tankService
        .updateTank(this.tank.idTank,this.tank)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Tank modifié avec succes ! "]));
          // window.location.reload();
          console.log(this.tank);
          this.onClose();
        },
        (error) => {
          console.log("Failed")
        }
      );
    }
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'matricule' : new FormControl(null,[Validators.required]),
      'poidVide' : new FormControl(null,[Validators.required,Validators.min(30)]),
      });
 }


 get poidVide(){
  return this.myForm.get('poidVide') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


onReload(){
     // this.router.navigate([this.router.url]);
     this.router.navigateByUrl("/'agriculteur/bon/listeTank",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


onClose() {
  this.dialogClose.closeAll();
  // this.gotoList();
  this.onReload();
}

}
