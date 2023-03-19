import { Component } from '@angular/core';

import { SpinnerLoadingService } from '../../services/spinner-loading.service';

@Component({
  selector: 'pgm-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.css'],
})
export class SpinnerLoadingComponent {
  constructor(readonly spinnerLoadingService: SpinnerLoadingService) {}
}
