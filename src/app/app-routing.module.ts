import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './core/auth.guard';
import { ProfileComponent } from './profile/profile.component'
import { PostComponent } from './post/post.component'

const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'sign-up', component: RegisterComponent },
  {path: 'sign-in', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'post/new', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
