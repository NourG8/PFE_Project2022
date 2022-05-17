import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vache',
  templateUrl: './vache.component.html',
  styleUrls: ['./vache.component.css']
})
export class VacheComponent implements OnInit {

  constructor(private translateService :TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   }

  ngOnInit(): void {
  }

}
