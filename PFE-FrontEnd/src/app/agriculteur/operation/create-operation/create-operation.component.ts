import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Lait } from 'src/app/Models/lait';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import { LaitService } from 'src/app/Service/lait.service';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import { Collecteur } from 'src/app/Models/collecteur';
import { Location } from "@angular/common";


import { ethers } from 'ethers';
import { asyncScheduler, Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageAgric.json');

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {
  operation: Operation = new Operation();
  t: Tank = new Tank();
  submitted = false;
  msg = "";
  msgErreur = 0;
  qteActLaitTank = 0;
  som = 10000;
  tab!: any[];
  tabstr!: string[];
  tabint!: number[];
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    collecteur: new FormControl(null, [Validators.required]),
    // dateOperation : new FormControl(null,[Validators.required ]),
    //  typeOp : new FormControl(null,[Validators.required ]),
    //tank : new FormControl(null,[Validators.required ]),
    // lait : new FormControl(null,[Validators.required ]),

  })
  laits!: Observable<Lait[]>;
  tanks!: Observable<Tank[]>;
  collecteurs!: Observable<Collecteur[]>;
  constructor(
    private location: Location,
    private operationService: OperationService,
    private tankService: TankService,
    private laitService: LaitService,
    private collecteurService: CollecteurService,
    private agriculteurService: AgriculteurService,
    private router: Router,
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.laits = this.laitService.getLaits();
    this.collecteurs = this.collecteurService.getCollecteurs();
    this.tanks = this.tankService.getTanksFiltres();
    this.operationService.getNbOp().subscribe(o => {
      this.som = this.som + o + 1;
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }


  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }


  async save() {

    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = "vous devez remplir le formulaire !!";
    }
    else {
      this.msg = "";
    }
    if (this.myForm.get('collecteur')?.value == null) {
      this.msg = "vous devez remplir le formulaire !!";
    }
    else {
      this.msg = "";
    }
    if (this.myForm.get('poidsLait')?.value != null && this.myForm.get('collecteur')?.value != null && this.myForm.get('poidsLait')?.value > 0) {
      this.operationService.createOperation({
        "poidsLait": this.myForm.get('poidsLait')?.value,
        "collecteur": {
          "idCollecteur": this.myForm.get('collecteur')?.value,
        },
        "code": this.som,
      },
      ).subscribe(async o => {
        this.collecteurService.getCollecteur(this.myForm.get('collecteur')?.value).subscribe(
          b => {
            localStorage.setItem('idcoll', JSON.stringify(b))
          })
        this.tab = Object.values(o)
        localStorage.setItem('idop', JSON.stringify(o))
        localStorage.setItem('Toast', JSON.stringify(["Success", "Une operation a été ajouté avec succès"]));
        this.onReload();
      },
        (error) => {
          console.log("Failed")
        }
        
      );
      this.onReload();
    }
    this.onReload();
  }

  agri: Agriculteur = new Agriculteur();
  oppr: Operation = new Operation();
  collect: Collecteur = new Collecteur();

  mm!: number;
  async saveInBc() {
    const depKEY = Object.keys(Remplissage.networks)[0];
    await this.requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
    
    this.agri= JSON.parse(localStorage.getItem('idag') || '[]') || []
    this.oppr = JSON.parse(localStorage.getItem('idop') || '[]') || []
    this.collect = JSON.parse(localStorage.getItem('idcoll') || '[]') || []
    this.oppr.collecteur = this.collect;

    console.log("this.5555555555555555555555555555555555555");
    console.log(this.oppr);


    const transaction = await contract.addOperation2(this.oppr);

    await transaction.wait();
    window.localStorage.removeItem("idag");
    window.localStorage.removeItem("idop");
    window.localStorage.removeItem("idcoll");
    this.onClose();
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







  onSubmit() {

    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = "vous devez remplir le formulaire !!";
    }
    else {
      this.msg = "";
    }

    if (this.myForm.get('collecteur')?.value == null) {
      this.msg = "vous devez remplir le formulaire !!";
    }
    else {
      this.msg = "";
    }

    this.tankService.getTanksQteGenerale().subscribe(
      o => {

        if (this.myForm.get('poidsLait')?.value != null && this.myForm.get('collecteur')?.value != null && this.myForm.get('poidsLait')?.value > 0) {
          if (this.myForm.get('poidsLait')?.value <= o) {
            this.save()
            // this.gotoList()
            this.saveInBc()
            this.msgErreur = 0;
          }

          else {
            this.msgErreur = 1;
            this.qteActLaitTank = o;
          }
        }
      });
  }


  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperationRetrait']);
  }


  onReload() {
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/operation/listeOperationRetrait", { skipLocationChange: true }).then(response => {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }
  get poidsLait() {
    return this.myForm.get('poidsLait');
  }


  get collecteur() {
    return this.myForm.get('collecteur');
  }

  // get lait(){
  //   return this.myForm.get('lait') ;
  // }

}

