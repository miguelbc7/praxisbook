import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
	providedIn: 'root'
})

export class NotificationsService {

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
		private db: AngularFireDatabase
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

	async getNotifications(uid) {
		return new Promise( (resolve, reject) => {

			this.db.object('notifications/' + uid).valueChanges().subscribe( data => {
				if(data) {
					resolve(data);
				} else {
					reject('error');
				}
			});
		});
	}

	async like(uid, not, value) {
		return new Promise( (resolve, reject) => {
			this.db.list('notifications/' + uid).update(not, { like: value }).then( success => {
				resolve('success');
			}).catch( error => {
				reject(error);
			})
		});
	}
}
