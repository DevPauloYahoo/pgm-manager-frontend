import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastMessageComponent } from './toast-message/toast-message.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ToastMessageComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, ToastMessageComponent],
})
export class ComponentsModule {}
