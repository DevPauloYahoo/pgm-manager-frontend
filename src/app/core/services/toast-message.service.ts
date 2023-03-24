import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ToastrData } from '../models/toastr-data.model';

type iconType = 'success' | 'error' | 'warning' | 'question' | undefined;
const TITLE = 'PGM-SGA';

const Toast = Swal.mixin({
  customClass: {
    image: 'mb-0 mt-0',
    title: 'text-center text-primary mb-0 mt-0 ',
    timerProgressBar: 'bg-success',
  },
  toast: true,
  position: 'top-end',
  title: 'PGM - SGA',
  imageUrl: 'assets/img/logo_2.png',
  imageWidth: 40,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: 'aliceblue',
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
      text,
    });
  }

  toastError(text: string) {
    Toast.fire({
      text,
    });
  }

  toastWarning(text: string) {
    Toast.fire({
      text,
    });
  }

  toastInfo(text: string) {
    Toast.fire({
      text,
    });
  }

  toastQuestion(text: string) {
    Toast.fire({
      text,
    });
  }
}
