import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { bounceInLeft } from 'ng-animate';

@Component({
  selector: 'pgm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInLeft))]),
  ],
})
export class HomeComponent {
  bounce: any;
}
