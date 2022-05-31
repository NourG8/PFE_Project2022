import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Vache } from 'src/app/Models/vache';
import { VacheService } from 'src/app/Service/vache.service';
import {Location} from "@angular/common";
import { AuthService } from 'src/app/Service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-vache',
  templateUrl: './create-vache.component.html',
  styleUrls: ['./create-vache.component.css']
})
export class CreateVacheComponent implements OnInit {
  vache:Vache = new Vache();
  submitted = false;
  myForm!:FormGroup;
  msg="";
  msg2=0;
  msg4=0;
  constructor(private vacheService: VacheService,
    private location:Location,    private authService:AuthService,
    private router: Router, private dialogClose: MatDialog,
    private translateService :TranslateService) {
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
    this.vache = new Vache();
  }


  save() {

    
    // if(this.myForm.get('etat')?.value==null){
    //   this.msg="vous devez remplir le formulaire !!";
    //  }
    //  else{
    //   this.msg="";
    //  }

     if(this.myForm.get('poids')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('race')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     
     if(this.myForm.get('dateNaissance')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('matricule')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

    //  if(this.myForm.get('qte_prodLait')?.value==null){
    //   this.msg="vous devez remplir le formulaire !!";
    //  }
    //  else{
    //   this.msg="";
    //  }
    
     this.vacheService.getVacheMatricule(this.myForm.get('matricule')?.value).subscribe(l=>{
      console.log(l);
      if(l==1){
        this.msg2=1;
       }
       else{
        this.msg2=0;
       }


     if( this.myForm.get('matricule')?.value!=null && this.myForm.get('matricule')?.value.length>=8 &&this.myForm.get('race')?.value!=null &&
      // this.myForm.get('etat')?.value!=null && 
       this.myForm.get('cgu')?.value==true &&
       this.myForm.get('poids')?.value!=null && this.myForm.get('dateNaissance')?.value!=null && l==0
      && this.myForm.get('poids')?.value>=30){
    console.log(this.vache);
    this.vache.idVache = 1;
    this.vacheService
        .createVache(this.vache)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Une vache a été ajoutée avec succès"]));   
          // window.location.reload();
          console.log(this.vache);
          this.onClose();
        });
    }
  });
  }


  onSubmit() {
    
    if(this.myForm.get('poids')?.value==null || this.myForm.get('race')?.value==null || 
    this.myForm.get('dateNaissance')?.value==null || this.myForm.get('matricule')?.value==null){
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
    this.router.navigate(['agriculteur/vache/listeVache']);
  }

  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeVache",{skipLocationChange: true}).then( response=> {
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
      'poids' : new FormControl(null,[Validators.required, Validators.min(30)]),
      'race' : new FormControl(null,[Validators.required, ]),
      'dateNaissance' : new FormControl(null,[Validators.required, ]),
      'cgu': new FormControl(false, Validators.requiredTrue),
      // 'etat' : new FormControl(null,[Validators.required, ]),
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

