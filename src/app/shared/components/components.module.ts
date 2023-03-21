import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

const COMPONENTS = [
  NavbarComponent,
  FooterComponent,
  ConfirmationModalComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [COMPONENTS],
})
export class ComponentsModule {}
