import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/Models/produit';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { ProduitService } from 'src/app/Service/produit.service';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { FournisseurService } from 'src/app/Service/fournisseur.service';


@Component({
  selector: 'app-update-bon-sortie',
  templateUrl: './update-bon-sortie.component.html',
  styleUrls: ['./update-bon-sortie.component.css']
})
export class UpdateBonSortieComponent implements OnInit {

  bon:Bon=new Bon();
 // myForm!:FormGroup;
  CheckesCompetance:boolean=false;
  qteBonInit=0;

  myForm=new  FormGroup({
    quantite : new FormControl(null,[Validators.required]),
  
})
produits!:Observable<Produit[]>;
agriculteurs!:Observable<Agriculteur[]>;
fournisseurs!:Observable<Fournisseur[]>;

  constructor(
    private dialogClose: MatDialog,
    private bonService:BonService,
    private produitService:ProduitService,
    private agriculteurService:AgriculteurService,
    private fournisseurService:FournisseurService,
  ) { }

  ngOnInit(): void {
    //this.ValidatedForm();
    this.bonService.getBon(JSON.parse(localStorage.getItem('IdBon') || '[]') || []).subscribe(o =>{
      this.bon = o;
      this.qteBonInit=this.bon.quantite;
      console.log(this.bon);
      console.log(this.qteBonInit);
      console.log(this.bon.produit.qte);
    });

    this.produits=this.produitService.getProduits();
    this.fournisseurs=this.fournisseurService.getFournisseurs();
    this.agriculteurs=this.agriculteurService.getagriculteurs();

  }

  updateBon(){

    this.bonService
    // .updateBon(this.bon.idBon,this.bon)
        .updateBonSortie(this.bon.idBon,{
          "quantite":this.myForm.get('quantite')?.value,
        })
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Un bon a été modifié avec succes"]));
           window.location.reload();
          console.log(this.bon);
          console.log(this.myForm.get('quantite')?.value);
          console.log(this.bon.quantite);
          console.log(this.bon.produit.qte);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

 get quantite(){
  return this.myForm.get('quantite') ;
}

get type(){
  return this.myForm.get('type') ;
}



get prix(){
  return this.myForm.get('prix') ;
}


  onClose() {
    this.dialogClose.closeAll();
  }

}