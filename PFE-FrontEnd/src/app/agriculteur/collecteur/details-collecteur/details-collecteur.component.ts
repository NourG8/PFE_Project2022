import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {Collecteur} from 'src/app/Models/collecteur';
import { CollecteurService } from 'src/app/Service/collecteur.service';

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
    private dialogClose: MatDialog,
    private route: ActivatedRoute,private router: Router,
    private collecteurService: CollecteurService) { }

  ngOnInit() {
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
