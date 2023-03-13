import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SignInRoutingModule,
  ],
  exports: [SignInComponent],
})
export class SignInModule {}
