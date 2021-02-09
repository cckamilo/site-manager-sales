import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'site manager';
  opened = false;
  private destroid$ = new Subject<any>();

  constructor(private utilsService: UtilsService) { }


  ngOnInit(): void {

    this.utilsService.sidebarOpened$
      .pipe(takeUntil(this.destroid$))
      .subscribe(
        (res: boolean) => (this.opened = res)
      );

  }

  ngOnDestroy(): void {

    this.destroid$.next({});
    this.destroid$.complete();

  }



}
