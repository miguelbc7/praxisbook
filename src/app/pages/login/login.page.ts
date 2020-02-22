import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	encapsulation: ViewEncapsulation.None
})

export class LoginPage implements OnInit {

	public login: FormGroup;
	validation_messages = {
    	'email': [
			{ type: 'required', message: 'Correo requerido' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' },
			{ type: 'pattern', message: 'Debe ingresar un correo.' }
		],
      	'password': [
            { type: 'required', message: 'Contraseña Rederida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.' }
		]
	}

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		public toastController: ToastController,
		public users: UsersService,
		private auth: AngularFireAuth,
	) {
		this.login = formBuilder.group({
			email: ['', Validators.compose([
			  	Validators.required,
			 	Validators.minLength(8),
			 	Validators.maxLength(30),
			  	Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			remember: [false, Validators.compose([])]
	  	});
	}

	ngOnInit() {}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}
	 
	async onSubmit(values) {
		var email = this.login.value.email;
		var password = this.login.value.password;

		this.users.fireLogin(email, password).then( (value: any) => {
			var uid = value; 
			localStorage.setItem('uid', uid);

			this.users.apiLogin(uid).then( success => {
				localStorage.setItem('token', success['token']);
				this.router.navigate(["/home"]);
			}).catch(error => {
				console.log('error2', error)
				this.presentToast(error);
			});
		}).catch(error => {
			console.log('error', error);
			this.presentToast(error);
		});

		/* this.auth.auth.signInWithEmailAndPassword(email, password).then(value => {
			console.log('value', value);
			var uid = value.user.uid;
			localStorage.setItem('uid', uid);
			
			this.users.apiLogin(uid).then( success => {
				localStorage.setItem('token', success['token']);
				this.router.navigate(["/home"]);
			});
		}).catch( error => {
			this.presentToast(error);
		}); */
	}
}
