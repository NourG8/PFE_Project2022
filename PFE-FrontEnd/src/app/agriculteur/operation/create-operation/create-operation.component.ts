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
import { ethers } from 'ethers';
import { asyncScheduler, Observable } from 'rxjs';

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

  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
     // dateOperation : new FormControl(null,[Validators.required ]),
    //  typeOp : new FormControl(null,[Validators.required ]),
      //tank : new FormControl(null,[Validators.required ]),
     // lait : new FormControl(null,[Validators.required ]),

  })
  laits!:Observable<Lait[]>;
  tanks!:Observable<Tank[]>;

  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private laitService:LaitService,
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.laits=this.laitService.getLaits();
    this.tanks=this.tankService.getTanksFiltres();
    this.operationService.getNbOp().subscribe(o=>{
    console.log(o);
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
    this.operationService.createOperation({
     "poidsLait": this.myForm.get('poidsLait')?.value,
   },
         ).subscribe(  async o=>{    
           this.tab = Object.values(o)
          localStorage.setItem('idop',this.tab[0])
           localStorage.setItem('poid',this.tab[1])
           localStorage.setItem('date',this.tab[2])
           localStorage.setItem('type',this.tab[3])
           localStorage.setItem('code',this.tab[4])
           window.localStorage.reload;
           console.log('notmal partie');
          console.log("just a tets");
          console.log(this.tab[1],this.tab[2],this.tab[3],this.tab[4],this.tab[0]);
       },
       (error) => {
         console.log("Failed")
       }
     );
    }



     async saveInBc(){
      const depKEY=Object.keys(Remplissage.networks)[0];
      await this.requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
    
    
        var kk1= JSON.parse(localStorage.getItem('idop') || '[]') || []
        var kk2=JSON.parse(localStorage.getItem('poid') || '[]') || []
        var kk3= localStorage.getItem('date') 
        var kk4=localStorage.getItem('type')
        var kk5=JSON.parse(localStorage.getItem('code') || '[]') || []
        const transaction = await contract.addOperation(kk2,kk3,kk4,kk5,kk1);
        await transaction.wait();
       
            
    
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


  reLoad(){
    this.router.navigate([this.router.url])
  }



onSubmit() {
  this.tankService.getTanksQteGenerale().subscribe(
     o=>{
    console.log(o);
    if(this.myForm.get('poidsLait')?.value<=o){
   this.save()
  this.reLoad()
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


// get lait(){
//   return this.myForm.get('lait') ;
// }

}

