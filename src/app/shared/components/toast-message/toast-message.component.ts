import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare let window: any;

@Component({
  selector: 'pgm-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
})
export class ToastMessageComponent implements OnInit {
  @Output() closeHit = new EventEmitter<Event>(false);
  @Output() openHit = new EventEmitter<Event>(false);

  @Input() title = '';
  @Input() message = '';
  @Input() date = '';
  @Input() myToast: any;

  onOpen(event: Event) {
    this.openHit.emit(event);
  }

  onClose(event: Event) {
    this.closeHit.emit(event);
  }

  ngOnInit(): void {
    this.myToast = new window.bootstrap.Toast(
      document.getElementById('myToast')
    );
  }
}
