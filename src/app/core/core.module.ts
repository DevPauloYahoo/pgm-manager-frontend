import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from '../shared/material.module';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { SpinnerLoadingInterceptor } from './interceptors/spinner-loading.interceptor';

@NgModule({
  declarations: [ToastMessageComponent, SpinnerLoadingComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MaterialModule,
  ],
  exports: [ToastMessageComponent, SpinnerLoadingComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerLoadingInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
