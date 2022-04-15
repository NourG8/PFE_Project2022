import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import {Lait } from 'src/app/Models/lait';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import  {LaitService } from 'src/app/Service/lait.service';
import  {CollecteurService } from 'src/app/Service/collecteur.service';
import { Collecteur } from 'src/app/Models/collecteur';


import { ethers } from 'ethers';
import { asyncScheduler, Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Remplissage.json');

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation:Operation = new Operation();
  t:Tank=new Tank();
  submitted = false;
  msg="";
  msgErreur=0;
  qteActLaitTank=0;
  som=10000;
  tab!: any[];
  tabstr!: string[];
  tabint!: number[];
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
      collecteur : new FormControl(null,[Validators.required ]),
     // dateOperation : new FormControl(null,[Validators.required ]),
    //  typeOp : new FormControl(null,[Validators.required ]),
      //tank : new FormControl(null,[Validators.required ]),
     // lait : new FormControl(null,[Validators.required ]),

  })
  laits!:Observable<Lait[]>;
  tanks!:Observable<Tank[]>;
  collecteurs!:Observable<Collecteur[]>;
  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private laitService:LaitService,
    private collecteurService:CollecteurService,
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.laits=this.laitService.getLaits();
    this.collecteurs=this.collecteurService.getCollecteurs(); 
    this.tanks=this.tankService.getTanksFiltres();
    this.operationService.getNbOp().subscribe(o=>{
    this.som=this.som+o+1;
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }


  async  requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }


  async save() {
    if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('collecteur')?.value!=null ){
    this.operationService.createOperation({
     "poidsLait": this.myForm.get('poidsLait')?.value,
     "collecteur":{
      "idCollecteur":this.myForm.get('collecteur')?.value,  
   },
   },
         ).subscribe(  async o=>{   
            this.collecteurService.getCollecteur(this.myForm.get('collecteur')?.value).subscribe(
              b=>{
                console.log(b)
                localStorage.setItem('idcoll',b.idCollecteur)
                localStorage.setItem('nomcoll',b.nomCollecteur)
                localStorage.setItem('address',b.adresse)
                localStorage.setItem('tel',b.tel)
              }
            )
           this.tab = Object.values(o)
         console.log(this.tab);
          localStorage.setItem('idop',this.tab[0])
           localStorage.setItem('poid',this.tab[1])
           localStorage.setItem('date',this.tab[2])
           localStorage.setItem('type',this.tab[3])
           localStorage.setItem('code',this.tab[4])

           localStorage.setItem('agriconom',this.tab[5].nom)
           localStorage.setItem('agricoprenom',this.tab[5].prenom)
       
          
       //   console.log(this.tab[1],this.tab[2],this.tab[3],this.tab[4],this.tab[0],this.tab[5],this.tab[6],this.tab[7]);
       },
       (error) => {
         console.log("Failed")
       }
     );
    }

  }

  agri:Agriculteur=  new Agriculteur();
  oppr:Operation = new Operation();
  collect:Collecteur = new Collecteur();

  mm!:number;
     async saveInBc(){
      const depKEY=Object.keys(Remplissage.networks)[0];
      await this.requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)

      this.oppr.idOperation=JSON.parse(localStorage.getItem('idop') || '[]') || []
      this.oppr.poidsLait=JSON.parse(localStorage.getItem('poid') || '[]') || []
      this.oppr.dateOperation=JSON.parse(JSON.stringify(localStorage.getItem('date') )|| '[]') || []
      this.oppr.typeOp=JSON.parse(JSON.stringify(localStorage.getItem('type'))|| '[]') || []
      this.oppr.code=JSON.parse(localStorage.getItem('code') || '[]') || []
     
      this.collect.nomCollecteur=JSON.parse(JSON.stringify(localStorage.getItem('nomcoll') )|| '[]') || []
      this.collect.adresse=JSON.parse(JSON.stringify(localStorage.getItem('address') )|| '[]') || []
      this.collect.tel=JSON.parse(localStorage.getItem('tel') || '[]') || []
      this.collect.idCollecteur=JSON.parse(localStorage.getItem('idcoll') || '[]') || []
      
    var s1=JSON.parse(JSON.stringify(localStorage.getItem('agriconom') )|| '[]') || []
    //  this.oppr.agriculteur.nom=this.agri.nom;
    var s2=JSON.parse(JSON.stringify(localStorage.getItem('agricoprenom') )|| '[]') || ''  
     // this.oppr.agriculteur.type='0'
     // this.oppr.agriculteur.username='0'
    //  this.oppr.agriculteur.password='0'
var s3 =s1 +" "+ s2 

console.log("var3");
console.log(s3);
this.oppr.sender=s3

      console.log("this.collect");
      console.log(this.collect);

      this.oppr.collecteur=this.collect;
     // this.oppr.collecteur.nomCollecteur =JSON.parse(JSON.stringify(localStorage.getItem('nomcoll') )|| '[]') || [];
     // this.oppr.collecteur.adresse=JSON.parse(JSON.stringify(localStorage.getItem('address') )|| '[]') || []
     // this.oppr.collecteur.tel=JSON.parse(localStorage.getItem('tel') || '[]') || []
      //this.oppr.collecteur.idCollecteur=JSON.parse(localStorage.getItem('idcoll') || '[]') || []
      console.log("this.oppr");
      console.log(this.oppr);
  
  
      const transaction = await contract.addOperation2(this.oppr);
        
      await transaction.wait() ; 
  
      }
    




  // save() {


  //   if(this.myForm.get('poidsLait')?.value==null){
  //     this.msg="vous devez remplir le formulaire !!";
  //    }
  //    else{
  //     this.msg="";
  //    }


  //    if(this.myForm.get('poidsLait')?.value!=null){

  //   this.operationService
  //   .createOperation(
  //     {
  //       "poidsLait":this.myForm.get('poidsLait')?.value
  //       },

  //   )
  //   .subscribe(o=>{
  //     window.location.reload();
  //     console.log(this.operation);
  //     localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
  //     window.location.reload();
  //   },
  //   (error) => {
  //     console.log("Failed")
  //   }
  // );
  //    }
    //  ****************   Tank    ******************
//     let bb=this.tankService.getTank(this.myForm.get('tank')?.value).subscribe(o=>{
//       this.t=o;
//       console.log(o);
//       console.log(this.t);
//       console.log(o.poidActuel);
// if(o.poidActuel<this.myForm.get('poidsLait')?.value){
// this.msgErreur=1;
// this.qteActLaitTank=o.poidActuel;
//     }
// else
// this.msgErreur=0;
//     });
// if(this.qteActLaitTank>=this.myForm.get('poidsLait')?.value){



 // }
//for testing



  reLoad(){
    this.router.navigate([this.router.url])
  }



onSubmit() {
  this.tankService.getTanksQteGenerale().subscribe(
     o=>{
    if(this.myForm.get('poidsLait')?.value<=o){
   this.save()
  this.reLoad()
  this.onClose()
    this.saveInBc()
  
    }
   
    else{
    this.msgErreur=1;
    this.qteActLaitTank=o;
    }
});
}


  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperationRetrait']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


get collecteur(){
  return this.myForm.get('collecteur') ;
}

// get lait(){
//   return this.myForm.get('lait') ;
// }

}

