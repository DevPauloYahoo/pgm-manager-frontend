import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { CustomValidations } from '../../../utils/custom-validations';
import { TypeVisitor } from '../../../visitors/types/visitor.type';

@Component({
  selector: 'pgm-visit-form-modal',
  templateUrl: './visit-form-modal.component.html',
  styleUrls: ['./visit-form-modal.component.css'],
})
export class VisitFormModalComponent {
  secretaries = ['PGM', 'SEMSUR', 'SEMUR', 'SEMTHAS'];
  visitor: TypeVisitor = {
    id: '',
    name: '',
    document: '',
  };

  // create empty form
  formVisit = this.formBuilder.group({
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
  });

  constructor(
    public dialogRef: MatDialogRef<VisitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeVisitor,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  get badge() {
    return this.formVisit.controls.badge;
  }

  get secretary() {
    return this.formVisit.controls.secretary;
  }

  ngOnInit() {
    this.visitor = this.route.snapshot.data['visitor'];
    console.log(this.visitor);
  }

  onConfirm() {
    const { badge, secretary } = this.formVisit.value;

    const data: object = {
      visitorId: this.data.id,
      badge,
      secretary,
    };
    this.dialogRef.close(data);
  }

  // fields validation the of formVisit
  showErrorMessage(fieldName: string, fieldTranslation: string) {
    const visitField = this.formVisit.get(fieldName);

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
