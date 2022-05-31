import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Service/tank.service';
import { CreateTankComponent } from '../create-tank/create-tank.component';
import { DetailsTankComponent } from '../details-tank/details-tank.component';
import { UpdateTankComponent } from '../update-tank/update-tank.component';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-tank',
  templateUrl: './liste-tank.component.html',
  styleUrls: ['./liste-tank.component.css']
})
export class ListeTankComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';


  ELEMENT_DATA?:Tank[];
  Tank?:Tank;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idTank','matricule','poidVide', 'poidActuel','etat','action'];
  constructor(private tankService: TankService,
    private location:Location,    private authService:AuthService,
    private router: Router, private dialog:MatDialog,private translateService :TranslateService) { 
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
        this.tankService.getTanks().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.Tank=o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);
        for(let i=0;i<o.length;i++ ){
          console.log(o[i]);
          this.Tank=o[i];
        }
      });

      console.log(this.Tank)
      
      
    }
  

    deleteTank(id: number) {
      this.authService.loadToken();
      if (this.authService.getToken()==null ||
          this.authService.isTokenExpired()){
            this.onClose();
            this.router.navigate(['/login']);
            this.onClose();
  
          }
      let confirmation =confirm("Êtes-vous sûr de supprimer le tank où son id est égale à : "+id+" ??")
      if(confirmation)
      this.tankService.deleteTank(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Un tank a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du tank: '+id+' !! Ce tank est remplis vous ne pouvez pas le supprimer';
        this.showToast();
      }
    );
  }
  


  onReload(){
        // this.router.navigate([this.router.url]);
        this.router.navigateByUrl("/'agriculteur/bon/listeTank",{skipLocationChange: true}).then( response=> {
          this.router.navigate([decodeURI(this.location.path())]);
        })
  }


  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }
  
    detailsTank(Tank:Tank){
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
      localStorage.setItem('IdT', JSON.stringify(Tank.idTank));
      this.dialog.open(DetailsTankComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateTank(Tank:Tank){
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
      localStorage.setItem('IdT', JSON.stringify(Tank.idTank));
      this.dialog.open(UpdateTankComponent, dialogConfig);

      //this.router.navigate(['employees/admin/updateemployee', id]);
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
      this.dialog.open(CreateTankComponent, dialogConfig);
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
