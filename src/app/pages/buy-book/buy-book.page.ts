import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { BooksService } from '../../services/books.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsersService } from '../../services/users.service';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
declare var cordova;

@Component({
	selector: 'app-buy-book',
	templateUrl: './buy-book.page.html',
	styleUrls: ['./buy-book.page.scss'],
})

export class BuyBookPage implements OnInit {
  
	count = 0;
	from;
	message;
	statusBuy = false;
	active: boolean = true;
	id;
	slideOpts = {
		slidesPerView: 2
	}
	libro;
	label = 'Comprar';
	version;
	base64;
	signature;
	uid;
	browser;
	val: number = 1;
	emails;
	public sendData: FormGroup;

  	constructor(
    	public formBuilder: FormBuilder,
		private toastController: ToastController,
		private router: Router,
		private route: ActivatedRoute,
		private books: BooksService,
		private users: UsersService,
		private iab: InAppBrowser,
		private db: AngularFireDatabase,
		private _location: Location
	) {
		this.sendData = formBuilder.group({
			version: ['', Validators.compose([
			  	Validators.required,
			])],
			base64: ['', Validators.compose([
        		Validators.required,
      		])],
      		signature: ['', Validators.compose([
        		Validators.required,
			])],

	  	});
	}

	ngOnInit() {
		var id = this.route.snapshot.params.id;
		this.uid = localStorage.getItem('uid');
		this.id = id;

		this.getBook(id);
		this.listenerStatus();
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});

		toast.present();
	}

	getBook(id) {
		this.books.getBook(id).then( (data: any) => {
			console.log('data', data);
			this.libro = data;
		}).catch( error => {
			console.log('error', error);
		})
	}

	buy(id) {
		if(this.statusBuy) {
			var array = this.emails.split(',');

			if(!this.from) {
				this.presentToast('El from no puede estar vacio');
			}

			if(!this.message) {
				this.presentToast('El mensaje no puede estar vacio');
			}

			if(array.length < 1) {
				this.presentToast('Debe ingresar un correo para enviar el libro');
			}

			if((this.from) && (this.message) && (array.length > 0)) {
				this.books.sendBook(id, array, this.from, this.val, this.message).then( (data: any) => {
					var pageContent = '<form name="from" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST" target="__blank">' +
						'<input hidden type="text" name="Ds_SignatureVersion" value=' + data.version + '>' +
						'<input hidden type="text" name="Ds_MerchantParameters" value=' + data.base64 + '>' +
						'<input hidden type="text" name="Ds_Signature" value=' + data.signature + '>' +
						'<br><br>' +
						'<label align="center" style="font-size: 40px">Está pantalla aparece como una medida de seguridad confirma para continuar</label>' +
						'<br><button type="submit" style="font-size: 40px" ref="submit">Continuar</button>' +
					'</form> <script type="text/javascript">document.getElementById("theForm").submit(); window.close();</script></body></html>';
				
					var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
	
					this.browser = cordova.InAppBrowser.open(
						pageContentUrl ,
						"_blank",
						"hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
					);
				}).catch( error => {
					console.log('error', error);
				})
			}
		} else {
			this.books.buyBook(id).then( (data: any) => {
				console.log('data', data);
	
				var pageContent = '<form name="from" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST" target="__blank">' +
					'<input hidden type="text" name="Ds_SignatureVersion" value=' + data.version + '>' +
					'<input hidden type="text" name="Ds_MerchantParameters" value=' + data.base64 + '>' +
					'<input hidden type="text" name="Ds_Signature" value=' + data.signature + '>' +
					'<br><br>' +
					'<label align="center" style="font-size: 40px">Está pantalla aparece como una medida de seguridad confirma para continuar</label>' +
					'<br><button type="submit" style="font-size: 40px" ref="submit">Continuar</button>' +
				'</form> <script type="text/javascript">document.getElementById("theForm").submit(); window.close();</script></body></html>';
				
				var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

				this.browser = cordova.InAppBrowser.open(
					pageContentUrl ,
					"_blank",
					"hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
				);
			}).catch( error => {
				console.log('error', error);
			});
		}
	}
	  
	less(){
		this.count = this.count - 1;
		
		if (this.count <= 0){
			this.count = 0;
		}
	}
  
	more(){
		this.count = this.count + 1;
	}

	status(id){

		if (id == 1){
			this.statusBuy = false;
			this.active = true;
			this.label = 'Comprar';
			console.log(this.statusBuy);
		} else {
			this.statusBuy = true;
			this.active = false;
			this.label = 'Enviar';
			console.log(this.statusBuy);
		}
	}

	onSubmit(values) {
		this.books.certifyBook(values.version, values.base64, values.signature).then( (data: any) => {
			console.log('data', data);
		}).catch( error => {
			console.log('error', error);
		});
	}

	async listenerStatus() {
		var r = await this.db.object('usuarios/' + this.uid).valueChanges().subscribe( async (success: any) => {
			if(success.status_trans == 2) {
				console.log('2', 2);
				this.browser.close();
				await this.back();
				this.presentToast('El libro ha sido comprado con éxito');
				r.unsubscribe();
			} else if(success.status_trans == 3) {
				console.log('3', 3);
				this.browser.close();
				await this.back();
				this.presentToast('Ocurrio un error al comprar el libro');
				r.unsubscribe();
			}
		}, error => {
			console.log('error', error);
		});
	}

	async back() {
		this.users.changeTransStatus(this.uid, 0).then( async success => {
			await this._location.back();
		}).catch( error => {
			console.log('error', error);
		})
	}

	async changeCount() {
		var a = this.emails;
		var array = a.split(',');
		var length = array.length;

		if(!a) {
			this.count = 0;
		} else {
			if(this.count != length) {
				this.count = length;
			}
		}
	}
}
