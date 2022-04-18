import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor (public authService: AuthService,
    private router: Router) {
    }


  ngOnInit(): void {

  }

//   routeIsActive(routePath: string) {
//     return this.router.url == routePath;
// }

getClass() {
  return "active"
}

}
