import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-agriculteur',
  templateUrl: './agriculteur.component.html',
  styleUrls: ['./agriculteur.component.css']
})
export class AgriculteurComponent implements OnInit {

  mySubscription: any;

  constructor(private translateService :TranslateService){
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //      // Trick the Router into believing it's last link wasn't previously loaded
    //      this.router.navigated = false;
    //   }
    // }); 
     this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
 }

ngOnInit () {
  // this.authService.loadToken();
  // if (this.authService.getToken()==null ||
  //     this.authService.isTokenExpired()){
  //       this.router.navigate(['/login']);

  //     }
}

// ngOnDestroy(){
//   if (this.mySubscription) {
//     this.mySubscription.unsubscribe();
//   }
// }

}
