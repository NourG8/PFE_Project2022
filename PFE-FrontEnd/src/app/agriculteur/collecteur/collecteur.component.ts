import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-collecteur',
  templateUrl: './collecteur.component.html',
  styleUrls: ['./collecteur.component.css']
})
export class CollecteurComponent implements OnInit {

  constructor(private translateService :TranslateService) {    this.translateService.setDefaultLang('en');
  this.translateService.use(localStorage.getItem('lang') || 'en')}

  ngOnInit(): void {
  }

}
