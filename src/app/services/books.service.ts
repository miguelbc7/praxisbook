import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class BooksService {

	token:any ;
	base_path = environment.url;

  	constructor(
		private http: HttpClient,
		private storage: Storage,
	) {
		this.token = localStorage.getItem('token');
	}

	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		return throwError(
		'Something bad happened; please try again later.');
	};

	async getBooks() {
		return new Promise( (resolve, reject) => {

			return this.http.get(this.base_path + 'books', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async getMyBooks() {
		return new Promise( (resolve, reject) => {

			return this.http.get(this.base_path + 'mybooks', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async getBooksByDay(number) {
		return new Promise( (resolve, reject) => {

			return this.http.get(this.base_path + 'books/days/?days=' + number, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async getBooksHighlights() {
		return new Promise( (resolve, reject) => {

			return this.http.get(this.base_path + 'featureds', {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async getBook(id) {
		return new Promise( (resolve, reject) => {
			return this.http.get(this.base_path + 'books/categories/' + id, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}
	
	async buyBook(id) {
		return new Promise( (resolve, reject) => {
			return this.http.get(this.base_path + 'signature_client/' + id, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async sendBook(id, emails, name, number, message) {
		return new Promise( (resolve, reject) => {
			var data = {
				id: id,
				users: emails,
				name: name,
				target_number: number,
				mensaje: message
			}
			return this.http.post(this.base_path + 'signature_gift', data, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async certifyBook(version, base64, signature) {
		return new Promise( (resolve, reject) => {
			
			var data = {
				Ds_SignatureVersion: version,
				Ds_MerchantParameters: base64,
				Ds_Signature: signature
			}

			var result;

			return result = from(
				fetch( 'https://sis-t.redsys.es:25443/sis/realizarPago', {
						body: JSON.stringify(data),
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'POST',
						mode: 'no-cors'
				})
			);

			/* return this.http.post('https://sis-t.redsys.es:25443/sis/realizarPago', data, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			}); */
		});
	}

	async markPage(uid, id, number) {
		return new Promise( (resolve, reject) => {
			var data = {
				id_user: uid,
				id_book: id,
				number: number,
			}
			return this.http.post(this.base_path + 'marcalibro', data, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}

	async getPage(uid, id) {
		return new Promise( (resolve, reject) => {
			var data = {
				id_user: uid,
				id_book: id
			}
			return this.http.get(this.base_path + 'marcalibro/' + uid + '/' + id, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': this.token
				})
			}).pipe(
				map(res => res)
			).subscribe( data => {
				if(data) {
					resolve(data);
				}
			}, error => {
				if(error) {
					reject(error);
				}
			});
		});
	}
}
