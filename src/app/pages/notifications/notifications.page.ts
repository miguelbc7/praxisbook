import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController, ModalController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';

@Component({
	selector: 'app-notifications',
  	templateUrl: './notifications.page.html',
  	styleUrls: ['./notifications.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class NotificationsPage implements OnInit {

	notif;
	favs;
	uid;
	data;
	imgStatus = 1;
	title = 'Notificaciones';

  	constructor(
		private router: Router,
		private toastController: ToastController,
		private modalController: ModalController,
		private notifications: NotificationsService,
		private _location: Location
	) {}
  
	ngOnInit() {
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
			console.log(status);
		}

		this.uid = localStorage.getItem('uid');
		this.getNotifications(this.uid);
	}

	async getNotifications(uid) {
		this.notifications.getNotifications(uid).then( (data: any) => {
			var array = [];
			var array2 = [];
			
			for(let n in data) {
				var a = { content: data[n].content, created_at: data[n].created_at, id_book: data[n].id_book, img: data[n].img, like: data[n].like, read: data[n].read, key: n }
				
				if(data[n]['like']) {
					array2.push(a);
				}

				array.push(a);
			}
			
			this.notif = array;
			this.favs = array2;
		}).catch( error => {
			console.log('error', error);
		})
	}

	changeTitle(data) {
		this.title = data;

		if(data === 'Notificaciones') {
			this.imgStatus = 1;
		} else if(data == 'Favoritos') {
			this.imgStatus = 2;
		}
	}
	  
	like(not, value, index) {
		var val = !value;

		this.notifications.like(this.uid, not, val).then( success => {
			console.log('success', success);
			this.getNotifications(this.uid);
		}).catch( error => {
			console.log('error', error);
		})
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	goToBook(id) {
		this.router.navigate(['book', { id: id }]);
	}

	back() {
		this._location.back();
	}
}
