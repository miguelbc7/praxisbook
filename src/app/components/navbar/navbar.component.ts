import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  	user: any;
	uid: any;

	constructor(
		private users: UsersService,
    	private router: Router
	) {}

	ngOnInit() {
		this.uid = localStorage.getItem('uid');
		this.getUser(this.uid);
	}

	async getUser(uid) {
		this.users.getUser(uid).then( (value: any) => {
			this.user = value;
		}).catch( error => {
			console.log('error', error);
		});
	}

	async goToLibrary() {
		console.log('goToLibrary');
		this.router.navigate(['library']);
	}

	async goToNotifications() {
		this.router.navigate(['notifications']);
	}
}
