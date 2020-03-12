import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController, ModalController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AdicionalPage } from '../adicional/adicional.page';

@Component({
	selector: 'app-sregister',
	templateUrl: './sregister.page.html',
	styleUrls: ['./sregister.page.scss'],
})
export class SregisterPage implements OnInit {

	@Input() user: any;
	@Input() type: any;
	public sregister: FormGroup;
	politval = false;
	politval2 = false;
	termsval = false;
	termsval2 = false;
	name;
	lastname;
	email;
	uid;
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
		private _location: Location,
		public toastController: ToastController,
		private modalController: ModalController,
		public users: UsersService
	) {
		this.sregister = formBuilder.group({
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
			polit: [false, Validators.compose([
				Validators.pattern('true')
			])],
			terms: [false, Validators.compose([
				Validators.pattern('true')
			])]
		});
	}

	ngOnInit() {
		this.email = this.user.email;
		this.uid = this.user.uid;
		this.name = this.user.displayName.split(' ')[0] || "";
		this.lastname = this.user.displayName.split(' ')[1] || "";
	}
	  
	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	async onSubmit(values) {
		var email = this.email;
		var name = this.sregister.value.name;
		var lastname = this.sregister.value.lastname;
		var birthdate = this.sregister.value.birthdate;
		var type = this.type;
		var uid = this.uid;
		this.politval2 = false;
		this.termsval2 = false;

		this.users.sregister(name, lastname, email, birthdate, type, uid).then( success => {
			localStorage.setItem('uid', this.uid);
			localStorage.setItem('token', success['token']);
			this.router.navigate(["/home"]);
			this.modalController.dismiss();
		}).catch( error => {
			var e = error.error.error;
			this.presentToast(e);
		});
	}

	async goToAditional(type) {
		const modal = await this.modalController.create({
			component: AdicionalPage,
			componentProps: {
				type: type
			}
		});

		return await modal.present();
	}

	async back() {
		this._location.back();
	}
}
