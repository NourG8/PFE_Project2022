import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';

@Component({
  selector: 'app-datails-bon',
  templateUrl: './datails-bon.component.html',
  styleUrls: ['./datails-bon.component.css']
})
export class DatailsBonComponent implements OnInit {

  id!: number;
  idB!: any;
  bon?:Bon = new Bon();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,private router: Router,
    private bonService: BonService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.bonService.getBon(JSON.parse(localStorage.getItem('IdBon') || '[]') || []).subscribe(o =>{
      this.bon = o;
      this.idB=this.bon?.idBon;
      //console.log(typeof this.OneOffer);
      console.log(this.bon);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}
