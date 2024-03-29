import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const COMPONENTS = [
  NavbarComponent,
  FooterComponent,
  ConfirmationModalComponent,
];

@NgModule({
  declarations: [COMPONENTS, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [COMPONENTS, SidebarComponent],
})
export class ComponentsModule {}
