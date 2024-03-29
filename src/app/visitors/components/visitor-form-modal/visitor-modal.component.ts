import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { bounceIn } from 'ng-animate';
import { tap } from 'rxjs/operators';

import { badges } from '../../../utils/badges';
import { CustomAsynchronousValidationService } from '../../../utils/custom-asynchronous- validation.service';
import { CustomSynchronousValidationsClass } from '../../../utils/custom-synchronous-validations.class';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import { VisitsService } from '../../../visits/services/visits.service';
import { VisitorsService } from '../../services/visitors.service';
import { TypeVisitor } from '../../types/visitor.type';

@Component({
  selector: 'pgm-visitor-form-visitor-modal',
  templateUrl: './visitor-modal.component.html',
  styleUrls: ['./visitor-modal.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceIn))]),
  ],
})
export class VisitorModalComponent {
  bounce: any;
  visitStatus = false;
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  originalBadges: string[] = badges;
  availableBadges: string[] = [];

  // Cria formulário vazio
  formVisitor: FormGroup = this.formBuilder.group({
    visitor: this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          CustomSynchronousValidationsClass.isValidCpf(),
        ],
        [this.asynchronousValidationService.isCpfExists()],
      ],
    }),
    visit: this.formBuilder.group({
      badge: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      secretary: ['', [Validators.required]],
    }),
  });

  constructor(
    public dialogRef: MatDialogRef<VisitorModalComponent>,
    private visitorsService: VisitorsService,
    private visitsService: VisitsService,
    private asynchronousValidationService: CustomAsynchronousValidationService,
    private validationErrorsService: ValidationErrorsService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  get visitor() {
    return this.formVisitor.get('visitor');
  }

  get visit() {
    return this.formVisitor.get('visit');
  }

  get name() {
    return this.visitor?.get('name');
  }

  get document() {
    return this.visitor?.get('document');
  }

  get badge() {
    return this.visit?.get('badge');
  }

  get secretary() {
    return this.visit?.get('secretary');
  }

  onConfirm() {
    if (!this.visitStatus) {
      const { visitor } = this.formVisitor.getRawValue();
      this.dialogRef.close(visitor);
    } else {
      const { visitor, visit } = this.formVisitor.getRawValue();

      const data: TypeVisitor = {
        ...visitor,
        visit: {
          ...visit,
        },
      };

      this.dialogRef.close(data);
    }
  }

  onSelectVisitStatus() {
    this.visitStatus = !this.visitStatus;
  }

  // show messages errors if fields invalid data
  validationMessages(fieldName: string, fieldTranslation: string) {
    return this.validationErrorsService.showMessages(
      fieldName,
      fieldTranslation,
      this.formVisitor
    );
  }

  getBadges(secretary: string) {
    this.visitsService
      .getBadgesBySecretary(secretary)
      .pipe(
        tap((badges: string[]) => {
          this.availableBadges = this.originalBadges.filter(
            value => !badges.includes(value)
          );
        })
      )
      .subscribe();
  }
}
