import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

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
		private db: AngularFireDatabase,
		private fb: Facebook,
		private gPlus: GooglePlus
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

	async emailLogin(email, password) {
		return new Promise( (resolve, reject) => {
			this.auth.auth.signInWithEmailAndPassword( email, password ).then( success => {
				var uid = success.user.uid;
				resolve(uid);
			}).catch( error => {
				reject(error);
			});
		});
	}

	async fbLogin() {
		return new Promise( (resolve, reject) => {
			this.fb.login(['email']).then( (response: FacebookLoginResponse) => {
				/* console.log('Logged into Facebook!', response); */

				var facebookCredential = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

				this.auth.auth.signInWithCredential(facebookCredential).then( success => { 
					/* console.log("Firebase success: " + JSON.stringify(success)); */
					resolve(success.user); 
				}).catch( error => { 
					console.log('error', error);
					reject(error);
				});
			}).catch( error => {
				console.log('error', error);
				reject(error);
			});
		});
	}

	async gLogin() {
		return new Promise( (resolve, reject) => {
			this.gPlus.login({}).then( response => {
				var googleCredential = auth.GoogleAuthProvider.credential(null, response.accessToken);

				this.auth.auth.signInWithCredential(googleCredential).then( success => { 
					/* console.log("Firebase success: " + JSON.stringify(success)); */
					resolve(success.user); 
				}).catch( error => { 
					console.log('error', error);
					reject(error);
				});
			}).catch( error => {
				console.log('error', error);
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

	async sregister(name, lastname, email, birthdate, type, uid) {
		return new Promise( (resolve, reject) => {
			var data = {
				email: email,
				name: name,
				last_name: lastname,
				birthday: birthdate,
				writter: false,
				type: type,
				uid: uid
			};
			
			this.http.post(this.base_path + 'usuarios/v1', data, {
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

	async userExist(uid, type) {
		return new Promise( (resolve, reject) => {
			this.db.object('usuarios/' + uid).valueChanges().subscribe( data => {
				if(data) {
					if(data['type'] == type) {
						reject('error');
					} else {
						reject('noProvider');
					}
				} else {
					resolve('success');
				}
			})
		});
	}

	async verifyEmail(email) {
		return new Promise( (resolve, reject) => {
			this.db.list('/usuarios', ref => ref.orderByChild('email').equalTo(email)).valueChanges().subscribe( data => {
				if(data) {
					resolve(data);
				} else {
					reject('error');
				}
			})
		});
	}

	async getUser(uid) {
		return new Promise( (resolve, reject) => {
			this.db.object('usuarios/' + uid).valueChanges().subscribe( data => {
				if(data) {
					resolve(data);
				} else {
					reject('Error');
				}
			}, error => {
				reject(error);
			});
		});
	}

	async editUser(uid, name, lastname, birthdate, email) {
		return new Promise( (resolve, reject) => {
			var data = {
				uid: uid,
				email: email,
				name: name,
				last_name: lastname,
				birthday: birthdate,
			};
			
			this.http.put(this.base_path + 'usuarios/update', data, {
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

	async editPassword(uid, actual, nueva, repeat, email) {
		console.log('email', email);
		return new Promise( (resolve, reject) => {
			this.auth.auth.signInWithEmailAndPassword( email, actual ).then( success => {
				console.log('success', success);
				var data = {
					uid: uid,
					password: nueva,
					repeat_password: repeat,
				};
				
				this.http.put(this.base_path + 'usuarios/password', data, {
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
			}).catch( error => {
				console.log('error', error);
				reject('error1');
			});
		});
	}

	async logout() {
		return new Promise( (resolve, reject) => {
			this.auth.auth.signOut().then( success => {
				localStorage.removeItem('uid');
				localStorage.removeItem('token');
				localStorage.removeItem('remember');
				resolve('success');
			}).catch( error => {
				reject(error);
			});
		});
	}

	async changeTransStatus(uid, value) {
		return new Promise( (resolve, reject) => {
			this.db.object('usuarios/' + uid).update({ status_trans: value }).then( success => {
				resolve('success')
			}).catch( error => {
				console.log('error', error);
				reject('error');
			});
		});
	}
}
