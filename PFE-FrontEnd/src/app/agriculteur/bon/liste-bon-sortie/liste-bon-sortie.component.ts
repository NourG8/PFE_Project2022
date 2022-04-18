import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { ProduitService } from 'src/app/Service/produit.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatailsBonComponent} from '../datails-bon/datails-bon.component';
import { UpdateBonSortieComponent } from '../update-bon-sortie/update-bon-sortie.component';
import { CreateBonSortieComponent } from '../create-bon-sortie/create-bon-sortie.component';
import {Location} from "@angular/common";

@Component({
  selector: 'app-liste-bon-sortie',
  templateUrl: './liste-bon-sortie.component.html',
  styleUrls: ['./liste-bon-sortie.component.css']
})
export class ListeBonSortieComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  erreur =0;

  ELEMENT_DATA?:Bon[];
  bon?:Bon;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idBon','quantite', 'type','produit','date','action'];
  // displayedColumns: string[] = ['idBon','quantite', 'prix', 'type','date','action'];
  constructor(private bonService: BonService,
    private produitService:ProduitService,
    private location:Location,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();

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
        this.bonService.getbonsSortie().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);
        
      });
    }
  
   
    deleteBon(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer ??")
      if(confirmation)
      this.bonService.deleteBon(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Bon a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du bon !!';
        this.showToast();
      }
    );
  }
  

  onReload(){
   // this.router.navigate([this.router.url]);
   this.router.navigateByUrl("/'agriculteur/bon/listeBonSortie",{skipLocationChange: true}).then( response=> {
    this.router.navigate([decodeURI(this.location.path())]);
  })
  }


  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }

    detailsBon(bon:Bon){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
      this.dialog.open( DatailsBonComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateBon(bon:Bon){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
      this.dialog.open(UpdateBonSortieComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      this.produitService.getSomStock().subscribe( p=>{
    if(p>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateBonSortieComponent, dialogConfig);
    }
    else{
      this.erreur=1;
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.Toast[0] = 'Erreur';
      this.Toast[1] ='Le stock est vide !! \n Vous ne pouvez pas effectuer cette operation !!';
      this.showToast();
  }
  });
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
      }, 6100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 6)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }
  
  }
