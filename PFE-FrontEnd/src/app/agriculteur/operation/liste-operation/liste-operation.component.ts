import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import { CreateOperationRemplissageComponent } from '../create-operation-remplissage/create-operation-remplissage.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';
import { Tank } from 'src/app/Models/tank';
import {Location} from "@angular/common";

@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.css']
})
export class ListeOperationComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Operation[];
  operation?:Operation;
  dataSource!:MatTableDataSource<any>;
  v=0;
  tank?:Tank = new Tank();
  p=0;
  q=0;
  msg='';
  test1=0;
  test2=0;

  OpTank=new Array();

  displayedColumns: string[] = ['idOperation','poidsLait', 'dateOperation', 'typeOp','action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
    private location:Location,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
      console.log(this.tankService.getTanksQteLibre());

      this.idContenu = 'TostSuccessContenu';
      this.idTitle = 'TostSuccessTile';

      this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
      if (this.Toast[0] == 'Success') {
        console.log('Toast est n est pas vide');
        this.showToast();
      } else {
        console.log('Toast Vide');
      }

    }

    reloadData() {
        this.operationService.getOperationsRemplissages().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});

    }

    deleteOperation(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer l'Operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperation(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Operation !!';
        this.showToast();
      }
    );
  }


  deleteOp(id: number){

    this.tankService.getTanksQteGenerale().subscribe(o=>{
      console.log(o);
      this.q=o;
      this.operationService.getOperation(id).subscribe(a=>{
        console.log(a.poidsLait);
        console.log(id);
        this.p=a.poidsLait;

        this.operationService.getNbOpTankTotal(id).subscribe(b=>{
          console.log(b);
          this.test1=b;

          this.operationService.getNbOpTank(id).subscribe(c=>{
            console.log(c);
            this.test2=c;
  

        // 3titou idOperation raja3li kifech 9assem w 9ade inserer fi kol tank
      //  this.operationService.getOpTank(id).subscribe(i=>{
      // console.log(i[0]);

    //   for (let j = 0; j < i.length; j = j +1) {
    //     console.log("i= " + i[j].tank.idTank);
    //     this.OpTank.push(i[j].tank.idTank);

    // }

      //   console.log("########"+this.OpTank.length);
      //   for (let b = 0; b < this.OpTank.length; b = b +1) {
      //       this.tankService.getTank(this.OpTank[b]).subscribe(h=>{
      //       // console.log(h);
      //       this.tank=h;
      //       console.log(this.tank);
      //       if(this.tank!.poidActuel>0){
      //         // this.msg="true";
      //         this.test=this.test+1;
      //       }
      //       console.log(this.test);

      //   });
      // }

      // if(this.test==this.OpTank.length){
      //   this.msg="true";
      // }
      // else {
      //   this.msg="false";
      // }
      // console.log("test : "+this.test);
      // console.log("test : "+this.msg);
      // console.log(this.OpTank.length);
      //   console.log("########"+this.OpTank.length);

        if(this.p<=this.q && this.test1==this.test2){
          this.deleteOperation(id);
        }
        // else if(this.p>this.q){
        //   this.idContenu = 'TostDangerContenu';
        //   this.idTitle = 'TostDangerTile';
        //   this.Toast[0] = 'Failed';
        //   this.Toast[1] ='Vous ne pouvez pas supprimer cette opereation, car la quantite disponible dans les tanks est inferieur a la quantite que vous voulez la supprimer !!';
        //   this.showToast();
        // }

        else {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] ='Vous avez deja utiliser la quantite de laits inserée dans les tanks affectees a cette operation !!';
          this.showToast();
        }

      });
    });
  });

    });
  }



  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/operation/listeOperation",{skipLocationChange: true}).then( response=> {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }


  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }



    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }

    updateOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(UpdateOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }

    onOpenDialogCreate():void{
      this.tankService.getTanksQteLibre().subscribe(t=>{
        console.log(t);
     if(t>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRemplissageComponent, dialogConfig);
     }
     else{
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.Toast[0] = 'Erreur';
      this.Toast[1] ='Les tanks sont totalement remplis !! \n Vous ne pouvez pas effectuer cette operation !!';
      this.showToast();
     }
    });
    }

    onOpenDialogCreate2():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRemplissageComponent, dialogConfig);
    }


    filterData($event:any){
      this.dataSource.filter = $event.target.value;
    }

    showToast() {
      if (this.ShowToast == 'hide') {
        setTimeout(() => {
          this.ShowToast = 'show';
          console.log(this.ShowToast);
        }, 1);
      }

      setTimeout(() => {
        this.ShowToast = 'hide';
        this.Toast = [];
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        console.log(this.ShowToast);
      }, 7100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 6)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }

  }


