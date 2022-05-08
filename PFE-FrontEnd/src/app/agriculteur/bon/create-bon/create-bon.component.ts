import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from 'src/app/Service/produit.service';
import { Produit } from 'src/app/Models/produit';
import { Observable } from 'rxjs';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Fournisseur } from 'src/app/Models/fournisseur';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-create-bon',
  templateUrl: './create-bon.component.html',
  styleUrls: ['./create-bon.component.css']
})
export class CreateBonComponent implements OnInit {

  bon:Bon = new Bon();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;
  msg4=0;

  myForm=new  FormGroup({
      quantite : new FormControl(null,[Validators.required,Validators.min(1)]),
      //type : new FormControl(null,[Validators.required ]),
      prix : new FormControl(null,[Validators.required,Validators.min(1)]),
     // agriculteur : new FormControl(null,[Validators.required ]),
      produit : new FormControl(null,[Validators.required ]),
      fournisseur : new FormControl(null,[Validators.required ]),
      cgu: new FormControl(false, Validators.requiredTrue),

  })
  produits!:Observable<Produit[]>;
  agriculteurs!:Observable<Agriculteur[]>;
  fournisseurs!:Observable<Fournisseur[]>;

  constructor(private bonService: BonService, private produitService:ProduitService,private agriculteurService:AgriculteurService,
    private location:Location,private fournisseurService:FournisseurService, private router: Router, private dialogClose: MatDialog,
    private authService:AuthService) { }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }


    //this.ValidatedForm();
    this.produits=this.produitService.getProduits();
    this.fournisseurs=this.fournisseurService.getFournisseurs();
    this.agriculteurs=this.agriculteurService.getagriculteurs();

  }

  newEmployee(): void {
    this.submitted = false;
    this.bon = new Bon();
  }

  save() {

   if(this.myForm.get('quantite')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   if(this.myForm.get('prix')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }


  if(this.myForm.get('produit')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('fournisseur')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('quantite')?.value!=null  && this.myForm.get('prix')?.value!=null 
   && this.myForm.get('quantite')?.value!=0 && this.myForm.get('prix')?.value!=0
   && this.myForm.get('produit')?.value!=null && this.myForm.get('fournisseur')?.value!=null 
   && this.myForm.get('quantite')?.value>0 && this.myForm.get('prix')?.value>0
   &&  this.myForm.get('cgu')?.value==true){

    this.bonService
        .createBon({
          "quantite":this.myForm.get('quantite')?.value,
          "prix":this.myForm.get('prix')?.value,
          "produit":{
             "idProduit":this.myForm.get('produit')?.value,
          },
          "fournisseur":{
            "idFournisseur":this.myForm.get('fournisseur')?.value,
         }

        })
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.bon);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un bon a été ajouté avec succès"]));
          // window.location.reload();
          this.onClose();
        });
      }
    }


  onSubmit() {

    if(this.myForm.get('quantite')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
  
     if(this.myForm.get('prix')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }
  
  
    if(this.myForm.get('produit')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }
  
     if(this.myForm.get('fournisseur')?.value==null){
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

    this.produitService.getProduit(this.myForm.get('produit')?.value).subscribe(
      o=>{
      console.log(o.qte);
        this.save();


    });

  }

  gotoList() {
    this.router.navigate(['agriculteur/bon/listeBon']);
  }


  onReload(){
     // this.router.navigate([this.router.url]);
     this.router.navigateByUrl("/'agriculteur/bon/listeBon",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
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

get produit(){
  return this.myForm.get('produit') ;
}

get fournisseur(){
  return this.myForm.get('fournisseur') ;
}

}

