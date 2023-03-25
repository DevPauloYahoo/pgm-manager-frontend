import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
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
  toastSuccess(text: string) {
    Toast.fire({
      customClass: {
        timerProgressBar: 'bg-success',
        htmlContainer: 'm-0',
      },
      html: `
        <div class="card border-success">
          <div class="row" >
            <div class="col-2">
              <img style="height: 50px;" src="assets/img/logo_2.png" alt="logo">
            </div>
            <div class="row col-10 m-auto">
              <h3 class="text-success my-auto"><strong>Procuradoria Geral - SGA</strong></h3>
            </div>
          </div>
        </div>
        <div class="card mt-2 bg-success border-0 text-light" style="--bs-text-opacity: .9;">
          <h3 class="text-center my-2 ">${text}</h3>
        </div>
      `,
    });
  }

  toastError(text: string) {
    Toast.fire({
      customClass: {
        timerProgressBar: 'bg-danger',
        htmlContainer: 'm-0',
      },
      html: `
        <div class="card border-danger">
          <div class="row" >
            <div class="col-2">
              <img style="height: 50px;" src="assets/img/logo_2.png" alt="logo">
            </div>
            <div class="row col-10 m-auto">
              <h3 class="text-danger my-auto"><strong>Procuradoria Geral - SGA</strong></h3>
            </div>
          </div>
        </div>
        <div class="card mt-2 bg-danger border-0 text-light" style="--bs-bg-opacity: .9;">
          <h3 class="text-center my-2 ">${text}</h3>
        </div>
      `,
    });
  }
}
