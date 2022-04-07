import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Vache } from 'src/app/Models/vache';
import { VacheService } from 'src/app/Service/vache.service';

@Component({
  selector: 'app-details-vache',
  templateUrl: './details-vache.component.html',
  styleUrls: ['./details-vache.component.css']
})
export class DetailsVacheComponent implements OnInit {

  id!: number;
  idV!: any;
  vache?:Vache = new Vache();

  constructor(
    private dialogClose: MatDialog,
    private route: ActivatedRoute,private router: Router,
    private vacheService: VacheService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.vacheService.getVache(JSON.parse(localStorage.getItem('IdVache') || '[]') || []).subscribe(o =>{
      this.vache = o;
      this.idV=this.vache?.idVache;
      console.log(this.vache);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}