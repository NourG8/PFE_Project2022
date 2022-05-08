import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor (public authService: AuthService) {
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
