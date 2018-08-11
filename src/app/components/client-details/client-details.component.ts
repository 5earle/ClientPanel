import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Clientinterface} from '../../models/Client';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  hasBalance = false;
  showBalance = false;
  showbalanceupdateInput: false;
  client: Clientinterface = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    balance: 0
  }



  constructor(public CS: ClientService, // talk to firebase
              public router: Router,
              public route: ActivatedRoute,  // go get the id
              public FM: FlashMessagesService) { }

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    // get the client
    this.CS.getClient(this.id).valueChanges().subscribe(client => {
      if (client.balance > 0 ) {
        this.hasBalance = true;
      }
      this.client = client;
    });
   /* this.CS.getCard(this.id).subscribe(data => {
      this.client = data;
      console.log(this.client);
    });*/
  }
  updateBalance(id: string) {
    // update a client
    this.CS.updateClient(this.id, this.client);
    this.FM.show('Balance Updated', {cssClass: 'alert-succes', timeout: 4000});
    this.router.navigate(['/client/' + this.id]);
  }
  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.CS.deleteClient(this.id);
      this.FM.show('Client Deleted', {cssClass: 'alert-succes', timeout: 4000});
      this.router.navigate(['/']);
    }
  }


}
