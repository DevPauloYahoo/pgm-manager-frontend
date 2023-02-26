import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs';

import { CustomAsynchronousValidationService } from '../../../utils/custom-asynchronous- validation.service';
import { CustomSynchronousValidationsClass } from '../../../utils/custom-synchronous-validations.class';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import {
  TypeVisitor,
  TypeVisitToVisitor,
} from '../../../visitors/types/visitor.type';
import { VisitsService } from '../../services/visits.service';
import { TypeVisitByVisitorResponse } from '../../types/visit.type';

@Component({
  selector: 'pgm-visit-form-modal',
  templateUrl: './visit-form-modal.component.html',
  styleUrls: ['./visit-form-modal.component.css'],
})
export class VisitFormModalComponent {
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];

  // create empty form
  formVisit: FormGroup = this.formBuilder.group({
    visit: this.formBuilder.group(
      {
        badge: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
            CustomSynchronousValidationsClass.isValidBadge(),
          ],
        ],
        secretary: ['', [Validators.required]],
      },
      {
        asyncValidators: [this.asynchronousValidationService.isBadgeExists()],
      }
    ),
  });

  constructor(
    public dialogRef: MatDialogRef<VisitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeVisitor,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private visitsService: VisitsService,
    private validationErrorsService: ValidationErrorsService,
    private asynchronousValidationService: CustomAsynchronousValidationService
  ) {}

  get visit() {
    return this.formVisit?.get('visit');
  }

  get badge() {
    return this.visit?.get('badge');
  }

  get secretary() {
    return this.visit?.get('secretary');
  }

  onConfirm() {
    const { badge, secretary } = this.formVisit?.get('visit')?.getRawValue();
    const visitorId = this.data.id;

    const data: TypeVisitToVisitor = {
      visitorId,
      badge,
      secretary,
    };

    this.validIfActiveVisit(data);
  }

  validIfActiveVisit(data: TypeVisitToVisitor) {
    this.visitsService
      .getVisitByVisitorId(data.visitorId as string)
      .pipe(
        tap((value: TypeVisitByVisitorResponse) => {
          if (!value.status) {
            this.dialogRef.close(data);
          } else {
            alert(
              `Visitante ${value.visitorName?.toUpperCase()} com atendimento ativo na secretaria ${
                value.secretaryName
              } usando o crachá ${value.badgeNumber}`
            );
          }
        })
      )
      .pipe(take(1))
      .subscribe({
        error: error => {
          console.log('Error ao validar visita para visitante');
        },
      });
  }

  showErrorMessage(fieldName: string, fieldTranslation: string) {
    return this.validationErrorsService.showMessages(
      fieldName,
      fieldTranslation,
      this.formVisit
    );
  }
}
