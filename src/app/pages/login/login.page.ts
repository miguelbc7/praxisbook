import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SregisterPage } from '../sregister/sregister.page';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	encapsulation: ViewEncapsulation.None
})

export class LoginPage implements OnInit {

	public login: FormGroup;
	rememberval = false;
	validation_messages = {
    	'raus_log_email': [
			{ type: 'required', message: 'Correo requerido' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' },
			{ type: 'pattern', message: 'Debe ingresar un correo.' }
		],
      	'raus_log_password': [
            { type: 'required', message: 'Contraseña Rederida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.' }
		]
	}

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private toastController: ToastController,
		private modalController: ModalController,
		private users: UsersService,
		private auth: AngularFireAuth
	) {
		this.login = formBuilder.group({
			raus_log_email: ['', Validators.compose([
			  	Validators.required,
			 	Validators.minLength(8),
			 	Validators.maxLength(30),
			  	Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])],
			raus_log_password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			remember: [false, Validators.compose([])]
	  	});
	}

	ngOnInit() {
		var remember = localStorage.getItem('remember');

		console.log('remember', remember);
		
		if(remember == 'si') {
			this.router.navigate(["/home"]);
		}
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	async openRegisterSocial(user, type) {
		console.log('openRegisterSocial');
		const modal = await this.modalController.create({
			component: SregisterPage,
			componentProps: { 
				user: user,
				type: type
			}
		});

		return await modal.present();
	}

	async signin(uid) {
		console.log('signin');
		return new Promise( (resolve, reject) => {
			localStorage.setItem('uid', uid);

			this.users.apiLogin(uid).then( success => {
				resolve(success);
			}).catch(error => {
				reject(error);
			});
		});
	}
	 
	async eLogin(values) {
		var email = this.login.value.raus_log_email;
		var password = this.login.value.raus_log_password;

		console.log('rememberval', this.rememberval)
		
		if(this.rememberval) {
			localStorage.removeItem('remember');
			localStorage.setItem('remember', 'si');
		} else {
			localStorage.removeItem('remember');
			localStorage.setItem('remember', 'no');
		}

		this.users.emailLogin(email, password).then( (value: any) => {
			var uid = value; 

			this.signin(uid).then( success => {
				localStorage.removeItem('token');
				localStorage.setItem('token', success['token']);
				this.router.navigate(["/home"]);
			}).catch( error => {
				console.log('error', error);
				this.presentToast(error);
			});
		}).catch(error => {
			console.log('error', error);
			this.presentToast(error);
		});
	}

	async fLogin() {
		this.users.fbLogin().then( (value: any) => {
			var uid = value.uid;
			var user = value;

			this.users.userExist(uid, 'Facebook').then( success => {
				this.openRegisterSocial(user, 'Facebook');
			}).catch( error => {
				if(error == 'error') {
					this.signin(uid).then( success => {
						localStorage.setItem('token', success['token']);
						this.router.navigate(["/home"]);
					}).catch( error => {
						console.log('error', error);
						this.presentToast(error);
					});
				} else {
					console.log('error', error);
					this.presentToast(error);
				}
			});
		}).catch(error => {
			console.log('error', error);
			this.presentToast(error);
		});
	}

	async gLogin() {
		console.log('gLogin');
		this.users.gLogin().then( (value: any) => {
			console.log('a');
			var uid = value.uid;
			var user = value;
			
			this.users.userExist(uid, 'Google').then( success => {
				console.log('b');
				this.openRegisterSocial(user, 'Google');
			}).catch( error => {
				if(error == 'error') {
					this.signin(uid).then( success => {
						console.log('c');
						localStorage.setItem('token', success['token']);
						this.router.navigate(["/home"]);
					}).catch( error => {
						console.log('d');
						console.log('error', error);
						this.presentToast(error);
					});
				} else if(error == 'noProvider') {
					console.log('e');
					console.log('error');
					this.presentToast('El usuario está registrado con otro proveedor');
				} else {
					console.log('f');
					console.log('error', error);
					this.presentToast(error);
				}
			});
		}).catch(error => {
			console.log('g');
			console.log('error', error);
			this.presentToast(error);
		});
	}

	changeValue() {
		var a = this.rememberval;
		a = !a;
		this.rememberval = a;
	}
}
