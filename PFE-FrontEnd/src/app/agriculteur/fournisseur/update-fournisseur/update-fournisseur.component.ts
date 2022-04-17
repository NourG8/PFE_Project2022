import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent implements OnInit {

  fournisseur:Fournisseur=new Fournisseur();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private router: Router,
    private dialogClose: MatDialog,
    private fournisseurService:FournisseurService,

  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.fournisseurService.getFournisseur(JSON.parse(localStorage.getItem('IdF') || '[]') || []).subscribe(o =>{
      this.fournisseur = o;
      console.log(this.fournisseur);
    });

  }

  updateFournisseur(){

    if(this.myForm.get('nom')?.value.length>=3 && this.myForm.get('matricule')?.value.length>=8){
    this.fournisseurService
        .updateFournisseur(this.fournisseur.idFournisseur,this.fournisseur)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Un fournisseur a été modifié avec succes "]));
          // window.location.reload();
          console.log(this.fournisseur);
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
      'nom' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'matricule' : new FormControl(null,[Validators.required,Validators.minLength(8) ]),
 
      });
 }


 get nom(){
  return this.myForm.get('nom') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


onReload(){
  this.router.navigate([this.router.url]);
}


onClose() {
  this.dialogClose.closeAll();
  // this.gotoList();
  this.onReload();
}

}
