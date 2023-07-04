import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HighlihtDirective } from './directives/highliht.directive';
import { SwiperModule } from 'swiper/angular';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TimeInterceptor } from './interceptors/time.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    HighlihtDirective,
    SwiperComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,  useClass: TimeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
