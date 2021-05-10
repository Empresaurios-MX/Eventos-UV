import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import {AuthGuardAdminService as AuthGuardAdmin } from './auth/auth-guard-admin.service';

// Componentes
import {EventsComponent} from './components/events/events.component';
import {EventsConfirmedComponent} from './components/events-confirmed/events-confirmed.component';
import {SignupComponent} from './components/signup/signup.component';
import {SigninComponent} from './components/signin/signin.component';
import {MyEventsComponent} from './components/my-events/my-events.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileAdminComponent} from './components/profile-admin/profile-admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'miseventos',
    component: MyEventsComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'eventos',
    component: EventsComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'confirmados',
    component: EventsConfirmedComponent,
    canActivate: [AuthGuard] 
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
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'perfil/admin', 
    component: ProfileAdminComponent,
    canActivate: [AuthGuardAdmin] 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAdmin] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
