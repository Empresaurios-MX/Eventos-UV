import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { EventsComponent } from './components/events/events.component';
import { EventsConfirmedComponent } from './components/events-confirmed/events-confirmed.component';
import { EventsPastComponent } from './components/events-past/events-past.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/eventos',
    pathMatch: 'full'
  },
  {
    path: 'eventos',
    component: EventsComponent
  },
  {
    path: 'eventos/pasados',
    component: EventsPastComponent
  },
  {
    path: 'eventos/confirmados',
    component: EventsConfirmedComponent
  },
  {
    path: 'signin',
    component: SigninComponent
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
