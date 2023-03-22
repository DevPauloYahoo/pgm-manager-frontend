import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'pgm-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
  ],
})
export class ToastMessageComponent {
  bounce: any;
  // @Input() message = '';
  // @Input() date = '';
}
