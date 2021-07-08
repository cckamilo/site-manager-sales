import { AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modals/users/modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService,
    private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.userService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.dataSource.data = users;
      });
  }

  onOpenModal(user = {}): void {

    const modal = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'new user', user }
    })

    modal.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;

  }

  onDelete(id: string): void {
    if (window.confirm('Do you really want remove this user')) {
      this.userService.delete(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res);
          this.ngOnInit();
        })
       
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
