import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { VisitorsService } from '../visitors/services/visitors.service';
import { VisitsService } from '../visits/services/visits.service';

@Injectable({
  providedIn: 'root',
})
export class CustomAsynchronousValidationService {
  constructor(
    private visitorsService: VisitorsService,
    private visitsService: VisitsService
  ) {}

  isCpfExists(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap((cpf: string) => this.visitorsService.getByCPF(cpf)))
        .pipe(
          map(isExists => {
            return isExists ? { isCpfExists: true } : null;
          })
        )
        .pipe(first());
    };
  }

  isBadgeExists(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const secretaryControl = control.get('secretary');
      const badgeControl = control.get('badge');
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(() =>
          this.visitsService.getBadgeSecretary(
            badgeControl?.value,
            secretaryControl?.value
          )
        ),
        map(isExists => {
          return isExists.statusVisit
            ? badgeControl?.setErrors({ isBadgeExists: true })
            : badgeControl?.setErrors(null);
        }),
        first()
      );
    };
  }
}
