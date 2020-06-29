import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from './../angular-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
declarations: [
  LoginComponent,
  SingupComponent
],
imports: [
  CommonModule,
  AngularMaterialModule,
  ReactiveFormsModule,
  AuthRoutingModule
]
})
export class AuthModule {}
