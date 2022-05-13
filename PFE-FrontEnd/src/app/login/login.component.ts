import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Agriculteur } from '../Models/agriculteur';
import { AuthService } from '../Service/auth.service';
import { AgriculteurService } from '../Service/agriculteur.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user =new Agriculteur();
  err:number=0;

  constructor( 
    private authService: AuthService,
    private agriculteurService:AgriculteurService,
    public router:Router,
    private translateService :TranslateService ) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }



    ngOnInit () {

    }

    onLoggedin()
    {
      this.authService.login(this.user).subscribe((data)=> {
        let jwToken : any   = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);
        this.agriculteurService.getUserWithUsername(this.user.username).subscribe( u=>{
        console.log("haahahahahahahahahhaa");
        console.log(this.user.username);
        console.log(u.idAgriculteur);
        console.log("haahahahahahahahahhaa");
        localStorage.setItem('IdUser', JSON.stringify(u.idAgriculteur));
        });
       
          this.router.navigate(['/agriculteur/dashboard']);

        //this.router.navigate(['/']);
         //this.router.navigate(['/employees/admin/employeesList']);
      },(err)=>{   this.err = 1;
  });

   }




    password = "password"
     myFunction() {
      if (this.password === "password") {
        this.password = "text";
      } else {
        this.password = "password";
      }
    }

  }
