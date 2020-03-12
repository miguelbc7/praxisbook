import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-edit-password',
	templateUrl: './edit-password.page.html',
	styleUrls: ['./edit-password.page.scss'],
})

export class EditPasswordPage implements OnInit {

	public pass: FormGroup;
	uid;
	data = {
		actual: '',
		new: '',
		repeat: '',
		email: '',
	};
	passwordType: string = "password";
	passwordShown: boolean = false;
	passwordType2: string = "password";
	passwordShown2: boolean = false;
	passwordType3: string = "password";
	passwordShown3: boolean = false;
	validation_messages = {
		'actual': [
        	{ type: 'required', message: 'Contraseña Requerida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscul, un número y un caracter especial.' }
      	],
      	'new': [
        	{ type: 'required', message: 'Contraseña Requerida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscul, un número y un caracter especial.' }
		],
		'repeat': [
	        { type: 'required', message: 'Contraseña Requerida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscul, un número y un caracter especial.' }
      	]
	}

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private location: Location,
		private toastController: ToastController,
		private users: UsersService
	) {
		this.pass = formBuilder.group({
			actual: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			new: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			repeat: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])]
	  	});
	}
	
  
	async ngOnInit() {
		var uid = localStorage.getItem('uid');
		this.uid = uid;

		this.getUser(uid);
	}

	public togglePassword() {
		if (this.passwordShown) {
			this.passwordShown = false;
			this.passwordType = "password";
		} else {
			this.passwordShown = true;
			this.passwordType = "text";
		}
	}

	public revelarConfirmacion() {
		if (this.passwordShown2) {
			this.passwordShown2 = false;
			this.passwordType2 = "password";
		} else {
			this.passwordShown2 = true;
			this.passwordType2 = "text";
		}
	}

	public revelarConfirmacion3() {
		if (this.passwordShown3) {
			this.passwordShown3 = false;
			this.passwordType3 = "password";
		} else {
			this.passwordShown3 = true;
			this.passwordType3 = "text";
		}
	}

	async getUser(uid) {
		this.users.getUser(uid).then( (data: any) => {
			console.log('data', data.email);
			this.data.email = data.email;
			console.log('this data', this.data.email);
		}).catch( error => {
			console.log('error', error);
		});
	}

	async cancel() {
		this.location.back();
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	async onSubmit(values) {
		if(values.new == values.repeat) {
			this.users.editPassword(this.uid, values.actual, values.new, values.repeat, this.data.email).then( success => {
				this.presentToast('Su contraseña han sido editada correctamente');
				this.users.logout().then( success => {
					this.router.navigate(['login']);
				}).catch( error => {
					this.cancel();
				})
			}).catch( error => {
				if(error == 'error1') {
					this.presentToast('La contraseña actual es incorrecta');
				} else {
					this.presentToast(error);

				}
			})
		} else {
			this.presentToast('Las nueva contraseña y el repetir contraseña no son iguales');
		}
	}

}
