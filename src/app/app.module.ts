import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// angularFire imports
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

// components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { EditclientComponent } from './components/editclient/editclient.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// service Imports
import {ClientService} from './services/client.service';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {SettingsService} from './services/settings.service';
import {AuthGuard} from './guards/auth.guard';
import {RegisterGuard} from './guards/register.guard';

// set roues after adding components
const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-client', component: AddclientComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'editclient/:id', component: EditclientComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

// firebase credentials
export const firebaseConfig = {
  apiKey: 'AIzaSyAjXY75W1jeRHRRA2ZwqgkbfVW4Jc894Pg',
  authDomain: 'clientpanel-904ba.firebaseapp.com',
  databaseURL: 'https://clientpanel-904ba.firebaseio.com',
  storageBucket: 'clientpanel-904ba.appspot.com',
  messagingSenderId: '297400000436'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddclientComponent,
    EditclientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    FlashMessagesService,
    SettingsService,
    AuthGuard,
    RegisterGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
