import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bon } from 'src/app/Models/bon';
import { BonService } from 'src/app/Service/bon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-bon',
  templateUrl: './create-bon.component.html',
  styleUrls: ['./create-bon.component.css']
})
export class CreateBonComponent implements OnInit {

  bon:Bon = new Bon();
  submitted = false;
  myForm!:FormGroup;

  constructor(private bonService: BonService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.bon = new Bon();
  }

  // save() {
  //   this.bon.idBon = 1;
  //   this.bonService.createBon(this.bon).subscribe(data => {
  //     console.log(data)
  //     window.location.reload()
  //     //this.gotoList();
  //   });
  // }


  save() {
    console.log(this.bon);
    this.bon.idBon = 1;
    this.bonService
        .createBon(this.bon)
        .subscribe(o=>{
          window.location.reload();
          console.log(this.bon);
        });
    }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/bon/listeBon']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'quantite' : new FormControl(null,[Validators.required,]),
      'type' : new FormControl(null,[Validators.required, ]),
      'date' : new FormControl(null,[Validators.required, ]),
      'prix' : new FormControl(null,[Validators.required, ]),
      });
 }

 get quantite(){
  return this.myForm.get('quantite') ;
}

get type(){
  return this.myForm.get('type') ;
}

get date(){
  return this.myForm.get('date') ;
}

get prix(){
  return this.myForm.get('prix') ;
}

}

