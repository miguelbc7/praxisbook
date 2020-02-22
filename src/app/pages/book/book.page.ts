import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  showChapter: boolean = false;
  constructor() { }
  ngOnInit() {
  }

  /* slide image */
  slideOpts = {
    slidesPerView: 3,
    margin: 10
  }
  



}
