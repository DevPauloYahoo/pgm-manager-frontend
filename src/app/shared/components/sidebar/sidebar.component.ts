import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserPayload } from '../../../auth/models/payload.interface';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'pgm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user$ = new Observable<UserPayload | null>();

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
