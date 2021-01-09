import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Files } from '../interfaces/files';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<Files> {
    return this.http.get<Files>("http://filesapi.somee.com/api/v1/products/product");
  }

  getFileId(id: string) {
    return this.http.get<Files>("http://filesapi.somee.com/api/v1/products/" + id);
  }

  deleteFile(id: string) {
    return this.http.delete("http://filesapi.somee.com/api/v1/products/" + id);
  }

  updateFile(id: string, title: string, price: number, quantity: number, size: string, description: string) {
    return this.http.put("http://filesapi.somee.com/api/v1/products/" + id, { title, price, quantity, size, description });
  }

}
