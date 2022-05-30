import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './Service/auth.service';
import {trigger,transition,group,style,query,animate} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'FrontEndAngular';
  isLoggedin?: boolean ;
  mySubscription: any;

  constructor(public authService: AuthService,private translateService :TranslateService){
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

onLogout(){
  this.authService.logout();
}
}
