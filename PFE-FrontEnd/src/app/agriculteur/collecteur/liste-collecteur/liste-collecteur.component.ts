import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Collecteur } from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import { CreateCollecteurComponent } from '../create-collecteur/create-collecteur.component';
import { DetailsCollecteurComponent } from '../details-collecteur/details-collecteur.component';
import { UpdateCollecteurComponent } from '../update-collecteur/update-collecteur.component';
import {Location} from "@angular/common";

@Component({
  selector: 'app-liste-collecteur',
  templateUrl: './liste-collecteur.component.html',
  styleUrls: ['./liste-collecteur.component.css']
})
export class ListeCollecteurComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Collecteur[];
  Collecteur?:Collecteur;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idCollecteur','nomCollecteur', 'adresse','tel','action'];
  constructor(private collcteurService: CollecteurService,
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
        this.collcteurService.getCollecteurs().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }

    deleteCollecteur(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer le collecteur où son id est egale à : "+id+" ??")
      if(confirmation)
      this.collcteurService.deleteCollecteur(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Collecteur a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Collecteur !!';
        this.showToast();
      }
    );
  }
  
  
    detailsCollecteur(collecteur:Collecteur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdC', JSON.stringify(collecteur.idCollecteur));
      this.dialog.open(DetailsCollecteurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateCollecteur(collecteur:Collecteur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdC', JSON.stringify(collecteur.idCollecteur));
      this.dialog.open(UpdateCollecteurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateCollecteurComponent, dialogConfig);
    }
  
    onReload(){
      // this.router.navigate([this.router.url]);
      this.router.navigateByUrl("/'agriculteur/bon/listeCollecteur",{skipLocationChange: true}).then( response=> {
        this.router.navigate([decodeURI(this.location.path())]);
      })
    }
    
    
    onClose() {
      this.dialog.closeAll();
      // this.gotoList();
      this.onReload();
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

