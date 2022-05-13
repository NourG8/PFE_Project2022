import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AuthService } from 'src/app/Service/auth.service';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin?: boolean ;
  agriculteur?:Agriculteur;

  cin?:number;
  tel?:number;
  prenom?:String;
  nom?:String;

   lang!: any;
  location: any;

  constructor(private translateService :TranslateService,
  public authService: AuthService,
   private agriculteurService:AgriculteurService,
   private router: Router ,
   private dialog: MatDialog,) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   } 

  ngOnInit(): void {

this.lang = localStorage.getItem('lang') || 'en';

  this.agriculteurService.getagriculteur(JSON.parse(localStorage.getItem('IdUser') || '[]') || []).subscribe(o=>{
    this.cin = o.cin;
    this.tel = o.tel;
    this.nom = o.nom;
    this.prenom = o.prenom;
    console.log("#################################################");
    console.log(o);
    console.log(o.idAgriculteur);
    console.log("#################################################");
  });
  }
changeLang(lang: any){
  localStorage.setItem("lang",lang);
  
  window.location.reload();
console.log(lang);
}



  onLogout(){
    this.authService.logout();
    
  }

}

