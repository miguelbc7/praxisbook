import { Component, OnInit, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
	selector: 'app-share',
	templateUrl: './share.page.html',
	styleUrls: ['./share.page.scss'],
})

export class SharePage implements OnInit {
	
	@Input() id: any;
	@Input() name: any;
	@Input() cover: any;

	constructor(
		private share: SocialSharing
	) {}

	ngOnInit() {}

	socialSharing() {
		var options = {
			message: 'Mira este Libro', // not supported on some apps (Facebook, Instagram)
			subject: this.name, // fi. for email
			files: [this.cover], // an array of filenames either locally or remotely
			url: 'http://localhost:8100/book;id=' + this.id,
			chooserTitle: 'Seleccione una aplicación', // Android only, you can override the default share sheet title
			appPackageName: 'com.praxi.book', // Android only, you can provide id of the App you want to share with
			iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
		};

		this.share.shareWithOptions(options).then( success => {
			console.log('success', success);
		}).catch( error => {
			console.log('error', error);
		})
	}

}
