import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormProduct } from 'src/app/shared/utils/base-form-product';
enum Action{
  Edit = 'edit',
  New = 'new'
};

@Component({
  selector: 'app-products',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  action = Action.New;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  public productForm: BaseFormProduct) { }

  ngOnInit(): void {
    if(this.data?.product.hasOwnProperty("id")){
      this.action = Action.Edit;
      this.data.title = 'Edit product'
      this.pathFormData();
    }else{

    }
  }

  private pathFormData(): void{
    this.productForm.baseForm.patchValue({
      title: this.data?.product?.title,
      description: this.data?.product?.description,
      size: this.data?.product?.size,
      quantity: this.data.product.quantity,
      price: this.data.product.price
    })
  }

  checkField(field: string): boolean{
    return this.productForm.isValidField(field);
   }

}
