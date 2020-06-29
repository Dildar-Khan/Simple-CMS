import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent }
];

@NgModule({
imports: [
RouterModule.forChild(routes)
],
exports: [RouterModule]
})
export class AuthRoutingModule {}
