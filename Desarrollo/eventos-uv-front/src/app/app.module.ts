import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {EventsComponent} from './components/events/events.component';
import {EventsConfirmedComponent} from './components/events-confirmed/events-confirmed.component';
import {UsuarioDataService} from './services/usuario.data.service';
import {HttpClientModule} from '@angular/common/http';
import {MyEventsComponent} from './components/my-events/my-events.component';
import {EventoDataService} from './services/evento.data.service';

import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireMessagingModule} from '@angular/fire/messaging';


import {environment} from '../environments/environment';
import {ProfileComponent} from './components/profile/profile.component';
import {AsyncPipe} from '../../node_modules/@angular/common';
import {NotificationsService} from './services/notifications.service'
import {EstadisticasDataService} from './services/estadisticas.data.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {AuthGuardAdminService} from './auth/auth-guard-admin.service';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    EventsComponent,
    EventsConfirmedComponent,
    MyEventsComponent,
    NavbarComponent,
    ProfileComponent,
    DashboardComponent,
    ProfileAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(({
      positionClass: 'toast-bottom-right'
    }),),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireMessagingModule
  ],
  providers: [UsuarioDataService, EventoDataService, AsyncPipe, NotificationsService, EstadisticasDataService, AuthGuardService, AuthGuardAdminService , AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
