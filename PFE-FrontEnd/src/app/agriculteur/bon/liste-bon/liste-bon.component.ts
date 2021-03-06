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
import { DatailsBonComponent } from '../datails-bon/datails-bon.component';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-liste-bon',
  templateUrl: './liste-bon.component.html',
  styleUrls: ['./liste-bon.component.css'],
})
export class ListeBonComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  lang = '';
  ELEMENT_DATA?: Bon[];
  bon?: Bon;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idBon',
    'quantite',
    'prix',
    'produit',
    'date',
    'action',
  ];
  constructor(
    private translateService: TranslateService,
    private bonService: BonService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    console.log(localStorage.getItem('lang') || 'en');
    this.lang = localStorage.getItem('lang') || 'en';
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
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
    this.bonService.getbons().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteBon(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    this.bonService.getBon(id).subscribe((b) => {
      console.log(b.produit);
      console.log(b);
      console.log(b.produit.idProduit);

      if (b.quantite <= b.produit.qte) {
        let confirmation = confirm(
          "??tes-vous s??r de supprimer le bon d'entr??e o?? son id est ??gale ?? : " +
            id +
            ' ??'
        );
        if (confirmation)
          this.bonService.deleteBon(id).subscribe(
            () => {
              this.Toast[0] = 'Success';
              this.Toast[1] = 'Un bon a ??t?? supprim?? avec succ??s';
              localStorage.setItem('Toast', JSON.stringify(this.Toast));
              this.onClose();
            },

            (error) => {
              this.idContenu = 'TostDangerContenu';
              this.idTitle = 'TostDangerTile';
              this.Toast[0] = 'Failed';
              this.Toast[1] = '??chec de la suppression du bon !!';
              this.showToast();
            }
          );
      } else {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] =
          'Vous avez deja utiliser la quantit?? du produit affect?? a cette op??ration !!';
        this.showToast();
      }
    });
  }

  onReload() {
    this.router
      .navigateByUrl("/'agriculteur/bon/listeBon", { skipLocationChange: true })
      .then((response) => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onClose() {
    this.dialog.closeAll();
    this.onReload();
  }

  detailsBon(bon: Bon) {
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
    localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
    this.dialog.open(DatailsBonComponent, dialogConfig);
  }

  updateBon(bon: Bon) {
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
    localStorage.setItem('IdBon', JSON.stringify(bon.idBon));
    this.dialog.open(UpdateBonComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
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
    this.dialog.open(CreateBonComponent, dialogConfig);
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
