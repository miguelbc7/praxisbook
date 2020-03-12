import { Component, OnInit, ViewEncapsulation    } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { UsersService } from '../../services/users.service';

@Component({
  	selector: 'app-articles',
  	templateUrl: './articles.page.html',
  	styleUrls: ['./articles.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class ArticlesPage implements OnInit {

	libros;
	uid

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private books: BooksService,
		private users: UsersService
	) {}

	ngOnInit() {
		var data = this.route.snapshot.params.data;
		this.uid = localStorage.getItem('uid');

		var segment = document.querySelector('ion-segment');
		var slides = document.querySelector('ion-slides');
		
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

		this.getMyBooks();
	}
	  
	getMyBooks() {
		this.books.getMyBooks().then( data => {
			console.log('data', data);

			this.libros = data;
		}).catch( error => {
			console.log('error', error);
		});
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
