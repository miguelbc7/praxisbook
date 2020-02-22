import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

	shown: boolean = true;
	public register: FormGroup;
	passwordType: string = "password";
  	passwordShown: boolean = false;
  	passwordType2: string = "password";
	passwordShown2: boolean = false;
	politval = false;
	politval2 = false;
	termsval = false;
	termsval2 = false;
	validation_messages = {
    	'email': [
			{ type: 'required', message: 'Correo requerido' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' },
			{ type: 'pattern', message: 'Debe ingresar un correo.' }
		],
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
      	],
      	'password': [
            { type: 'required', message: 'Contraseña Rederida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscul, un número y un caracter especial.' }
		],
		'cpassword': [
            { type: 'required', message: 'Contraseña Rederida' },
            { type: 'minlength', message: 'Debe ser mayor de 8 caracteres' },
            { type: 'maxlength', message: 'Debe ser menor de 15 caracteres.' },
            { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial.' }
		],
		'polit': [
            { type: 'pattern', message: 'Debe aceptar las politicas de privacidad' }
		],
		'terms': [
			{ type: 'pattern', message: 'Debe aceptar los terminos y condiciones' }
		]
	}

	constructor(
    	public formBuilder: FormBuilder,
    	private router: Router,
		public toastController: ToastController,
		public users: UsersService
	) {
		this.register = formBuilder.group({
			email: ['', Validators.compose([
			  	Validators.required,
			 	Validators.minLength(8),
			 	Validators.maxLength(30),
			  	Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])],
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
      		])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			cpassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-z0-9\d$@$.!%*?&].{8,15}')
			])],
			polit: [false, Validators.compose([
				Validators.pattern('true')
			])],
			terms: [false, Validators.compose([
				Validators.pattern('true')
			])]
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

	async onSubmit(values) {
		var email = this.register.value.email;
		var name = this.register.value.name;
		var lastname = this.register.value.lastname;
		var password = this.register.value.password;
		var cpassword = this.register.value.cpassword;
		var birthdate = this.register.value.birthdate;
		this.politval2 = false;
		this.termsval2 = false;

		this.users.register(name, lastname, email, birthdate, password, cpassword).then( success => {
			localStorage.setItem('uid', success['uid']);
			localStorage.setItem('token', success['token']);
			this.router.navigate(["/home"]);
		}).catch( error => {
			var e = error.error.error;
			this.presentToast(e);
		});
	}
}
