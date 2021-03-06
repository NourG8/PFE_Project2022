import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Collecteur } from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import { CreateCollecteurComponent } from '../create-collecteur/create-collecteur.component';
import { DetailsCollecteurComponent } from '../details-collecteur/details-collecteur.component';
import { UpdateCollecteurComponent } from '../update-collecteur/update-collecteur.component';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-collecteur',
  templateUrl: './liste-collecteur.component.html',
  styleUrls: ['./liste-collecteur.component.css'],
})
export class ListeCollecteurComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;

  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  lang = '';

  ELEMENT_DATA?: Collecteur[];
  Collecteur?: Collecteur;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idCollecteur',
    'nomCollecteur',
    'matricule',
    'adresse',
    'tel',
    'action',
  ];
  constructor(
    private translateService: TranslateService,
    private collcteurService: CollecteurService,
    private location: Location,
    private authService: AuthService,
    private router: Router,
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
    this.collcteurService.getCollecteurs().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteCollecteur(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    }
    let confirmation = confirm(
      '??tes-vous s??r de supprimer le collecteur o?? son id est ??gale ?? : ' +
        id +
        ' ??'
    );
    if (confirmation)
      this.collcteurService.deleteCollecteur(id).subscribe(
        () => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Un collecteur a ??t?? supprim?? avec succ??s';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = '??chec de la suppression du collecteur !!';
          this.showToast();
        }
      );
  }

  detailsCollecteur(collecteur: Collecteur) {
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
    localStorage.setItem('IdC', JSON.stringify(collecteur.idCollecteur));
    this.dialog.open(DetailsCollecteurComponent, dialogConfig);
  }

  updateCollecteur(collecteur: Collecteur) {
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
    localStorage.setItem('IdC', JSON.stringify(collecteur.idCollecteur));
    this.dialog.open(UpdateCollecteurComponent, dialogConfig);
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
    this.dialog.open(CreateCollecteurComponent, dialogConfig);
  }

  onReload() {
    this.router
      .navigateByUrl("/'agriculteur/bon/listeCollecteur", {
        skipLocationChange: true,
      })
      .then((response) => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onClose() {
    this.dialog.closeAll();
    this.onReload();
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
