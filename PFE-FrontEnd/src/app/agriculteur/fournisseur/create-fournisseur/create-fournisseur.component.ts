import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';

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
  msg1=0;
  msg2=0;
  msgTest=0;
  msg4=0;

  constructor(private fournisseurService: FournisseurService,
    private location:Location,    private authService:AuthService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }

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

     
     if(this.myForm.get('cgu')?.value==true){
      this.msg4=0;
    }
    else{
      this.msg4=1;
    }

    //  if(this.myForm.get('nom')?.value.indexOf(" ")>=0){
    //    console.log("yesss fiha espace");
    //     this.msgTest=0;
    //    console.log(this.myForm.get('nom')?.value.split(" ")[0]);
    //    console.log(this.myForm.get('nom')?.value.split(" ")[1]);
    //  }
    //  else{
    //   this.msgTest=1;
    //    console.log("mefihech :( !!!!");
    //  }

     this.fournisseurService.getFournisseurNom(this.myForm.get('nom')?.value).subscribe(t=>{
      this.fournisseurService.getFournisseurPrenom(this.myForm.get('prenom')?.value).subscribe(h=>{
      console.log(t);
      if(t==1 && h==1){
        this.msg1=1;
       }
       else{
        this.msg1=0;
       }

       this.fournisseurService.getFournisseurMatricule(this.myForm.get('matricule')?.value).subscribe(l=>{
        console.log(l);
        if(l==1){
          this.msg2=1;
         }
         else{
          this.msg2=0;
         }

     if(this.myForm.get('nom')?.value!=null && this.myForm.get('prenom')?.value!=null && this.myForm.get('matricule')?.value!=null && t==0 && l==0
     && this.myForm.get('nom')?.value.length>=3 && this.myForm.get('prenom')?.value.length>=3 && this.myForm.get('matricule')?.value.length>=8
     && this.myForm.get('cgu')?.value==true){
    console.log(this.fournisseur);
   // this.fournisseur.idFournisseur = 1;
    this.fournisseurService
        .createFournisseur(
          {
            "nom": this.myForm.get('nom')?.value,
            "prenom": this.myForm.get('prenom')?.value,
            "matricule": this.myForm.get('matricule')?.value,
            
          },
        )
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.fournisseur);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un fournisseur a été ajouté avec succès"]));
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
});
  }


  onSubmit() {
    
    if(this.myForm.get('cgu')?.value==true){
      this.msg4=0;
    }
    else{
      this.msg4=1;
    }

    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/fournisseur/listeFournisseur']);
  }


  onReload(){
       // this.router.navigate([this.router.url]);
   this.router.navigateByUrl("/'agriculteur/bon/listeFournisseur",{skipLocationChange: true}).then( response=> {
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
      'nom' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]),
      'prenom' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]),
      'matricule' : new FormControl(null,[Validators.required,Validators.minLength(8) ]),
      'cgu': new FormControl(false, Validators.requiredTrue),
      });
 }



 get nom(){
  return this.myForm.get('nom') ;
}

get prenom(){
  return this.myForm.get('prenom') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


}

