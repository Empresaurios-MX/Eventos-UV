import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { EventsComponent } from './components/events/events.component';
import { EventsConfirmedComponent } from './components/events-confirmed/events-confirmed.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { MyEventsComponent } from './components/my-events/my-events.component'

const routes: Routes = [
  {
    path: 'miseventos',
    component: MyEventsComponent
  },
  {
    path: 'eventos',
    component: EventsComponent
  },
  {
    path: 'eventos/confirmados',
    component: EventsConfirmedComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }