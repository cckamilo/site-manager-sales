
import { ViewChild, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductComponent } from '../components/modals/products/modal-product.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['category', 'title', 'quantity', 'price', 'size', 'actions'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    });
  }

  onOpenModal(product ={}): void{
    const modal = this.dialog.open(ModalProductComponent, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'new user', product }
    })

    modal.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }


}
