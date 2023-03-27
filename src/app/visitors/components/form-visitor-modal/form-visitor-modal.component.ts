import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';

import { ModalMessagesService } from '../../../core/services/modal-messages.service';
import { badges } from '../../../utils/badges';
import { CustomAsynchronousValidationService } from '../../../utils/custom-asynchronous- validation.service';
import { CustomSynchronousValidationsClass } from '../../../utils/custom-synchronous-validations.class';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import { TypeVisitor } from '../../../visitors/types/visitor.type';
import { VisitsService } from '../../../visits/services/visits.service';
import { FormVisitorModalService } from '../../services/form-visitor-modal.service';

declare let window: any;

@Component({
  selector: 'pgm-form-visitor-modal',
  templateUrl: './form-visitor-modal.component.html',
  styleUrls: ['./form-visitor-modal.component.css'],
})
export class FormVisitorModalComponent implements OnInit, OnDestroy {
  // variables of Form Visit Modal
  formVisitorModal: any;
  unsubscriptionModal$?: Subscription;
  unsubscriptionVisitor$?: Subscription;

  visitStatus = false;
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  originalBadges: string[] = badges;
  availableBadges: string[] = [];

  // create empty form
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
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly visitsService: VisitsService,
    private readonly formVisitorModalService: FormVisitorModalService,
    private readonly modalMessageService: ModalMessagesService,
    private readonly validationErrorsService: ValidationErrorsService,
    private readonly asynchronousValidationService: CustomAsynchronousValidationService
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

  ngOnInit(): void {
    this.availableBadges = this.originalBadges;
    // create instance Form Visit Modal
    this.formVisitorModal = new window.bootstrap.Modal(
      document.getElementById('formVisitorModal')
    );

    this.unsubscriptionModal$ = this.formVisitorModalService
      .getShowVisitorModal()
      .pipe(tap(() => this.formVisitorModal.show()))
      .subscribe();
  }

  onConfirm() {
    if (!this.visitStatus) {
      const { visitor } = this.formVisitor.getRawValue();
      this.formVisitorModalService.setSaveNewVisitor(visitor);
      this.formVisitorModal.hide();
    } else {
      const { visitor, visit } = this.formVisitor.getRawValue();

      const data: TypeVisitor = {
        ...visitor,
        visit: {
          ...visit,
        },
      };

      this.formVisitorModalService.setSaveNewVisitor(data);
      this.formVisitorModal.hide();
    }
  }

  onSelectVisitStatus() {
    this.visitStatus = !this.visitStatus;
  }

  // displays formVisit validation error messages
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

  ngOnDestroy() {
    this.unsubscriptionModal$?.unsubscribe();
    this.unsubscriptionVisitor$?.unsubscribe();
  }
}
