import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product
  // @Output() addedProduct = new EventEmitter<Product>()
  
  @Output() showProduct = new EventEmitter<string>()
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {}

  onAddToCart(){
    // this.addedProduct.emit(this.product)
    this.storeService.addProduct(this.product)
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }

}
