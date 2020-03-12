import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-library',
	templateUrl: './library.page.html',
	styleUrls: ['./library.page.scss'],
})

export class LibraryPage implements OnInit {
	panelOpenState = false;
	  
  	constructor(
    	private router: Router,
	) {}

	ngOnInit() {}
	  
	goToDetail(number) {
		this.router.navigate(['detail-article', { number: number }]);
	}

	goToHighlights(string) {
		this.router.navigate(['highlights', { data: string }]);
	}
}
