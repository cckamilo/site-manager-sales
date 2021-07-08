import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductResponse } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {

  }


  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${environment.API_URL}/api/v1/products`)
      .pipe(catchError(this.handlerError))
  }

  getById(id: string): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${environment.API_URL}/api/v1/products/${id}`)
    .pipe(catchError(this.handlerError))

  }

  update(idProduct: string, product: ProductResponse): Observable<ProductResponse>{
    return this.http.put<ProductResponse>(`${environment.API_URL}/api/v1/products/${idProduct}`, product)
    .pipe(catchError(this.handlerError))
  }

  handlerError(error): Observable<never> {
    let errorMessage = "Error unknown";
    if (error) {
      errorMessage = `Error ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
