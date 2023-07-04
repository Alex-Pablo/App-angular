import { Component } from '@angular/core';

import { Product } from './models/product.model';
import  { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token:string  ='';
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ){}


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name:'sebas',
      email: 'sebas@gmail.com',
      password: '123'
    })
    .subscribe((data)=>{
      console.log(data);
    })
  }

  login(){
    this.authService.login(
      'sebas@gmail.com',
      '123'
    )
    .subscribe((data)=>{
      this.token = data.access_token
    })
  }


  getProfile(){
    this.authService.profile(this.token)
      .subscribe((data)=>{
        this.authService.setProfile(data)
      })
  }


}
