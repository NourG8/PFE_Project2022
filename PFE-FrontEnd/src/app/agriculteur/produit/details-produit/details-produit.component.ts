import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Service/produit.service';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css'],
})
export class DetailsProduitComponent implements OnInit {
  id!: number;
  idP!: any;
  produit?: Produit = new Produit();

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
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

    this.produitService
      .getProduit(JSON.parse(localStorage.getItem('IdP') || '[]') || [])
      .subscribe((o) => {
        this.produit = o;
        this.idP = this.produit?.idProduit;
        console.log(this.produit);
      });
  }
  closeDetails() {
    this.dialogClose.closeAll();
  }
}
