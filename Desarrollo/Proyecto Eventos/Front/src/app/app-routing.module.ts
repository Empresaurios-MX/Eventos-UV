import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Componentes
import {EventsComponent} from './components/events/events.component';
import {EventsConfirmedComponent} from './components/events-confirmed/events-confirmed.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {MyEventsComponent} from './components/my-events/my-events.component'
import {ProfileComponent} from './components/profile/profile.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/eventos',
    pathMatch: 'full'
  },
  {
    path: 'miseventos',
    component: MyEventsComponent
  },
  {
    path: 'eventos',
    component: EventsComponent
  },
  {
    path: 'confirmados',
    component: EventsConfirmedComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
