import { Component, OnInit } from '@angular/core';

declare let window: any;

@Component({
  selector: 'pgm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pgm-manager-frontend';
  isToast: any;
  message = '';
  date = '';

  ngOnInit(): void {
    this.isToast = new window.bootstrap.Toast(
      document.getElementById('myToast')
    );
  }

  openToast() {
    this.isToast.show();
    this.message = 'Registro adicionado com sucesso';
    this.date = new Date().getFullYear().toString();
  }

  reset() {
    this.isToast.hide();
  }

  onOpenTeste() {
    return this.isToast.show();
  }
}
