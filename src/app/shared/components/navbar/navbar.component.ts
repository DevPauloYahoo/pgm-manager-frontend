import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserPayload } from '../../../auth/sign-in/models/payload.interface';
import { UserService } from '../../../auth/sign-in/services/user.service';

@Component({
  selector: 'pgm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$ = new Observable<UserPayload | null>();

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
