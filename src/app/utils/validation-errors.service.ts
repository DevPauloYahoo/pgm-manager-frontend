// fields validation the of formVisitor
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorsService {
  showMessages(
    fieldName: string,
    fieldTranslation: string,
    formGroup: FormGroup
  ) {
    const visitorField = formGroup.get('visitor')?.get(fieldName);
    const visitField = formGroup.get('visit')?.get(fieldName);

    // fields validation Visitor
    if (visitorField?.hasError('required')) {
      return `${fieldTranslation} é obrigatório`;
    }

    if (visitorField?.hasError('minlength')) {
      const requiredLength = visitorField?.errors
        ? visitorField.errors['minlength']['requiredLength']
        : 6;

      return `${fieldTranslation} deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (visitorField?.hasError('cpfNotValid')) {
      return `CPF inválido`;
    }

    if (visitorField?.hasError('isCpfExists')) {
      return `CPF  já cadastrado`;
    }

    // validation fields Visit
    if (visitField?.hasError('required')) {
      return `${fieldTranslation} é obrigatório`;
    }

    if (visitField?.hasError('badgeNotValid')) {
      return `${fieldTranslation} inválido`;
    }

    if (visitField?.hasError('isBadgeExists')) {
      return `${fieldTranslation} já está em uso`;
    }

    if (visitField?.hasError('minlength')) {
      const requiredLength = visitField?.errors
        ? visitField.errors['minlength']['requiredLength']
        : 2;

      return `${fieldTranslation} deve ter ${requiredLength} números.
              (ex: 01)`;
    }

    if (visitField?.hasError('maxlength')) {
      const requiredLength = visitField?.errors
        ? visitField.errors['maxlength']['requiredLength']
        : 2;

      return `${fieldTranslation} deve ter ${requiredLength} números.
              (ex: 01)`;
    }

    return `Campo inválido`;
  }
}
