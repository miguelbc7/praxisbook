import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class UsersService {

	token:any ;
	base_path = environment.url;
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': this.token,
		})
	}

  	constructor(
		private http: HttpClient,
		private storage: Storage,
		private auth: AngularFireAuth,
		private db: AngularFireDatabase
	) {}

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

	async fireLogin(email, password) {
		return new Promise( (resolve, reject) => {
			this.auth.auth.signInWithEmailAndPassword(email, password).then(value => {
				var uid = value.user.uid;
				resolve(uid);
			}).catch( error => {
				reject(error);
			});
		});
	}

	async apiLogin(uid) {
		return new Promise( (resolve, reject) => {
			var data = {
				uid: uid
			};

			return this.http.post(this.base_path + 'auth/login', data, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
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

	async register(name, lastname, email, birthdate, password, cpassword) {

		return new Promise( (resolve, reject) => {
			var data = {
				email: email,
				name: name,
				last_name: lastname,
				password: password,
				repeat_password: cpassword,
				birthday: birthdate,
				writter: false
			};
			
			this.http.post(this.base_path + 'usuarios', data, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
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
