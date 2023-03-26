import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';

import { ModalMessagesService } from '../../../core/services/modal-messages.service';
import { badges } from '../../../utils/badges';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import { VisitorsService } from '../../../visitors/services/visitors.service';
import {
  TypeVisitor,
  TypeVisitToVisitor,
} from '../../../visitors/types/visitor.type';
import { VisitsService } from '../../services/visits.service';

@Component({
  selector: 'pgm-visit-form-visitor-modal',
  templateUrl: './visit-form-modal.component.html',
  styleUrls: ['./visit-form-modal.component.css'],
})
export class VisitFormModalComponent implements OnInit {
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  originalBadges: string[] = badges;
  availableBadges: string[] = [];

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
            // CustomSynchronousValidationsClass.isValidBadge(),
          ],
        ],
        secretary: ['', [Validators.required]],
      }
      // {
      //   asyncValidators: [this.asynchronousValidationService.isBadgeExists()],
      // }
    ),
  });

  constructor(
    public dialogRef: MatDialogRef<VisitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeVisitor,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private visitsService: VisitsService,
    private visitorsService: VisitorsService,
    private readonly modalService: ModalMessagesService,
    private validationErrorsService: ValidationErrorsService
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
    this.availableBadges = this.originalBadges;
  }

  onConfirm() {
    const { badge, secretary } = this.formVisit?.get('visit')?.getRawValue();
    const visitorId = this.data.id;

    const data: TypeVisitToVisitor = {
      visitorId,
      badge,
      secretary,
    };
    this.dialogRef.close(data);
  }

  // displays formVisit validation error messages
  showErrorMessage(fieldName: string, fieldTranslation: string) {
    return this.validationErrorsService.showMessages(
      fieldName,
      fieldTranslation,
      this.formVisit
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
      .pipe(
        catchError(err => {
          alert(
            JSON.stringify({ status: err.status, message: err.error.message })
          );
          return EMPTY;
        })
      )
      .subscribe();
  }
}
