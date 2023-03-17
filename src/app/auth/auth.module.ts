import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth.routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, SignInComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
