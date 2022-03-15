import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Agriculteur } from '../Models/agriculteur';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user =new Agriculteur();
  err:number=0;

    constructor(private authService: AuthService, public router:Router ) { }



    ngOnInit () {

    }

    onLoggedin()
    {
      this.authService.login(this.user).subscribe((data)=> {
        let jwToken : any   = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);

          this.router.navigate(['/agriculteur/dashboard']);

        //this.router.navigate(['/']);
         //this.router.navigate(['/employees/admin/employeesList']);
      },(err)=>{   this.err = 1;
  });

   }




    mdp = "password"
     myFunction() {
      if (this.mdp === "password") {
        this.mdp = "text";
      } else {
        this.mdp = "password";
      }
    }

  }
