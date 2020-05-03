import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {EventsComponent} from './components/events/events.component';
import {EventsConfirmedComponent} from './components/events-confirmed/events-confirmed.component';
import {EventsPastComponent} from './components/events-past/events-past.component';
import {UsuarioDataService} from './services/usuario.data.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    EventsComponent,
    EventsConfirmedComponent,
    EventsPastComponent
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
