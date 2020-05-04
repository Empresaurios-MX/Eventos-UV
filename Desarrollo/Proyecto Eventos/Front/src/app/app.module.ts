import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {EventsComponent} from './components/events/events.component';
import {EventsConfirmedComponent} from './components/events-confirmed/events-confirmed.component';
import {UsuarioDataService} from './services/usuario.data.service';
import {HttpClientModule} from '@angular/common/http';
import { MyEventsComponent } from './components/my-events/my-events.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    EventsComponent,
    EventsConfirmedComponent,
    MyEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsuarioDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
