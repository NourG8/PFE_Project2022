import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  constructor(private translateService :TranslateService) {     
    this.translateService.setDefaultLang('en');
  this.translateService.use(localStorage.getItem('lang') || 'en') }

  ngOnInit(): void {
  }

}
