import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { BooksService } from '../../services/books.service';
import { UsersService } from '../../services/users.service';
import { SharePage } from '../share/share.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage {

	slideOpts = {
		slidesPerView: 2
	}
	uid: any;
	libros;
	libros2;
	busqueda;
	lastword;

  	constructor(
    	private router: Router,
		private toastController: ToastController,
		private modalController: ModalController,
		private books: BooksService,
		private share: SocialSharing,
		private users: UsersService
	) {}
	  
	ngOnInit() {
		this.uid = localStorage.getItem('uid');
		this.getBooks();
	}

	getBooks() {
		this.books.getBooks().then( (data: any) => {
			console.log('data', data);
			this.libros = data.books;
			this.libros2 = data.books;
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

	search(ev: any) {
		const val = ev.target.value;
		this.lastword = val;

		if(val.length > this.lastword.val) {
			this.getBooks();
		} else {
			if (val && val.trim() != '') {
				if(this.libros.length < 1) {
					this.libros = this.libros.filter( item => {
						return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
				} else {
					this.libros = this.libros.filter( item => {
						return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
				}
			} else {
				this.libros = this.libros2;
			}
		}
	}

	async socialSharing(id, name, cover) {
		console.log('cover', cover);
		
		var options = {
			message: 'Mira este Libro ' + name,
			subject: name,
			/* files: [ cover ], */
			/* url: 'http://localhost:8100/book;id=' + id, */
			chooserTitle: 'Seleccione una aplicación',
			/* appPackageName: 'com.praxi.book', */
			/* iPadCoordinates: '0,0,0,0' */
		};

		this.share.shareWithOptions(options).then( success => {
			console.log('success', success);
		}).catch( error => {
			console.log('errorSharing', error);
		});
	}

	async goToShare(id, name, cover) {
		const modal = await this.modalController.create({
			component: SharePage,
			componentProps: {
				id: id,
				name: name,
				cover: cover
			}
		});

		return await modal.present();
	}

	doRefresh(event) {
		console.log('Begin async operation');
	
		setTimeout(() => {
		  console.log('Async operation has ended');
		  this.getBooks();
		  event.target.complete();
		}, 2000);
	}
}
