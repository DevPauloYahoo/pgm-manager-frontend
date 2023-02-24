import { Component, Input } from '@angular/core';

@Component({
  selector: 'pgm-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
})
export class ToastMessageComponent {
  @Input() headerTitle = '';
  @Input() message = '';
  @Input() date = '';
}
