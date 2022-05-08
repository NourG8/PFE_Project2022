import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {Collecteur} from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-details-collecteur',
  templateUrl: './details-collecteur.component.html',
  styleUrls: ['./details-collecteur.component.css']
})
export class DetailsCollecteurComponent implements OnInit {

  id!: number;
  idC!: any;
  collecteur?:Collecteur = new Collecteur();

  constructor(
    private dialogClose: MatDialog,    private authService:AuthService,
    private route: ActivatedRoute,private router: Router,
    private collecteurService: CollecteurService) { }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }

    this.id = this.route.snapshot.params['id'];
  
    this.collecteurService.getCollecteur(JSON.parse(localStorage.getItem('IdC') || '[]') || []).subscribe(o =>{
      this.collecteur = o;
      this.idC=this.collecteur?.idCollecteur;
      console.log(this.collecteur);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}
