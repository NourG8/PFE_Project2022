import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/Models/fournisseur';
import { FournisseurService } from 'src/app/Service/fournisseur.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css'],
})
export class UpdateFournisseurComponent implements OnInit {
  fournisseur: Fournisseur = new Fournisseur();
  myForm!: FormGroup;
  CheckesCompetance: boolean = false;

  constructor(
    private router: Router,
    private dialogClose: MatDialog,
    private location: Location,
    private fournisseurService: FournisseurService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }

    this.ValidatedForm();
    this.fournisseurService
      .getFournisseur(JSON.parse(localStorage.getItem('IdF') || '[]') || [])
      .subscribe((o) => {
        this.fournisseur = o;
        console.log(this.fournisseur);
      });
  }

  updateFournisseur() {
    if (
      this.myForm.get('nom')?.value.length >= 3 &&
      this.myForm.get('prenom')?.value.length >= 3 &&
      this.myForm.get('matricule')?.value.length >= 8
    ) {
      this.fournisseurService
        .updateFournisseur(this.fournisseur.idFournisseur, this.fournisseur)
        .subscribe(
          (o) => {
            localStorage.setItem(
              'Toast',
              JSON.stringify([
                'Success',
                'Un fournisseur a été modifié avec succès ',
              ])
            );
            console.log(this.fournisseur);
            this.onClose();
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  ValidatedForm() {
    this.myForm = new FormGroup({
      nom: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('.*\\S.*[a-zA-z0-9 ]'),
      ]),
      prenom: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('.*\\S.*[a-zA-z0-9 ]'),
      ]),
      matricule: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get nom() {
    return this.myForm.get('nom');
  }

  get matricule() {
    return this.myForm.get('matricule');
  }

  get prenom() {
    return this.myForm.get('prenom');
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
    this.dialogClose.closeAll();
    this.onReload();
  }
}
