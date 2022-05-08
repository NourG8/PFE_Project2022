import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AuthService } from 'src/app/Service/auth.service';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { MatDialog } from '@angular/material/dialog';



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


  constructor(
  public authService: AuthService,
   private agriculteurService:AgriculteurService,
  //  private router: Router ,
   private dialog: MatDialog,) {} 

  ngOnInit(): void {

    // this.authService.loadToken();
    // if (this.authService.getToken()==null || 
    //     this.authService.isTokenExpired()){
    //       this.dialog.closeAll();
    //       this.router.navigate(['/login']);
    //       this.dialog.closeAll();
     
    //     }

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

  onLogout(){
    this.authService.logout();
    
  }

}

