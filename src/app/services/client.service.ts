import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Clientinterface} from '../models/Client';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

// connects to firebase
@Injectable()
export class ClientService {
  clients: AngularFireList<any>;
  client: AngularFireObject<any>;
  selectClient: Clientinterface = new Clientinterface();



  constructor(public af: AngularFireDatabase, public http: HttpClient) {
    // fetch clients from firebase
    this.clients = this.af.list('client');
  }
  getClients() {
    return this.clients;
  }

  newClient(value: Clientinterface) {
    this.clients.push(value);
  }

  getClient(id: string) {
    this.client = this.af.object(`/client/${id}`);
    return this.client;
  }
  updateClient(id: string, user: Clientinterface) {
    return this.clients.update(id, user);
  }
  deleteClient(id: string) {
    return this.clients.remove(id);
  }
  getCard(id: string) {
    return this.http.get('https://clientpanel-904ba.firebaseio.com/client.json/');
  }
}
