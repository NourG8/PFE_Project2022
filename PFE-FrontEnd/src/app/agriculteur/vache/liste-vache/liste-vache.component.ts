import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vache } from 'src/app/Models/vache';
import { VacheService } from 'src/app/Service/vache.service';
import { CreateVacheComponent } from '../create-vache/create-vache.component';
import { DetailsVacheComponent } from '../details-vache/details-vache.component';
import { UpdateVacheComponent } from '../update-vache/update-vache.component';

@Component({
  selector: 'app-liste-vache',
  templateUrl: './liste-vache.component.html',
  styleUrls: ['./liste-vache.component.css']
})
export class ListeVacheComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Vache[];
  vache?:Vache;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idVache','matricule','poids','etat', 'race', 'dateNaissance','qte_prodLait','action'];
  constructor(private vacheService: VacheService,
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
        this.vacheService.getVaches().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }

     
    deleteVache(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer le produit où son id est egale à : "+id+" ??")
      if(confirmation)
      this.vacheService.deleteVache(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Vache a été supprimée avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression de la vache !!';
        this.showToast();
      }
    );
  }
  
  
  
    detailsVache(vache:Vache){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdVache', JSON.stringify(vache.idVache));
      this.dialog.open(DetailsVacheComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateVache(vache:Vache){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdVache', JSON.stringify(vache.idVache));
      this.dialog.open(UpdateVacheComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateVacheComponent, dialogConfig);
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


