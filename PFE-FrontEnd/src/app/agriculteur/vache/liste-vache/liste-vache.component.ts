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

  ELEMENT_DATA?:Vache[];
  vache?:Vache;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idVache','poids', 'race', 'dateNaissance','etat','qte_prodLait','action'];
  constructor(private vacheService: VacheService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
     
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
      this.vacheService.getVache(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le Vache où son id est egale à : "+id+" ??")
      if(confirmation)
      this.vacheService.deleteVache(id).subscribe(data => {
            console.log(data);
            window.location.reload();
      });
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
  
  }
