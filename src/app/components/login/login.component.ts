import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private as: AuthService,
    private router: Router,
    private FM: FlashMessagesService) { }

  ngOnInit() {
  }
  onSubmit() {
    // this is a promise
    this.as.login(this.email, this.password)
      .then((res) => {
        this.FM.show('You are logged in', {cssClass: 'alert-succes', timeout: 4000});
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.FM.show('Error', {cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/login']);
      });
  }

}
