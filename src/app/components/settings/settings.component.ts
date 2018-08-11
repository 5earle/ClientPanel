import { Component, OnInit } from '@angular/core';
import {Settings} from '../../models/Settings';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(public SR: SettingsService,
              public FM: FlashMessagesService,
              public router: Router) {
  }

  ngOnInit() {
    this.settings = this.SR.getSettings();
  }

  onSubmit() {
    this.SR.changeSettings(this.settings);
    this.FM.show('Settings Saved', {cssClass: 'alert-success', timeout: 50000});
    this.router.navigate(['/settings']);

  }
}
