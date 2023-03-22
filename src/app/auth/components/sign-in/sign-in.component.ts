import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';

import { SignInService } from '../../services/sign-in.service';

@Component({
  selector: 'pgm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(6)]],
  });

  constructor(
    private readonly http: HttpClient,
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

  ngOnInit() {
    this.renderer.selectRootElement('#formUsername').focus();
  }

  signIn() {
    const { username, password } = this.signInForm.getRawValue();
    this.signInService
      .signIn(username, password)
      .pipe(
        tap(res => {
          this.router.navigate(['visits']);
        })
      )
      .pipe(
        catchError(err => {
          this.renderer.selectRootElement('#formUsername').focus();
          this.signInForm.reset();
          console.log(err.message);
          return EMPTY;
        })
      )
      .subscribe();
  }

  login() {
    const { username, password } = this.signInForm.getRawValue();
    this.signInService
      .login(username, password)
      .pipe(
        tap(res => {
          this.router.navigate(['visits']);
        })
      )
      .pipe(
        catchError(err => {
          this.renderer.selectRootElement('#formUsername').focus();
          this.signInForm.reset();
          console.log(err.message);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
