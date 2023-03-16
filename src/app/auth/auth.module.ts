import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInModule } from './sign-in/sign-in.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignInModule],
})
export class AuthModule {}
