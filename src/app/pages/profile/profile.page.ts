import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  	selector: 'app-profile',
  	templateUrl: './profile.page.html',
  	styleUrls: ['./profile.page.scss'],
  	encapsulation: ViewEncapsulation.None
})

export class ProfilePage implements OnInit {
	
	name: any;
	password: boolean = true;
	user;
	uid;

    constructor(
		private router: Router,
		private _location: Location,
		private users: UsersService
	) {}

	ngOnInit() {
		this.uid = localStorage.getItem('uid');
		this.getUser(this.uid);
	}
	
	goToEdit() {
		this.router.navigate(['edit-user']);
	}

	goToPassword() {
		this.router.navigate(['edit-password']);
	}

	logout() {
		this.users.logout().then( success => {
			this.router.navigate(['login']);
		}).catch( error => {
			console.log('error', error);
		})
	}

	back() {
		this._location.back();
	}

	async getUser(uid) {
		this.users.getUser(uid).then( (value: any) => {
			this.user = value;
			this.name = this.user.name + ' ' + this.user.last_name;
		}).catch( error => {
			console.log('error', error);
		});
	}
}
