import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';
import { ProduitService } from 'src/app/Service/produit.service';
import { TankService } from 'src/app/Service/tank.service';
import { CreateOperationRemplissageComponent } from '../create-operation-remplissage/create-operation-remplissage.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationRetraitComponent } from '../update-operation-retrait/update-operation-retrait.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';

import { ethers } from 'ethers';

declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Remplissage.json');
@Component({
  selector: 'app-liste-operations-retrait',
  templateUrl: './liste-operations-retrait.component.html',
  styleUrls: ['./liste-operations-retrait.component.css']
})
export class ListeOperationsRetraitComponent implements OnInit {

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

  // tank?:Tank = new Tank();
  p=0;
  q=0;
  msg='';
  test1=0;
  test2=0;

  displayedColumns: string[] = ['idOperation','poidsLait','code', 'dateOperation', 'typeOp','collecteur','action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
    private produitService:ProduitService,
    private router: Router, private dialog:MatDialog) { }
    
    operations: Observable<Operation[]> | undefined;


    reloadData00() {  
      const depKEY=Object.keys(Remplissage.networks)[0];
      if (typeof window.ethereum !== 'undefined') {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner()
     console.log(signer);
     const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
     this.operations = contract.getOperations();}
     console.log(this.operations);
    }
    ngOnInit() {
      this.reloadData();
      this.reloadData00();
      //console.log(this.tankService.getTanksQteLibre());


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
        this.operationService.getOperationsRetraits().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
    deleteOperation(id: number) {
      this.operationService.getOperation(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le Operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperation(id).subscribe(data => {
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
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

    this.tankService.getTanksQteLibre().subscribe(o=>{
      console.log(o);
      this.q=o;
      this.operationService.getOperation(id).subscribe(a=>{
        console.log(a.poidsLait);
        this.p=a.poidsLait;

        if(this.p<=this.q){
          this.deleteOperation(id);
        }else{
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] ='Vous ne pouvez pas supprimer cette opereation, car la quantite restante est inferieur a la quantite que vous voulez la supprimer !!';
          this.showToast();
        }
      });
  
      });  
  }


    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateOperationR(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(UpdateOperationRetraitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      this.tankService.getTanksQteGenerale().subscribe(b=>{
        console.log(b);
       if(b>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationComponent, dialogConfig);
       }
       else{
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] ='Les tanks sont vides !! \n Vous ne pouvez pas effectuer cette operation !!';
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
      }, 9100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 9)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }
  
  }


