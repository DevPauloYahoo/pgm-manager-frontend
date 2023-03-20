import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ToastrData } from '../models/toastr-data.model';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly toastrService: ToastrService) {}

  showSuccess({ title, message, position, time }: ToastrData) {
    this.toastrService.success(message, title, {
      // positionClass: position,
      timeOut: time,
    });
  }

  showError({ title, message, position, time }: ToastrData) {
    this.toastrService.error(message, title, {
      // positionClass: position,
      timeOut: time,
    });
  }

  showInfo({ title, message, position, time }: ToastrData) {
    this.toastrService.info(message, title, {
      // positionClass: position,
      timeOut: time,
    });
  }

  showWarn({ title, message, position, time }: ToastrData) {
    this.toastrService.warning(message, title, {
      // positionClass: position,
      timeOut: time,
    });
  }
}
