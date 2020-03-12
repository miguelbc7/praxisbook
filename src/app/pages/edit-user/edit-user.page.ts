import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.page.html',
	styleUrls: ['./edit-user.page.scss'],
})

export class EditUserPage implements OnInit {

	public edit: FormGroup;
	uid;
	data = {
		name: '',
		lastname: '',
		birthdate: '',
		email: ''
	};
	validation_messages = {
		'name': [
        	{ type: 'required', message: 'Debe ingresar un nombre.' },
        	{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
      	],
      	'lastname': [
        	{ type: 'required', message: 'Debe ingresar un apellido.' },
        	{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' }
		],
		'birthdate': [
	        { type: 'required', message: 'Debe ingresar una fecha de nacimiento.' },
      	]
	}

	constructor(
		public formBuilder: FormBuilder,
		private location: Location,
		private toastController: ToastController,
		private users: UsersService
	) {
		this.edit = formBuilder.group({
			name: ['', Validators.compose([
        		Validators.required,
        		Validators.maxLength(30)
      		])],
      		lastname: ['', Validators.compose([
        		Validators.required,
        		Validators.maxLength(30)
			])],
			birthdate: ['', Validators.compose([
        		Validators.required,
      		])]
		});
	}

	async ngOnInit() {
		var uid = localStorage.getItem('uid');
		this.uid = uid;

		await this.getUser(uid);
	}
	
	async getUser(uid) {
		this.users.getUser(uid).then( (data: any) => {
			this.data.name = data.name;
			this.data.lastname = data.last_name;
			this.data.birthdate = data.birthday;
			this.data.email = data.email;
		}).catch( error => {
			console.log('error', error);
		});
	}

	async cancel() {
		this.location.back();
	}

	async onSubmit(values) {
		this.users.editUser(this.uid, values.name, values.lastname, values.birthdate, this.data.email).then( success => {
			this.presentToast('Sus datos han sido editados correctamente');
			this.cancel();
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
}
