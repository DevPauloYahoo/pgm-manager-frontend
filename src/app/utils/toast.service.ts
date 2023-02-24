import { Injectable } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast: any;

  createToastMessage() {
    this.toast = new window.bootstrap.Toast(
      document.getElementById('toastMessage')
    );
  }

  openToast() {
    this.toast.show();
  }
}
