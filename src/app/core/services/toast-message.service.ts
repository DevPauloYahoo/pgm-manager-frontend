import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ToastrData } from '../models/toastr-data.model';

type iconType = 'success' | 'error' | 'warning' | 'question' | undefined;
const TITLE = 'PGM-SGA';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  title: 'PGM - SGA',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly toastService: ToastrService) {}

  showSuccess({ message, title, time }: ToastrData) {
    this.toastService.success(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showError({ message, title, time }: ToastrData) {
    this.toastService.error(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showInfo({ message, title, time }: ToastrData) {
    this.toastService.info(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showWarn({ message, title, time }: ToastrData) {
    this.toastService.warning(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showToast(icon: iconType, title: string) {
    Toast.fire({ icon, title }).then();
  }

  toastSuccess(text: string) {
    Toast.fire({
      icon: 'success',
      text,
    }).then();
  }

  toastError(text: string) {
    Toast.fire({
      icon: 'error',
      text,
    }).then();
  }

  toastWarning(text: string) {
    Toast.fire({
      icon: 'warning',
      text,
    }).then();
  }

  toastInfo(text: string) {
    Toast.fire({
      icon: 'info',
      text,
    }).then();
  }

  toastQuestion(text: string) {
    Toast.fire({
      icon: 'question',
      text,
    }).then();
  }
}
