import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs';

import { CustomAsynchronousValidationService } from '../../../utils/custom-asynchronous- validation.service';
import { CustomSynchronousValidationsClass } from '../../../utils/custom-synchronous-validations.class';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import { VisitorsService } from '../../../visitors/services/visitors.service';
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
export class VisitFormModalComponent implements OnInit {
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  originalBadges: string[] = [];
  usedBadges: string[] = [];

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
    private visitorsService: VisitorsService,
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

  ngOnInit(): void {
    this.visitorsService.getUsedBadges().subscribe({
      next: value => {
        this.usedBadges = value;
      },
    });

    console.log('USED BADGE', this.usedBadges);
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

  // validates if the visitor has an active visit
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
        error: () => {
          console.log('Error ao validar visita para visitante');
        },
      });
  }

  // displays formVisit validation error messages
  showErrorMessage(fieldName: string, fieldTranslation: string) {
    return this.validationErrorsService.showMessages(
      fieldName,
      fieldTranslation,
      this.formVisit
    );
  }

  getBadges() {
    this.originalBadges = ['01', '02', '03', '04', '05', '06'];
    console.log('USED BADEGS NO GET', this.usedBadges);
    // this.usedBadges.forEach(value =>
    //   this.originalBadges.filter(badge => badge === value)
    // );
    return this.originalBadges;
  }
}
