import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import 'rxjs/operator/map';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogedIn: boolean;
  loggedinUser: string;  // email
  showRegister: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private FM: FlashMessagesService,
    public SR: SettingsService) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogedIn = true;
        this.loggedinUser = auth.email;
      } else {
        this.isLogedIn = false;
      }
    });
    this.showRegister = this.SR.getSettings().allowReg;
  }
  onLogOutClick() {
    this.auth.loggedOut();
    this.FM.show('your are logged out', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
