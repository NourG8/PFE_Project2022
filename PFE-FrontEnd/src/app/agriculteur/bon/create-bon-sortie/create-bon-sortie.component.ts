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

@Component({
  selector: 'app-create-bon-sortie',
  templateUrl: './create-bon-sortie.component.html',
  styleUrls: ['./create-bon-sortie.component.css']
})
export class CreateBonSortieComponent implements OnInit {

  bon:Bon = new Bon();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      quantite : new FormControl(null,[Validators.required]),
      //type : new FormControl(null,[Validators.required ]),
      // prix : new FormControl(null,[Validators.required ]),
     // agriculteur : new FormControl(null,[Validators.required ]),
      produit : new FormControl(null,[Validators.required ]),
      // fournisseur : new FormControl(null,[Validators.required ]),

  })
  produits!:Observable<Produit[]>;
  agriculteurs!:Observable<Agriculteur[]>;
  fournisseurs!:Observable<Fournisseur[]>;

  constructor(private bonService: BonService, private produitService:ProduitService,private agriculteurService:AgriculteurService,
    private fournisseurService:FournisseurService, private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
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


  if(this.myForm.get('produit')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }


   if(this.myForm.get('quantite')?.value!=null && this.myForm.get('produit')?.value!=null ){

    this.bonService
        .createBonSortie({
          "quantite":this.myForm.get('quantite')?.value,
          "produit":{
             "idProduit":this.myForm.get('produit')?.value,
          },

        })
        .subscribe(o=>{
          window.location.reload();
          console.log(this.bon);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un bon a été ajouté avec succès"]));
          window.location.reload();
        });
      }
    }


  onSubmit() {

    this.produitService.getProduit(this.myForm.get('produit')?.value).subscribe(
      o=>{
      console.log(o.qte);
      if(this.myForm.get('quantite')?.value<=o.qte )
      this.save();
     else{
     this.msgErreur=1;
     this.qteAct=o.qte;
     }
        // this.msgErreur=0;
    
    });

  }

  gotoList() {
    this.router.navigate(['agriculteur/bon/listeBonSortie']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
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
