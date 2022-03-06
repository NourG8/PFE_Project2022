import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Service/produit.service';
import { CreateProduitComponent } from '../create-produit/create-produit.component';
import { DetailsProduitComponent } from '../details-produit/details-produit.component';
import { UpdateProduitComponent } from '../update-produit/update-produit.component';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  ELEMENT_DATA?:Produit[];
  produit?:Produit;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idProduit','intitule', 'libelle','action'];
  constructor(private produitService: ProduitService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
     
    }
  
    reloadData() {
        this.produitService.getProduits().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
     deleteProduit(id: number) {
      this.produitService.getProduit(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le produit où son id est egale à : "+id+" ??")
      if(confirmation)
      this.produitService.deleteProduit(id).subscribe(data => {
            console.log(data);
            window.location.reload();
      });
    }
  
  
    detailsProduit(produit:Produit){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdP', JSON.stringify(produit.idProduit));
      this.dialog.open(DetailsProduitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateProduit(produit:Produit){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdP', JSON.stringify(produit.idProduit));
      this.dialog.open(UpdateProduitComponent, dialogConfig);

      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateProduitComponent, dialogConfig);
    }
  
  
  
    filterData($event:any){
      this.dataSource.filter = $event.target.value;
    }
  
  }
