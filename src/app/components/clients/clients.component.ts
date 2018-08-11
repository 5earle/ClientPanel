import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Clientinterface} from '../../models/Client';
import {element} from 'protractor';

// get data from cluent-service
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
 clients: Clientinterface[];
 totalOwed: number;
  constructor(public cS: ClientService) {}

  ngOnInit() {
    // pass all clients from service to Clientinterface[]
    const x = this.cS.getClients();
    x.snapshotChanges().subscribe(item => {
      this.clients = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.clients.push(y as Clientinterface);
      });
      this.getTotal();
    });
  }
  getTotal() {
    let total = 0;
    // loop over clents
    for ( let i = 0; i < this.clients.length; i++) {
      total += this.clients[i].balance;
    }
    this.totalOwed = total;
  }

}
