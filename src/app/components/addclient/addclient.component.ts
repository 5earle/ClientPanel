import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Clientinterface} from '../../models/Client';
import {ClientService} from '../../services/client.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  client: Clientinterface = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnAdd = false;
  constructor(
    public FMS: FlashMessagesService,
    public router: Router,
    public cs: ClientService,
    public settingService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disbaleBalOnAdd;
  }
  onSubmit({value, valid}: {value: Clientinterface, valid: boolean}) {
    if(this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.FMS.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['addclient']);
    } else {
      this.cs.newClient(value);
      this.FMS.show('New Client Adeed', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
