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

  ELEMENT_DATA?:Bon[];
  bon?:Bon;
  dataSource!:MatTableDataSource<any>;
  // displayedColumns: string[] = ['idBon','quantite', 'prix', 'type','agriculteur','fournisseur','date','action'];
  displayedColumns: string[] = ['idBon','quantite', 'prix', 'type','date','action'];
  constructor(private bonService: BonService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
     
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
  
     deleteBon(id: number) {
      this.bonService.getBon(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le bon où son id est egale à : "+id+" ??")
      if(confirmation)
      this.bonService.deleteBon(id).subscribe(data => {
            console.log(data);
            window.location.reload();
      });
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
  
  }
