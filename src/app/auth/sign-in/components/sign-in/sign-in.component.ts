import { Component, Renderer2 } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';

import { SignInService } from '../../services/sign-in.service';

@Component({
  selector: 'pgm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(6)]],
  });

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly signInService: SignInService
  ) {}

  get username() {
    return this.signInForm.controls['username'].value;
  }

  get password() {
    return this.signInForm.controls['password'].value;
  }

  signIn() {
    const { username, password } = this.signInForm.getRawValue();
    this.signInService
      .signIn(username, password)
      .pipe(
        tap(res => {
          this.router.navigate(['visits']);
          console.log('RESPOSTAS', res);
        })
      )
      .pipe(
        catchError(err => {
          alert('USUÁRIO E/OU SENHA INVÁLIDO');
          this.renderer.selectRootElement('#formUsername').focus();
          this.signInForm.reset();
          console.log(err.message);
          return EMPTY;
        })
      )
      .subscribe();

    // this.signInService.signIn(username, password).subscribe({
    //   next: res => {
    //     this.router.navigate(['visits']);
    //   },
    //   error: err => {
    //     alert('USUÁRIO E/OU SENHA INVÁLIDO');
    //     this.signInForm.reset();
    //     this.renderer.selectRootElement('#formUsername').focus();
    //     console.log(err.message);
    //   },
    // });
  }
}
