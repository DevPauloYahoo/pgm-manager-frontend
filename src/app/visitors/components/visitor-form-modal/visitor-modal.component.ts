import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';

import { CustomValidations } from '../../../utils/custom-validations';
import { VisitsService } from '../../../visits/services/visits.service';
import { VisitorsService } from '../../services/visitors.service';
import { TypeVisitor } from '../../types/visitor.type';

@Component({
  selector: 'pgm-visitor-form-modal',
  templateUrl: './visitor-modal.component.html',
  styleUrls: ['./visitor-modal.component.css'],
})
export class VisitorModalComponent {
  visitStatus = false;
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];

  // Cria formulário vazio
  formVisitor = this.formBuilder.group({
    visitor: this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          CustomValidations.isValidCpf(),
        ],
      ],
    }),
    visit: this.formBuilder.group({
      badge: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          CustomValidations.isValidBadge(),
        ],
      ],
      secretary: ['', [Validators.required]],
    }),
  });

  constructor(
    public dialogRef: MatDialogRef<VisitorModalComponent>,
    private visitorsService: VisitorsService,
    private visitsService: VisitsService,
    private formBuilder: FormBuilder
  ) {}

  get visitor() {
    return this.formVisitor.controls.visitor;
  }

  get visit() {
    return this.formVisitor.controls.visit;
  }

  get name() {
    return this.visitor.controls.name;
  }

  get document() {
    return this.visitor.controls.document;
  }

  get badge() {
    return this.visit.controls.badge;
  }

  get secretary() {
    return this.visit.controls.secretary;
  }

  onConfirm() {
    const { visitor } = this.formVisitor.value;
    const cpf = visitor?.document;
    // valida se o CPF informado já está cadastrado
    this.visitorsService
      .getByCPF(cpf)
      .pipe(
        tap(isExistsCPF => {
          if (isExistsCPF) {
            alert('CPF EXISTE');
          } else {
            if (!this.visitStatus) {
              const { visitor } = this.formVisitor.value;
              this.dialogRef.close(visitor);
            } else {
              const { visitor, visit } = this.formVisitor.value;

              // valida de o crachá já está em uso na secretaria informada
              this.visitsService
                .getBadgeSecretary(visit?.badge, visit?.secretary)
                .pipe(
                  tap(isBadgeExists => {
                    if (isBadgeExists) {
                      alert('BADGE EXISTE');
                    } else {
                      const data: TypeVisitor = {
                        ...visitor,
                        visit: {
                          ...visit,
                        },
                      };

                      this.dialogRef.close(data);
                    }
                  })
                )
                .subscribe();
            }
          }
        })
      )
      .subscribe();
  }

  onSelectVisitStatus() {
    this.visitStatus = !this.visitStatus;
  }

  // fields validation the of formVisitor
  showErrorMessage(fieldName: string, fieldTranslation: string) {
    const visitorField = this.visitor.get(fieldName);
    const visitField = this.visit.get(fieldName);

    // fields validation Visitor
    if (visitorField?.hasError('required')) {
      return `${fieldTranslation} é obrigátório`;
    }

    if (visitorField?.hasError('minlength')) {
      const requiredLength = visitorField?.errors
        ? visitorField.errors['minlength']['requiredLength']
        : 6;

      return `${fieldTranslation} deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (visitorField?.hasError('cpfNotValid')) {
      return `CPF ( ${this.document.value} ) inválido`;
    }

    // validation fields Visit
    if (visitField?.hasError('required')) {
      return `${fieldTranslation} é obrigátório`;
    }

    if (visitField?.hasError('badgeNotValid')) {
      return `${fieldTranslation} inválido`;
    }

    if (visitField?.hasError('minlength')) {
      const requiredLength = visitField?.errors
        ? visitField.errors['minlength']['requiredLength']
        : 2;

      return `${fieldTranslation} deve ter no mínimo ${requiredLength} caracteres.
              (ex: 01...)`;
    }

    if (visitField?.hasError('maxlength')) {
      const requiredLength = visitField?.errors
        ? visitField.errors['maxlength']['requiredLength']
        : 2;

      return `${fieldTranslation} deve ter no mínimo ${requiredLength} caracteres.
              (ex: 01...)`;
    }

    return `Campo inválido`;
  }
}
