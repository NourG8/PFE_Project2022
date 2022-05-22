import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Lait } from 'src/app/Models/lait';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import { LaitService } from 'src/app/Service/lait.service';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import { Collecteur } from 'src/app/Models/collecteur';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';

import { ethers } from 'ethers';
import { asyncScheduler, Observable } from 'rxjs';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { TranslateService } from '@ngx-translate/core';
// import { CsvBuilder } from 'filefy';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { environment } from 'src/environments/environment';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageAgric.json');

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css'],
})
export class CreateOperationComponent implements OnInit {
  operation: Operation = new Operation();
  t: Tank = new Tank();
  submitted = false;
  msg = '';
  msg4 = 0;
  msgErreur = 0;
  qteActLaitTank = 0;
  som = 10000;
  tab!: any[];
  tab0!: any[];
  tabstr!: string[];
  tabint!: number[];
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    collecteur: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
    // dateOperation : new FormControl(null,[Validators.required ]),
    //  typeOp : new FormControl(null,[Validators.required ]),
    //tank : new FormControl(null,[Validators.required ]),
    // lait : new FormControl(null,[Validators.required ]),
  });
  laits!: Observable<Lait[]>;
  tanks!: Observable<Tank[]>;
  collecteurs!: Observable<Collecteur[]>;
  constructor(
    private translateService: TranslateService,
    private location: Location,
    private operationService: OperationService,
    private tankService: TankService,
    private laitService: LaitService,
    private collecteurService: CollecteurService,
    private agriculteurService: AgriculteurService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    //this.ValidatedForm();
    this.laits = this.laitService.getLaits();
    this.collecteurs = this.collecteurService.getCollecteurs();
    this.tanks = this.tankService.getTanksFiltres();
    this.operationService.getNbOp().subscribe((o) => {
      this.som = this.som + o + 1;
    });
  }
  exportOne(op: Operation) {
    // new CsvBuilder("operation.csv")
    // .setColumns(["#ID","Quantity of milk taken(Kg)","Operation Code","collector name","Operation Date","Action"])
    // .addRow([op.idOperation.toString() , op.poidsLait.toString() , op.code.toString() , op.collecteur.nomCollecteur , op.dateOperation , confirmation])
    // .exportFile();

    const doc = new jsPDF();
    var imageData = environment.img;
    const n = op.code.toString() + '.pdf';

    // const head = [['ID',"Quantity of milk taken(Kg)","Operation Code","collector name","Operation Date","Action"]]
    // const data = [
    //     [op.idOperation, op.poidsLait, op.code , op.collecteur.nomCollecteur , op.dateOperation , confirmation],
    doc.addImage(imageData, 'JPEG', 0, 0, 210, 297);
    // ]
    doc.text(op.code.toString(), 92, 54);
    doc.text(op.agriculteur.nom.toString(), 75, 107.2);
    doc.text(op.collecteur.nomCollecteur.toString(), 107, 139);
    doc.text(op.dateOperation.toString(), 120, 123.5);
    // doc.text(op.code.toString().toString(),92,157)
    // autoTable(doc, {
    //     head: head,
    //     body: data,
    //     didDrawCell: (data) => { },
    // });

    doc.save(n);
  }

  oppration: Operation = new Operation();
  collector: Collecteur = new Collecteur();

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  save() {
    environment.wating = 'startwaiting';
    this.onReload();
    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }
    if (this.myForm.get('collecteur')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }
    if (
      this.myForm.get('poidsLait')?.value != null &&
      this.myForm.get('collecteur')?.value != null &&
      this.myForm.get('poidsLait')?.value > 0 &&
      this.myForm.get('cgu')?.value == true
    ) {
      this.operationService
        .createOperation({
          poidsLait: this.myForm.get('poidsLait')?.value,
          collecteur: {
            idCollecteur: this.myForm.get('collecteur')?.value,
          },
          code: this.som,
        })
        .subscribe(
          (o) => {
            this.tab = Object.values(o);
            //operation
            this.operation.idOperation = this.tab[0];
            this.operation.code = this.tab[4];
            this.operation.dateOperation = this.tab[2];
            this.operation.typeOp = this.tab[3];
            this.operation.poidsLait = this.tab[1];
            this.operation.agriculteur = this.tab[5];


            this.collecteurService
              .getCollecteur(this.myForm.get('collecteur')?.value)
              .subscribe(async (b) => {
                this.tab0 = Object.values(b);
                this.collector.idCollecteur = this.tab0[0];
                this.collector.nomCollecteur = this.tab0[1];
                this.collector.prenomCollecteur = this.tab0[2];
                this.collector.matricule = this.tab0[3];
                this.collector.adresse = this.tab0[4];
                this.collector.tel = this.tab0[5];
                this.operation.collecteur = this.collector;

                await this.saveInBc(this.operation);
                if (this.confirmation == 'rejected') {
                  localStorage.setItem(
                    'Toast',
                    JSON.stringify([
                      'Failed',
                      "l'opération a été rejetée",
                    ])
                  );
             
                }else{
                  localStorage.setItem(
                    'Toast',
                    JSON.stringify([
                      'Success',
                      'Une operation a été ajouté avec succès',
                    ])
                  );
                }    
              });
      
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  confirmation: string = 'confirmed';

  async saveInBc(oppr: Operation) {
    //this is for waiting the metamask window confirmation
    this.onReload();

    const depKEY = Object.keys(Remplissage.networks)[0];
    await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Remplissage.networks[depKEY].address,
      Remplissage.abi,
      signer
    );

    try {
      const transaction = await contract.addOperation2(oppr);
      await transaction.wait();
      environment.wating = 'confirmed';
    } catch (error) {
      this.confirmation = 'rejected';
      console.log('rejected');
    }
    if (this.confirmation == 'confirmed') {
      environment.wating = 'confirmed';
   
      this.exportOne(oppr);
    }

    if (this.confirmation == 'rejected') {
      environment.wating = 'rejected';
      localStorage.setItem(
        'Toast',
        JSON.stringify([
          'Rejected',
          "l'opération a été rejetée",
        ])
      );
      this.operationService
        .deleteOperation(oppr.idOperation).subscribe(d=>{ this.onReload(); });
    }
    this.onReload()
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

  async onSubmit() {
    if (this.myForm.get('poidsLait')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('collecteur')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }

    this.tankService.getTanksQteGenerale().subscribe(async (o) => {
      if (
        this.myForm.get('poidsLait')?.value != null &&
        this.myForm.get('collecteur')?.value != null &&
        this.myForm.get('poidsLait')?.value > 0
      ) {
        if (this.myForm.get('poidsLait')?.value <= o) {
          this.save();
          this.onClose();
          this.msgErreur = 0;
        } else {
          this.msgErreur = 1;
          this.qteActLaitTank = o;
        }
      }
    });
  }

  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperationRetrait']);
  }

  onReload(): void {
    // this.router.navigate([this.router.url]);
    this.router
      .navigateByUrl("/'agriculteur/operation/listeOperationRetrait", {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
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
