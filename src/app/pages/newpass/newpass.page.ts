import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-newpass',
	templateUrl: './newpass.page.html',
	styleUrls: ['./newpass.page.scss'],
})

export class NewpassPage implements OnInit {

	email;
	public sende: FormGroup;
	validation_messages = {
    	'raus_send_email': [
			{ type: 'required', message: 'Correo requerido' },
			{ type: 'minlength', message: 'Debe ser mayor de 5 caracteres' },
			{ type: 'maxlength', message: 'Debe ser menor de 30 caracteres.' },
			{ type: 'pattern', message: 'Debe ingresar un correo.' }
		],
	}

	constructor(
		private formBuilder: FormBuilder,
		private toastController: ToastController,
		private users: UsersService
	) {
		this.sende = formBuilder.group({
			raus_send_email: ['', Validators.compose([
			  	Validators.required,
			 	Validators.minLength(8),
			 	Validators.maxLength(30),
			  	Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])]
	  	});
	}

	ngOnInit() {}

	async onSubmit(values) {
		var email = values.raus_send_email;

		this.users.recover(email).then( success => {
			this.presentToast('Se ha enviado la solicitud con exito, revise su bandeja de entrada');
		}).catch( error => {
			this.presentToast('ocurrio un error al enviar la solicitud');
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
