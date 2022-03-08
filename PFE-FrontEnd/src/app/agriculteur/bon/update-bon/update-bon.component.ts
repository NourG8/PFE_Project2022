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
  selector: 'app-update-bon',
  templateUrl: './update-bon.component.html',
  styleUrls: ['./update-bon.component.css']
})
export class UpdateBonComponent implements OnInit {

  bon:Bon=new Bon();
 // myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  myForm=new  FormGroup({
    quantite : new FormControl(null,[Validators.required]),
    type : new FormControl(null,[Validators.required ]),
    date : new FormControl(null,[Validators.required ]),
    prix : new FormControl(null,[Validators.required ]),
    agriculteur : new FormControl(null,[Validators.required ]),
    produit : new FormControl(null,[Validators.required ]),
    fournisseur : new FormControl(null,[Validators.required ]),
  
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
      console.log(this.bon);
    });

    this.produits=this.produitService.getProduits();
    this.fournisseurs=this.fournisseurService.getFournisseurs();
    this.agriculteurs=this.agriculteurService.getagriculteurs();

  }

  updateBon(){

    this.bonService
    // .updateBon(this.bon.idBon,this.bon)
        .updateBon(this.bon.idBon,{
          "quantite":this.myForm.get('quantite')?.value,
          "prix":this.myForm.get('prix')?.value,
          "type":this.myForm.get('type')?.value,
          "date":this.myForm.get('date')?.value,
          "agriculteur":{
            "idAgriculteur":this.myForm.get('agriculteur')?.value,
         },
          "produit":{
             "idProduit":this.myForm.get('produit')?.value,
          },
          "fournisseur":{
            "idFournisseur":this.myForm.get('fournisseur')?.value,
         }
       
        })
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Bon was successfully updated"]));
          window.location.reload();
          console.log(this.bon);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

//   ValidatedForm(){
//     this.myForm = new FormGroup({
//       'quantite' : new FormControl(null,[Validators.required,]),
//       'type' : new FormControl(null,[Validators.required, ]),
//       'date' : new FormControl(null,[Validators.required, ]),
//       'prix' : new FormControl(null,[Validators.required, ]),
//       });
//  }


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


  onClose() {
    this.dialogClose.closeAll();
  }

}
