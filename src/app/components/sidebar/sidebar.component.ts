import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  onExit(): void{
    this.authService.logout();
    this.utilsService.openSidebar(false);
  }

}
