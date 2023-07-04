import { Component, OnInit } from '@angular/core';
import { CreateProductoDTP, Product, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service'
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from  'rxjs/operators'
import { zip } from  'rxjs'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = []
  total = 0;
  products: Product[] = [];
  showProductDetail:boolean = false;
  productChosen!: Product;
  limit = 10;
  offset = 0

  constructor (
    private storeService: StoreService,
    private productsService:  ProductsService
  ) {
  }

  ngOnInit(): void {
    this.loadMore()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onshowProduct(id: string){
    this.productsService.getProduct(id)
    .subscribe({
      next: (resp)=> this.showDeatilOk(resp),
      error: (e) => this.showDetailError(e),
      complete: () => console.info('complete')
    })
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
     .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'alex titulo'}))
     )
     .subscribe(data => {
      console.log(data);

     })
  }



  showDeatilOk(resp:Product){
    this.toggleProductDetail()
    this.productChosen = resp
  }

  showDetailError(e:any){
    console.log(e);
    console.error(e)
  }

  createNewProduct(){
    const product: CreateProductoDTP = {
      title: 'Nuevo Producto',
      description: 'siii',
      images: [''],
      price: 1,
      categoryId: 2
    }

    this.productsService.create(product)
      .subscribe((data)=>{
        this.products.unshift(data)
      })
  }


  updateProduct(){
    const changes:UpdateProductDTO = {
      title: 'pablow'
    }
    const id  = this.productChosen.id;


    this.productsService.update(id, changes)
      .subscribe((data)=>{
        let productIndex  = this.products.findIndex((item) => item.id == id)
        this.productChosen = data;
        this.products[productIndex] = data;
      })
  }

  deleteProduct(){
    const id  = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe((data) => {
        let productIndex  = this.products.findIndex((item) => item.id == id)
        this.products.splice(productIndex, 1 )
        this.showProductDetail = false
      })
  }


  loadMore(){
    this.productsService.getProductByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = [...this.products, ...data]
        this.offset += this.limit
      })
  }
}
