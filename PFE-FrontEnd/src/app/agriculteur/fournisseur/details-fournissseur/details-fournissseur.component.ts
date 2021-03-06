import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-fournissseur',
  templateUrl: './details-fournissseur.component.html',
  styleUrls: ['./details-fournissseur.component.css'],
})
export class DetailsFournissseurComponent implements OnInit {
  id!: number;
  idF!: any;
  fournisseur?: Fournisseur = new Fournisseur();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fournisseurService: FournisseurService,
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

    this.id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.paramMap.get('id'));

    this.fournisseurService
      .getFournisseur(JSON.parse(localStorage.getItem('IdF') || '[]') || [])
      .subscribe((o) => {
        this.fournisseur = o;
        this.idF = this.fournisseur?.idFournisseur;
        console.log(this.fournisseur);
      });
  }

  closeDetails() {
    this.dialogClose.closeAll();
  }
}
