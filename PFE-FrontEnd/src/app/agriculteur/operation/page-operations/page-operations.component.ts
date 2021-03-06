import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationTank } from 'src/app/Models/operationTank';
import { OperationService } from 'src/app/Service/operation.service';
import { TankService } from 'src/app/Service/tank.service';
import { CreateOperationRemplissageComponent } from '../create-operation-remplissage/create-operation-remplissage.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationTankComponent } from '../details-operation-tank/details-operation-tank.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-operations',
  templateUrl: './page-operations.component.html',
  styleUrls: ['./page-operations.component.css'],
})
export class PageOperationsComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;

  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?: Operation[];
  operation?: Operation;
  dataSource!: MatTableDataSource<any>;
  v = 0;
  displayedColumns: string[] = [
    'idOpTank',
    'operation',
    'matricule',
    'qteInsereTank',
    'date',
    'action',
  ];
  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.reloadData();
    console.log(this.tankService.getTanksQteLibre());

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
    this.operationService.getOperationsTanks().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  detailsOperationTank(operation: OperationTank) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperationTank', JSON.stringify(operation.idOpTank));
    this.dialog.open(DetailsOperationTankComponent, dialogConfig);
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
    }, 6100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      console.log(this.counter);
      if (this.counter === 6) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}
