import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bon',
  templateUrl: './bon.component.html',
  styleUrls: ['./bon.component.css']
})
export class BonComponent implements OnInit {

  constructor(private translateService :TranslateService) {  this.translateService.setDefaultLang('en');
  this.translateService.use(localStorage.getItem('lang') || 'en') }

  ngOnInit(): void {
  }

}
