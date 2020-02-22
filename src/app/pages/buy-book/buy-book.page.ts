import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.page.html',
  styleUrls: ['./buy-book.page.scss'],
})
export class BuyBookPage implements OnInit {
  count = 0;
  statusBuy = false;
  active: boolean = true;

  constructor() { }

  ngOnInit() {
  }
  less(){
    this.count = this.count - 1;
    if (this.count <= 0){
      this.count = 0;
    }
  }
  
  more(){
    this.count = this.count + 1;
  }

  status(id){

    if (id == 1){
      this.statusBuy = false;
      this.active = true;
      console.log(this.statusBuy);
    }else{
      this.statusBuy = true;
      this.active = false;
      console.log(this.statusBuy);
    }
  }

  slideOpts = {
    slidesPerView: 2
  }
}
