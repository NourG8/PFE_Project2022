import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Service/tank.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-tank',
  templateUrl: './create-tank.component.html',
  styleUrls: ['./create-tank.component.css']
})
export class CreateTankComponent implements OnInit {

  tank:Tank = new Tank();
  submitted = false;
  myForm!:FormGroup;
  msg="";
  msg1=0;
  msg4=0;

  constructor(private tankService: TankService,private translateService :TranslateService,
    private location:Location,    private authService:AuthService,
    private router: Router, private dialogClose: MatDialog,) {
      
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }

  ngOnInit() {

    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);

        }

    this.ValidatedForm();
  
  }

  newEmployee(): void {
    this.submitted = false;
    this.tank = new Tank();

  }


  save() {
    
    if(this.myForm.get('matricule')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('poidVide')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     this.tankService.getTankUtilise(this.myForm.get('matricule')?.value).subscribe(t=>{
      console.log(t);
      if(t==1){
        this.msg1=1;
       }
       else{
        this.msg1=0;
       }

     if(this.myForm.get('matricule')?.value!=null && this.myForm.get('poidVide')?.value!=null &&  this.myForm.get('cgu')?.value==true
     && t==0 && this.myForm.get('poidVide')?.value>=30 && this.myForm.get('matricule')?.value.length>=8){
    this.tankService
        .createTank(this.tank)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Un tank a été ajouté avec succès"]));  
          // window.location.reload();
          console.log(this.tank);
          this.onClose();
        }); 
    }
  });
  }

  onSubmit() {
    if(this.myForm.get('matricule')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('poidVide')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('cgu')?.value==true){
      this.msg4=0;
    }
    else{
      this.msg4=1;
    }

    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/tank/listeTank']);
  }

  onReload(){
      // this.router.navigate([this.router.url]);
      this.router.navigateByUrl("/'agriculteur/bon/listeTank",{skipLocationChange: true}).then( response=> {
        this.router.navigate([decodeURI(this.location.path())]);
      })
  }


  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'matricule' : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'poidVide' : new FormControl(null,[Validators.required,Validators.min(30)]),
      'cgu': new FormControl(false, Validators.requiredTrue),
      });
 }

 get poidVide(){
  return this.myForm.get('poidVide') ;
}

get poidActuel(){
  return this.myForm.get('poidActuel') ;
}

get etat(){
  return this.myForm.get('etat') ;
}

get matricule(){
  return this.myForm.get('matricule') ;
}


}

