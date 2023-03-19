import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { SpinnerLoadingService } from '../services/spinner-loading.service';

@Injectable()
export class SpinnerLoadingInterceptor implements HttpInterceptor {
  private activeRequest = 0;

  constructor(private readonly spinnerLoadingService: SpinnerLoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequest === 0) {
      this.spinnerLoadingService.showLoading();

      this.activeRequest++;
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequest--;

        if (this.activeRequest === 0) {
          this.spinnerLoadingService.hideLoading();
        }
      })
    );
  }
}
