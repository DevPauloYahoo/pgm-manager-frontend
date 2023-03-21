import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ToastrData } from '../models/toastr-data.model';

const TITLE = 'PGM-SGA';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly toastrService: ToastrService) {}

  showSuccess({ message, title, time }: ToastrData) {
    this.toastrService.success(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showError({ message, title, time }: ToastrData) {
    this.toastrService.error(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showInfo({ message, title, time }: ToastrData) {
    this.toastrService.info(message, title ? title : TITLE, {
      timeOut: time,
    });
  }

  showWarn({ message, title, time }: ToastrData) {
    this.toastrService.warning(message, title ? title : TITLE, {
      timeOut: time,
    });
  }
}
