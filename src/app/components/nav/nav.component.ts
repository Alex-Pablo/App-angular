import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { StoreService } from  '../../services/store.service';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu: boolean = false;
  counter = 0;
  profile!: User;
  constructor(
    private  storeServices: StoreService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.storeServices.myCart$.subscribe(products => {
      this.counter = products.length
    })
    this.authService.myProfile$.subscribe(profile => {
      this.profile = profile
      console.log(profile);

    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu
  }

}
