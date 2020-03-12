import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-book',
	templateUrl: './book.page.html',
	styleUrls: ['./book.page.scss'],
})

export class BookPage implements OnInit {
	
	showChapter: boolean = false;
	id;
	libro;
	pages;
	slideOpts = {
    	slidesPerView: 3,
    	margin: 10
	}
	page: number = 0; 
	showMarker: boolean = false;
	uid;
	
	constructor(
		private router: Router,
		private _location: Location,
		private route: ActivatedRoute,
		private books: BooksService
	) {}

	ngOnInit() {
		this.uid = localStorage.getItem('uid');
		var id = this.route.snapshot.params.id;
		this.id = id;

		this.getBook(id);
	}

	getPage() {
		/* this.books.getPage(this.uid, this.id).then( (data: any) => {
			this.page = data.number;
			this.scroll(data.number, data.number - 1);
		}).catch( error => {
			console.log('error', error);
		}); */
	}

	getBook(id) {
		this.books.getBook(id).then( (data: any) => {
			for(let i = 0; i < Object.keys(data.pages).length; i++) {
				data.pages[i].marker = false;
			}

			this.libro = data;
			this.pages = data.page_numbers;
			this.numbers();
		}).catch( error => {
			console.log('error', error);
		})
	}

	scroll(id, i) {
		console.log('id', id);
		console.log('i', i);

		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: 'smooth', block: 'center' });

		var a = this.pages;
		var arr = [];

		a.forEach( (row, index) => {
			var val;
			
			if(i == index) {
				val = { value: row.value, class: true };
			} else {
				val = { value: row.value, class: false };
			}
			
			arr.push(val);
		});

		this.pages = arr;
	}
	
	scroll2(i, type) {
		var a = this.pages;
		var io = a.map( e => { return e.value; }).indexOf(i);

		if(type == 2 && i > 0) {
			if(io > -1) {
				var id;
				var el;
				
				if(i > 0) {
					el = document.getElementById(i);
				}
	
				el.scrollIntoView({ behavior: 'smooth', block: 'center' });
				var arr = [];
		
				a.forEach( (row, index) => {
					var val;
					
					if(io == index) {
						val = { value: row.value, class: true };
					} else {
						val = { value: row.value, class: false };
					}
					
					arr.push(val);
				});
				
				this.pages = arr;
			}
		} else if(type == 1) {
			if(io > -1) {
				var id;
				var el;
	
				id = i + 1;
				this.page = id;
				el = document.getElementById(id);
				
	
				el.scrollIntoView({ behavior: 'smooth', block: 'center' });
				var arr = [];
		
				a.forEach( (row, index) => {
					var val;
					
					if(io == index) {
						val = { value: row.value, class: true };
					} else {
						val = { value: row.value, class: false };
					}
					
					arr.push(val);
				});
				
				this.pages = arr;
			}
		}
	}

	numbers() {
		let res = [];
		
		for (let i = 0; i < this.pages; i++) {
			if(i == 0) {
				var val = { value: i, class: true }
				res.push(val);
			} else {
				var val = { value: i, class: false }
				res.push(val);
			}
		}

		this.pages = res;
		this.getPage();
	}
	
	before() {
		if(this.page > 0) {
			this.page = this.page - 1;
			var a = this.page;
			this.scroll2(a, 2);
		}
	}

	after() {
		if(this.page > 0) {
			var a = this.page;
			this.scroll2(a, 1);
		} else {
			var a = this.page
			this.scroll2(a, 1);
		}
	}

	savePage(number, index, id) {
		/* this.books.markPage(this.uid, id, number).then( succes => {
			var array = this.libro.pages[index];
			array['marker'] = true;
			this.libro.pages[index] = array;
	
			setTimeout( () => {
				var array = this.libro.pages[index];
				array['marker'] = false;
				this.libro.pages[index] = array;
			}, 1000);
		}).catch( error => {
			console.log('error', error);
		}) */
	}

	back() {
		this._location.back();
	}
}
