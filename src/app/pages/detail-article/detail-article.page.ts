import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-detail-article',
	templateUrl: './detail-article.page.html',
	styleUrls: ['./detail-article.page.scss'],
	encapsulation: ViewEncapsulation.None
})

export class DetailArticlePage implements OnInit {
	number;
	libros;
	uid

  	constructor(
		private books: BooksService,
		private users: UsersService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		var number = this.route.snapshot.params.number;
		this.number = number;
		this.uid = localStorage.getItem('uid');

		this.segments();
		this.getBooks(number);
	}

	segments() {
		var segment = document.querySelector('ion-segment');
		var slides = document.querySelector('ion-slides');
		var status;
		
		segment.addEventListener('ionChange', (ev) => onSegmentChange(ev));
		slides.addEventListener('ionSlideDidChange', (ev) => onSlideDidChange(ev));

		function onSegmentChange(ev) {
			slideTo(ev.detail.value);
		}

		function slideTo(index) {
			slides.slideTo(index);
		}

		async function onSlideDidChange(ev) {
			var index = await slides.getActiveIndex();
			clickSegment(index);
		}

		function clickSegment(index) {
			segment.value = index;
			status = index;
		}
	}

	getBooks(number) {
		this.books.getBooksByDay(number).then( (data: any) => {
			this.libros = data;
		}).catch( error => {
			console.log('error', error);
		})
	}

	goToBook(id) {
		this.router.navigate(['book', { id: id }]);
	}

	goToBuyBook(id) {
		this.users.changeTransStatus(this.uid, 1).then( success => {
			this.router.navigate(['buy-book', { id: id }]);
		}).catch( error => {
			console.log('error', error)
		})
	}
}
