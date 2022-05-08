import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Vache } from 'src/app/Models/vache';
import { Router } from '@angular/router';
import { VacheService } from 'src/app/Service/vache.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-update-vache',
  templateUrl: './update-vache.component.html',
  styleUrls: ['./update-vache.component.css']
})
export class UpdateVacheComponent implements OnInit {
  vache:Vache=new Vache();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private router: Router,
    private location:Location,
    private dialogClose: MatDialog,
    private vacheService:VacheService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }
   
    this.ValidatedForm();
    this.vacheService.getVache(JSON.parse(localStorage.getItem('IdVache') || '[]') || []).subscribe(o =>{
      this.vache = o;
      console.log(this.vache);
    });

  }

  updateVache(){

    this.vacheService
        .updateVache(this.vache.idVache,this.vache)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Vache a été modifié avec succès"]));
          // window.location.reload();
          console.log(this.vache);
          this.onClose();
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'matricule' : new FormControl(null,[Validators.required,]),
      'poids' : new FormControl(null,[Validators.required, Validators.min(30)]),
      'race' : new FormControl(null,[Validators.required, ]),
      'dateNaissance' : new FormControl(null,[Validators.required, ]),
      // 'etat' : new FormControl(null,[Validators.required, ]),
      // 'qte_prodLait' : new FormControl(null,[Validators.required, ]),
      });
 }

 get poids(){
  return this.myForm.get('poids') ;
}

get race(){
  return this.myForm.get('race') ;
}

get dateNaissance(){
  return this.myForm.get('dateNaissance') ;
}

get etat(){
  return this.myForm.get('etat') ;
}

get qte_prodLait(){
  return this.myForm.get('qte_prodLait') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


onReload(){
  // this.router.navigate([this.router.url]);
  this.router.navigateByUrl("/'agriculteur/bon/listeVache",{skipLocationChange: true}).then( response=> {
   this.router.navigate([decodeURI(this.location.path())]);
 })
 }


onClose() {
  this.dialogClose.closeAll();
  // this.gotoList();
  this.onReload();
}

}
