import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Collecteur } from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-update-collecteur',
  templateUrl: './update-collecteur.component.html',
  styleUrls: ['./update-collecteur.component.css']
})
export class UpdateCollecteurComponent implements OnInit {

  collecteur:Collecteur=new Collecteur();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;
  msg=0;
  msg1=0;
  msg2=0;

  constructor(
    private router: Router,
    private dialogClose: MatDialog,
    private location:Location,
    private collecteurService:CollecteurService,

  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.collecteurService.getCollecteur(JSON.parse(localStorage.getItem('IdC') || '[]') || []).subscribe(o =>{
      this.collecteur = o;
      console.log(this.collecteur);
    });

  }

  updatecollecteur(){
    if(this.myForm.get('tel')?.value.length==8){

    this.msg=0;
    }
    else
    this.msg=1;




    if(this.myForm.get('nomCollecteur')?.value.length>=3)
    this.msg1=0;
    else
    this.msg1=1;


    if(this.myForm.get('adresse')?.value.length>=3)
    this.msg2=0;
    else
    this.msg2=1;
    

    if(this.myForm.get('nomCollecteur')?.value!=null && this.myForm.get('tel')?.value!=null
    && this.myForm.get('adresse')?.value!=null &&  this.msg1==0 && this.msg2==0 ){
    this.collecteurService
        .updateCollecteur(this.collecteur.idCollecteur,this.collecteur)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Un collecteur a été modifié avec succes "]));
          // window.location.reload();
          console.log(this.collecteur);
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
      'nomCollecteur' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'adresse' : new FormControl(null,[Validators.required,Validators.minLength(3) ]),
      'tel' : new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(8)  ]),
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

}
