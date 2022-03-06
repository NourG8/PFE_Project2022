import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { CreateFournisseurComponent } from '../create-fournisseur/create-fournisseur.component';
import { DetailsFournissseurComponent } from '../details-fournissseur/details-fournissseur.component';
import { UpdateFournisseurComponent } from '../update-fournisseur/update-fournisseur.component';

@Component({
  selector: 'app-liste-fournisseur',
  templateUrl: './liste-fournisseur.component.html',
  styleUrls: ['./liste-fournisseur.component.css']
})
export class ListeFournisseurComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  ELEMENT_DATA?:Fournisseur[];
  fournisseur?:Fournisseur;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idFournisseur','nom', 'matricule','action'];
  constructor(private fournisseurService: FournisseurService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
     
    }
  
    reloadData() {
        this.fournisseurService.getFournisseurs().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
     deleteFournisseur(id: number) {
      this.fournisseurService.getFournisseur(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le fournisseur où son id est egale à : "+id+" ??")
      if(confirmation)
      this.fournisseurService.deleteFournisseur(id).subscribe(data => {
            console.log(data);
            window.location.reload();
      });
    }
  
  
    detailsFournisseur(fournisseur:Fournisseur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdF', JSON.stringify(fournisseur.idFournisseur));
      this.dialog.open(DetailsFournissseurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateFournisseur(fournisseur:Fournisseur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdF', JSON.stringify(fournisseur.idFournisseur));
      this.dialog.open(UpdateFournisseurComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateFournisseurComponent, dialogConfig);
    }
  
  
  
    filterData($event:any){
      this.dataSource.filter = $event.target.value;
    }
  
  }
