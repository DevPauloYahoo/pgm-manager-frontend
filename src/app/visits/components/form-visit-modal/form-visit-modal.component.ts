import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';

import { ModalMessagesService } from '../../../core/services/modal-messages.service';
import { badges } from '../../../utils/badges';
import { ValidationErrorsService } from '../../../utils/validation-errors.service';
import { VisitorsService } from '../../../visitors/services/visitors.service';
import {
  TypeVisitor,
  TypeVisitToVisitor,
} from '../../../visitors/types/visitor.type';
import { FormVisitModalService } from '../../services/form-visit-modal.service';
import { VisitsService } from '../../services/visits.service';

declare let window: any;

@Component({
  selector: 'pgm-form-visit-modal',
  templateUrl: './form-visit-modal.component.html',
  styleUrls: ['./form-visit-modal.component.css'],
})
export class FormVisitModalComponent implements OnInit, OnDestroy {
  // variables of Form Visit Modal
  formVisitModal: any;
  visitorData!: TypeVisitor;
  unsubscriptionModal$?: Subscription;
  unsubscriptionVisitor$?: Subscription;

  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  originalBadges: string[] = badges;
  availableBadges: string[] = [];

  // create empty form
  formVisit: FormGroup = this.formBuilder.group({
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
    private readonly renderer: Renderer2,
    public readonly swalTargets: SwalPortalTargets,
    private readonly visitsService: VisitsService,
    private readonly visitorsService: VisitorsService,
    private readonly formModalService: FormVisitModalService,
    private readonly modalMessageService: ModalMessagesService,
    private readonly validationErrorsService: ValidationErrorsService
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
    // create instance Form Visit Modal
    this.formVisitModal = new window.bootstrap.Modal(
      document.getElementById('formVisitModal')
    );

    this.unsubscriptionModal$ = this.formModalService
      .getShowVisitModal()
      .pipe(tap(() => this.formVisitModal.show()))
      .subscribe();

    this.unsubscriptionVisitor$ = this.formModalService
      .getVisitData()
      .pipe(
        tap(visitor => {
          this.visitorData = visitor;
        })
      )
      .subscribe();
  }

  onConfirm() {
    const { badge, secretary } = this.formVisit?.get('visit')?.getRawValue();
    const visitorId = this.visitorData.id;

    const data: TypeVisitToVisitor = {
      visitorId,
      badge,
      secretary,
    };

    this.formModalService.setSaveNewVisit(data);
    this.formVisitModal.hide();
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

  ngOnDestroy() {
    this.unsubscriptionModal$?.unsubscribe();
    this.unsubscriptionVisitor$?.unsubscribe();
  }
}
