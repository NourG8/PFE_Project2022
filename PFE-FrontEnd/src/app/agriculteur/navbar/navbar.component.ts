import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agriculteur } from 'src/app/Models/agriculteur';
import { AuthService } from 'src/app/Service/auth.service';
import { AgriculteurService } from 'src/app/Service/agriculteur.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ethers  } from 'ethers';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { environment } from 'src/environments/environment';

declare let window: any;
declare let require: any;
let Remplissage = require('../../../../build/contracts/RemplissageAgric.json');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin?: boolean ;
  agriculteur?:Agriculteur;
  connected?: boolean ;
  cin?:number;
  tel?:number;
  prenom?:String;
  nom?:String;

   lang!: any;
  location: any;
   web3!:Web3;
  constructor(private translateService :TranslateService,
  public authService: AuthService,
   private agriculteurService:AgriculteurService,
   private router: Router ,
   private dialog: MatDialog,) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   } 
     //this IF to check if ure connected to the meta




     AllOperationsFarmerTab!: Operation[];
     async reloadDataFarmerRetrait01() {
      if (typeof window.ethereum !== 'undefined') {
      try {
        const depKEY = Object.keys(Remplissage.networks)[0];
        
 
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            Remplissage.networks[depKEY].address,
            Remplissage.abi,
            signer
          );
          this.AllOperationsFarmerTab = await contract.getOperations();
          this.connected =true 
          environment.connected=true;
       
      } catch (error) {
        this.connected = false
        environment.connected=false;
      } }
    }


    async requestAccount() {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
 
      } 
      location.reload();
    }




  ngOnInit(): void {   
    this.reloadDataFarmerRetrait01()
    this.authService.loadToken();
    if (this.authService.getToken()==null || 
        this.authService.isTokenExpired()){
          this.dialog.closeAll();
          this.router.navigate(['/login']);
     
        }
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

  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeFournisseur",{skipLocationChange: true}).then( response=> {
     this.router.navigate([decodeURI(this.location.path())]);
   })
 }
 
 
 onClose() {
   this.dialog.closeAll();
   // this.gotoList();
   this.onReload();
 }


 changeLang(){
  if (this.lang=="en") {
    localStorage.setItem("lang","fr");
    location.reload();
  }    
  if (this.lang=="fr") {
    localStorage.setItem("lang","en");
    location.reload();
  }
}




  onLogout(){
    this.authService.logout();
    
  }

}

