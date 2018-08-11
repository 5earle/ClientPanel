import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Clientinterface} from '../../models/Client';
import {Observable} from 'rxjs/Observable';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
id: string;
client: Clientinterface = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  balance: 0
}
disbapleblanaceonEdit = true;

  constructor(public CS: ClientService, // talk to firebase
              public router: Router,
              public route: ActivatedRoute,  // go get the id
              public FM: FlashMessagesService,
              public SR: SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // get Client
    this.CS.getClient(this.id).valueChanges().subscribe(client => {
      this.client = client;
      console.log(this.client);
    });
    this.disbapleblanaceonEdit = this.SR.getSettings().disbaleBalOnEdit;
  }
  onSubmit({value, valid}: {value: Clientinterface, valid: boolean}) {
    // update
    if (!valid) {
      this.FM.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      this.CS.updateClient(this.id, value);
      this.FM.show('Client Updated', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
