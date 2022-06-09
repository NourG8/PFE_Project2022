import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { CreateFournisseurComponent } from '../create-fournisseur/create-fournisseur.component';
import { DetailsFournissseurComponent } from '../details-fournissseur/details-fournissseur.component';
import { UpdateFournisseurComponent } from '../update-fournisseur/update-fournisseur.component';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-fournisseur',
  templateUrl: './liste-fournisseur.component.html',
  styleUrls: ['./liste-fournisseur.component.css'],
})
export class ListeFournisseurComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;

  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  bookListUrl!: any;

  ELEMENT_DATA?: Fournisseur[];
  fournisseur?: Fournisseur;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idFournisseur',
    'nom',
    'prenom',
    'matricule',
    'action',
  ];
  constructor(
    private fournisseurService: FournisseurService,
    private location: Location,
    private route: ActivatedRoute,
    private _httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService
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

    this.idContenu = 'TostSuccessContenu';
    this.idTitle = 'TostSuccessTile';

    this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
    if (this.Toast[0] == 'Success') {
      console.log('Toast est n est pas vide');
      this.showToast();
    } else {
      console.log('Toast Vide');
    }
    console.log('==================>');
    console.log(this.router.navigate([decodeURI(this.location.path())]));
    console.log(this.route.snapshot.params);
    console.log(this.route.snapshot.paramMap.get('id'));
    console.log(this._httpClient.get(this.bookListUrl));
  }

  reloadData() {
    this.fournisseurService.getFournisseurs().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteFournisseur(id: number) {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.onClose();
      this.router.navigate(['/login']);
      this.onClose();
    } else {
      let confirmation = confirm(
        'Êtes-vous sûr de supprimer le fournisseur où son id est égale à : ' +
          id +
          ' ??'
      );
      if (confirmation)
        this.fournisseurService.deleteFournisseur(id).subscribe(
          () => {
            this.Toast[0] = 'Success';
            this.Toast[1] = 'Un fournisseur a été supprimé avec succès';
            localStorage.setItem('Toast', JSON.stringify(this.Toast));
            this.onClose();
          },
          (error) => {
            this.idContenu = 'TostDangerContenu';
            this.idTitle = 'TostDangerTile';
            this.Toast[0] = 'Failed';
            this.Toast[1] = 'Échec de la suppression du fournisseur !!';
            this.showToast();
          }
        );
    }
  }

  detailsFournisseur(fournisseur: Fournisseur) {
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
    localStorage.setItem('IdF', JSON.stringify(fournisseur.idFournisseur));
    this.dialog.open(DetailsFournissseurComponent, dialogConfig);
  }

  updateFournisseur(fournisseur: Fournisseur) {
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
    localStorage.setItem('IdF', JSON.stringify(fournisseur.idFournisseur));
    this.dialog.open(UpdateFournisseurComponent, dialogConfig);
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
    this.dialog.open(CreateFournisseurComponent, dialogConfig);
  }

  onReload() {
    this.router
      .navigateByUrl("/'agriculteur/bon/listeFournisseur", {
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
