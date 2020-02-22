import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit {
  name: boolean = true;
  password: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
