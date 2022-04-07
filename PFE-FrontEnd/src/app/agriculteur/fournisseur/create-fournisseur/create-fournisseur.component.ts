import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';

@Component({
  selector: 'app-create-fournisseur',
  templateUrl: './create-fournisseur.component.html',
  styleUrls: ['./create-fournisseur.component.css']
})
export class CreateFournisseurComponent implements OnInit {

  fournisseur:Fournisseur = new Fournisseur();
  submitted = false;
  myForm!:FormGroup;
  msg="";

  constructor(private fournisseurService: FournisseurService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.fournisseur = new Fournisseur();
  }


  save() {

    if(this.myForm.get('nom')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('matricule')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('nom')?.value!=null && this.myForm.get('matricule')?.value!=null){
    console.log(this.fournisseur);
    this.fournisseur.idFournisseur = 1;
    this.fournisseurService
        .createFournisseur(this.fournisseur)
        .subscribe(o=>{
          window.location.reload();
          console.log(this.fournisseur);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un fournisseur a été ajouté avec succès"]));
          window.location.reload();
        },
        (error) => {
          console.log("Failed")
        }
      );
    }
  }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/fournisseur/listeFournisseur']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'nom' : new FormControl(null,[Validators.required,]),
      'matricule' : new FormControl(null,[Validators.required, ]),
      });
 }

 get nom(){
  return this.myForm.get('nom') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


}

