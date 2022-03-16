import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vache } from 'src/app/Models/vache';
import { VacheService } from 'src/app/Service/vache.service';

@Component({
  selector: 'app-create-vache',
  templateUrl: './create-vache.component.html',
  styleUrls: ['./create-vache.component.css']
})
export class CreateVacheComponent implements OnInit {
  vache:Vache = new Vache();
  submitted = false;
  myForm!:FormGroup;

  constructor(private vacheService: VacheService,
    private router: Router, private dialogClose: MatDialog,) { }
    

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.vache = new Vache();
  }


  save() {
    console.log(this.vache);
    this.vache.idVache = 1;
    this.vacheService
        .createVache(this.vache)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Une vache a été ajouté avec succès"]));   
          window.location.reload();
          console.log(this.vache);
        });
    }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/vache/listeVache']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'matricule' : new FormControl(null,[Validators.required,]),
      'poids' : new FormControl(null,[Validators.required,]),
      'race' : new FormControl(null,[Validators.required, ]),
      'dateNaissance' : new FormControl(null,[Validators.required, ]),
      'etat' : new FormControl(null,[Validators.required, ]),
      'qte_prodLait' : new FormControl(null,[Validators.required, ]),
      });
 }

 get poids(){
  return this.myForm.get('poids') ;
}

get race(){
  return this.myForm.get('race') ;
}

get dateNaissance(){
  return this.myForm.get('dateNaissance') ;
}

get etat(){
  return this.myForm.get('etat') ;
}

get qte_prodLait(){
  return this.myForm.get('qte_prodLait') ;
}
get matricule(){
  return this.myForm.get('matricule') ;
}

}

