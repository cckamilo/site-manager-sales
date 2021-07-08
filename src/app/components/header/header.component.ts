import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = null;
  isLogged = false;

  //propiedad privada para desuscribir 
  private destroy$ = new Subject<any>();

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private utilService: UtilsService) { }


  ngOnInit(): void {
    this.authService.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: UserResponse) => {
      console.log(res);
      if(res != null){
        this.isLogged = true;
        this.isAdmin = res?.role;
      }else{
        this.isLogged = false;
        this.isAdmin = null
      }
      // console.log('isLogged', this.isLogged)
      // console.log('isAdmin', this.isAdmin)

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onToggleSidenav(): void{
    this.toggleSidenav.emit();
  }

  onLogout(): void{

      // this.isAdmin = null;
      // this.isLogged = false;
      this.utilService.openSidebar(false);
      this.authService.logout();


  }

}
