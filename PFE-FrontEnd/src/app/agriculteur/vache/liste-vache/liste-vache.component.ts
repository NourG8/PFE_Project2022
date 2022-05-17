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
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
  displayedColumns: string[] = ['idVache','matricule','poids','race', 'dateNaissance','action'];
  constructor(private translateService :TranslateService ,private vacheService: VacheService,
    private location:Location,    private authService:AuthService,
    private router: Router, private dialog:MatDialog) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }


    ngOnInit() {

      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.router.navigate(['/login']);
  
          }

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
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
  
          }
      let confirmation =confirm("Êtes-vous sûr de supprimer le produit où son id est egale à : "+id+" ??")
      if(confirmation)
      this.vacheService.deleteVache(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Vache a été supprimée avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
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
  
  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeVache",{skipLocationChange: true}).then( response=> {
     this.router.navigate([decodeURI(this.location.path())]);
   })
   }


  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }
  
    detailsVache(vache:Vache){
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
  
          }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdVache', JSON.stringify(vache.idVache));
      this.dialog.open(DetailsVacheComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateVache(vache:Vache){
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
  
          }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdVache', JSON.stringify(vache.idVache));
      this.dialog.open(UpdateVacheComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  


    maladeVache(vache : Vache) {
      let confirmation =confirm("Êtes-vous sûr de modifier les coordonnés de la vache où son id est egale à : "+vache.idVache+" ??")
      if(confirmation)
      this.vacheService.maladeVache(vache).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Vache a été modifiée avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la modification de la vache !!';
        this.showToast();
      }
    );
  }


  bonneVache(vache : Vache) {
    let confirmation =confirm("Êtes-vous sûr de modifier les coordonnés de la vache où son id est egale à : "+vache.idVache+" ??")
    if(confirmation)
    this.vacheService.bonneVache(vache).subscribe(()=>{
      this.Toast[0] = 'Success';
      this.Toast[1] ='Vache a été modifiée avec succès';
      localStorage.setItem('Toast', JSON.stringify(this.Toast));
      // window.location.reload();
      this.onClose();
    },
    (error) => {
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.Toast[0] = 'Failed';
      this.Toast[1] ='Échec de la modification de la vache !!';
      this.showToast();
    }
  );
}

    onOpenDialogCreate():void{
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
  
          }
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


