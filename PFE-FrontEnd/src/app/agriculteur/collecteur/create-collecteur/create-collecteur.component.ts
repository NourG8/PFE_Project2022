import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Collecteur } from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-collecteur',
  templateUrl: './create-collecteur.component.html',
  styleUrls: ['./create-collecteur.component.css']
})
export class CreateCollecteurComponent implements OnInit {

  collecteur:Collecteur = new Collecteur();
  submitted = false;
  myForm!:FormGroup;
  msg="";
  msg1=0;
  msg2=0;

  constructor(private collecteurService: CollecteurService,
    private location:Location,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.collecteur = new Collecteur();
  }


  save() {

    if(this.myForm.get('nomCollecteur')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('adresse')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('tel')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     this.collecteurService.getCollecteurNomCollecteur(this.myForm.get('nomCollecteur')?.value).subscribe(t=>{
      console.log(t);
      if(t==1){
        this.msg1=1;
       }
       else{
        this.msg1=0;
       }

       this.collecteurService.getCollecteurTel(this.myForm.get('tel')?.value).subscribe(l=>{
        console.log(l);
        if(l==1){
          this.msg2=1;
         }
         else{
          this.msg2=0;
         }

     if(this.myForm.get('nomCollecteur')?.value!=null && this.myForm.get('adresse')?.value!=null && t==0 && l==0
     && this.myForm.get('nomCollecteur')?.value.length>=3 && this.myForm.get('adresse')?.value.length>=3
     && this.myForm.get('tel')?.value!=null  && this.myForm.get('tel')?.value.length==8  ){
    console.log(this.collecteur);
    this.collecteur.idCollecteur = 1;
    this.collecteurService
        .createCollecteur(this.collecteur)
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.collecteur);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un Collecteur a été ajouté avec succès"]));
          // window.location.reload();
          this.onClose();
        },
        (error) => {
          console.log("Failed")
        }
      );
    }
  });
});
  }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/collecteur/listeCollecteur']);
  }


  onReload(){
      // this.router.navigate([this.router.url]);
      this.router.navigateByUrl("/'agriculteur/bon/listeCollecteur",{skipLocationChange: true}).then( response=> {
        this.router.navigate([decodeURI(this.location.path())]);
      })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'nomCollecteur' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'adresse' : new FormControl(null,[Validators.required,Validators.minLength(3) ]),
      'tel' : new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(8) ]),
      });
 }

 get nomCollecteur(){
  return this.myForm.get('nomCollecteur') ;
}

get adresse(){
  return this.myForm.get('adresse') ;
}

get tel(){
  return this.myForm.get('tel') ;
}

}

