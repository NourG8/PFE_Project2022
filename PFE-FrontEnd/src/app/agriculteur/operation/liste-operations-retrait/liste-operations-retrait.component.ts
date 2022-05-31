import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Service/operation.service';
import { ProduitService } from 'src/app/Service/produit.service';
import { TankService } from 'src/app/Service/tank.service';
import { CreateOperationRemplissageComponent } from '../create-operation-remplissage/create-operation-remplissage.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationRetraitComponent } from '../update-operation-retrait/update-operation-retrait.component';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

declare let require: any;

@Component({
  selector: 'app-liste-operations-retrait',
  templateUrl: './liste-operations-retrait.component.html',
  styleUrls: ['./liste-operations-retrait.component.css'],
})
export class ListeOperationsRetraitComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;

  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  connected !: string;
  ELEMENT_DATA?: Operation[];
  operation?: Operation;
  dataSource!: MatTableDataSource<any>;
  v = 0;

  // tank?:Tank = new Tank();
  p = 0;
  q = 0;
  msg = '';
  test1 = 0;
  test2 = 0;
  waiting = environment.wating;

  displayedColumns: string[] = [
    'idOperation',
    'poidsLait',
    'code',
    'collecteur',
    'dateOperation',
    'action',
  ];
  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private produitService: ProduitService,
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  operations: Observable<Operation[]> | undefined;

  ngOnInit() {

    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.reloadData();

    //console.log(this.tankService.getTanksQteLibre());

    this.idContenu = 'TostSuccessContenu';
    this.idTitle = 'TostSuccessTile';

    this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
    if (this.Toast[0] == 'Success') {
      console.log('Toast est n est pas vide');
      this.showToast();
    } else if (this.Toast[0] == 'Failed') {
      console.log('Toast est n est pas vide');
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.showToast();
    }
    else{
      console.log('Toast Vide');
    }
  }

  reloadData() {
    this.operationService.getOperationsRetraits().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteOperation(id: number) {
    this.operationService.getOperation(id).subscribe((o) => {
      this.ELEMENT_DATA = o;
    });
    console.log(this.ELEMENT_DATA);
    //console.log(this.id);
    let confirmation = confirm(
      'Êtes-vous sûr de supprimer l\'opération où son id est égale à : ' +
        id +
        ' ??'
    );
    if (confirmation)
      this.operationService.deleteOperation(id).subscribe(
        (data) => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Une opération a été supprimée avec succès';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = 'Échec de la suppression !!';
          this.showToast();
        }
      );
  }

  deleteOp(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }

    this.tankService.getTanksQteLibre().subscribe((o) => {
      console.log(o);
      this.q = o;
      this.operationService.getOperation(id).subscribe((a) => {
        console.log(a.poidsLait);
        this.p = a.poidsLait;

        if (this.p <= this.q) {
          this.deleteOperation(id);
          this.onClose();
        } else {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] =
            'Vous ne pouvez pas supprimer cette opération, car la quantité restante est inferieur aàla quantité que vous voudrez la supprimer !!';
          this.showToast();
        }
      });
    });
  }

  onReload() {
    // this.router.navigate([this.router.url]);
    this.router
      .navigateByUrl("/'agriculteur/operation/listeOperation", {
        skipLocationChange: true,
      })
      .then((response) => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }
  detailsOperation(operation: Operation) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(DetailsOperationComponent, dialogConfig);
    //this.router.navigate(['employees/admin/detailemployee', id]);
  }

  updateOperationR(operation: Operation) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(UpdateOperationRetraitComponent, dialogConfig);
    //this.router.navigate(['employees/admin/updateemployee', id]);
  }

  onOpenDialogCreate(): void {
    this.connected = JSON.parse(localStorage.getItem('state') || '[]') || []
    console.log(this.connected)
    // this.authService.loadToken();
    // if (
    //   this.authService.getToken() == null ||
    //   this.authService.isTokenExpired()
    // ) {
    //   this.onClose();
    //   this.router.navigate(['/login']);
    //   this.onClose();
    // }
    this.tankService.getTanksQteGenerale().subscribe((b) => {
      console.log(b);
      if (b > 0 && this.connected == "connected") {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateOperationComponent, dialogConfig);
      } else if(b<=0){
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] =
          'Les tanks sont vides !! \n Vous ne pouvez pas effectué cette opération !!';
        this.showToast();
      }else if(this.connected == "notconnected"){
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] =
          'Vous n\'êtes pas connecté !! \n vous devez d\'abord vous connecter à metamask !!';
        this.showToast();
      }
    });
  }

  onOpenDialogCreate2(): void {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateOperationRemplissageComponent, dialogConfig);
  }

  filterData($event: any) {
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
    }, 9100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      console.log(this.counter);
      if (this.counter === 9) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}
