import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {
  @Input() productChosen: any
  constructor() { }

  ngOnInit(): void {
  }

}
