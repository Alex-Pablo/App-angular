import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductoDTP, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import {  catchError } from 'rxjs/operators'
import {  throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;
  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl)
  }

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/ ${id}`)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return  throwError(()=> ('Algo esta fallando en el server'))
          }
          if (error.status === HttpStatusCode.NotFound ){
            return throwError(()=>  ('El producto no existe'));
          }
          if (error.status === HttpStatusCode.Unauthorized ){
            return throwError(()=> ( 'No estas permitido'));
          }
          return throwError ('Ups algo salio mal');
        })
      )
  }


  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`,{params: {limit, offset}})
  }


  create(data: CreateProductoDTP){
    return this.http.post<Product>(this.apiUrl, data)
  }


  update(id:string , dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto)
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/ ${id}`)
  }



}
