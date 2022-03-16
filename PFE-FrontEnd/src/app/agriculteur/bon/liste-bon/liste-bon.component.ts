import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { UpdateBonComponent } from '../update-bon/update-bon.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateBonComponent } from '../create-bon/create-bon.component';
import { DatailsBonComponent} from '../datails-bon/datails-bon.component';

@Component({
  selector: 'app-liste-bon',
  templateUrl: './liste-bon.component.html',
  styleUrls: ['./liste-bon.component.css']
})
export class ListeBonComponent implements OnInit {
  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Bon[];
  bon?:Bon;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idBon','quantite', 'prix', 'type','agriculteur','fournisseur','produit','date','action'];
  // displayedColumns: string[] = ['idBon','quantite', 'prix', 'type','date','action'];
  constructor(private bonService: BonService,
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
        this.bonService.getbons().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteBon(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer ??")
      if(confirmation)
      this.bonService.deleteBon(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Bon a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
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
  
  
  
    detailsBon(bon:Bon){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
      this.dialog.open(DatailsBonComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateBon(bon:Bon){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
      this.dialog.open(UpdateBonComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateBonComponent, dialogConfig);
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
