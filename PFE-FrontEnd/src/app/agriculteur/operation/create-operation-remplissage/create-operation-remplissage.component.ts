import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import {Lait } from 'src/app/Models/lait';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import  {LaitService } from 'src/app/Service/lait.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-operation-remplissage',
  templateUrl: './create-operation-remplissage.component.html',
  styleUrls: ['./create-operation-remplissage.component.css']
})
export class CreateOperationRemplissageComponent implements OnInit {

  operation:Operation = new Operation();
  submitted = false;
  msg="";
  msg4=0;
  l:Lait =new Lait();
  t:Tank=new Tank();
  msgErreur=0;
  msgErreur2=0;
  // qte de lait restante pour chaque vache
  qteRsetLait=0;
  //qte restante de lait pour un tank
  qteRsetLaitTank=0;
  valeur1=0;
  valeur2=0;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required,Validators.min(1)]),
      cgu: new FormControl(false, Validators.requiredTrue),
     // dateOperation : new FormControl(null,[Validators.required ]),
      // typeOp : new FormControl(null,[Validators.required ]),
      // tank : new FormControl(null,[Validators.required ]),
      // lait : new FormControl(null,[Validators.required ]),

  })
  laits!:Observable<Lait[]>;
  tanks!:Observable<Tank[]>;

  constructor(private translateService :TranslateService,
    private location:Location,
    private operationService: OperationService,
    private tankService:TankService,
    private laitService:LaitService,
    private authService:AuthService,
    private router: Router,
    private dialogClose: MatDialog) {  this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en') }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }

    //this.ValidatedForm();
    this.laits=this.laitService.getLaits();
    this.tanks=this.tankService.getTanks();
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    if(this.myForm.get('poidsLait')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }


     if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('poidsLait')?.value>0  &&  this.myForm.get('cgu')?.value==true){

    this.operationService
        .createOperationRemplissage(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            // "dateOperation":this.myForm.get('dateOperation')?.value,
           // "typeOp":this.myForm.get('typeOp')?.value,
          }
        )
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.operation);

          localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
          // window.location.reload();
          this.onClose();
        },
        (error) => {
          console.log("Failed")
        }
      );
      }

  }


  onSubmit() {
    //this.submitted = true;
    if(this.myForm.get('cgu')?.value==true){
      this.msg4=0;
    }
    else{
      this.msg4=1;
    }
    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o &&this.myForm.get('poidsLait')?.value>0 )
      this.save();
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }


  });

  }

  gotoList() {
    this.router.navigate(['agriculteur/operation/listeOperation']);
  }


  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/operation/listeOperation",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


get typeOp(){
  return this.myForm.get('typeOp') ;
}

get tank(){
  return this.myForm.get('tank') ;
}


get lait(){
  return this.myForm.get('lait') ;
}

}

