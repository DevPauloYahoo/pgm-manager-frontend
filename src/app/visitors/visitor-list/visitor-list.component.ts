import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, take, tap } from 'rxjs';

import { CustomValidations } from '../../utils/custom-validations';
import { Visitor } from '../models/visitor.interface';
import { VisitorsService } from '../services/visitors.service';
import {
  TypeDataPagination,
  TypeVisitor,
  TypeVisitorPaginator,
} from '../types/visitor.type';

@Component({
  selector: 'pgm-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitors$: Observable<TypeVisitorPaginator<Visitor>> = new Observable();
  dataPagination: TypeDataPagination = {
    limit: 0,
    page: 0,
  };

  // Cria formulário vazio
  formVisitor = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(6)]],
    document: [
      '',
      [
        Validators.required,
        Validators.minLength(11),
        CustomValidations.isValidCpf(),
      ],
    ],
  });

  constructor(
    private visitorsService: VisitorsService,
    private formBuilder: FormBuilder
  ) {}

  get name() {
    return this.formVisitor.controls.name;
  }

  get document() {
    return this.formVisitor.controls.document;
  }

  ngOnInit(): void {
    this.getVisitors(this.dataPagination);
  }

  onChangePage(event: Event | any) {
    this.dataPagination.page = event;
    this.getVisitors(this.dataPagination);
  }

  onTableSizeChange(event: Event | any) {
    this.dataPagination.limit = event.target.value;
    this.dataPagination.page = 1;
    this.getVisitors(this.dataPagination);
  }

  onSubmit() {
    const { name, document } = this.formVisitor.value;
    this.createVisitor({ name, document });
    this.onCancel();
  }

  onCancel() {
    this.formVisitor.reset();
  }

  // valida os campos do formVisitor
  getErrorMessage(fieldName: string) {
    const fieldVisitor = this.formVisitor.get(fieldName);

    if (fieldVisitor?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (fieldVisitor?.hasError('minlength')) {
      const requiredLength = fieldVisitor?.errors
        ? fieldVisitor.errors['minlength']['requiredLength']
        : 6;

      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if (fieldVisitor?.hasError('cpfNotValid')) {
      return `CPF ( ${this.document.value} ) inválido`;
    }

    return 'Campo inválido';
  }

  // private methods
  private getVisitors(dataPagination: TypeDataPagination) {
    this.visitors$ = this.visitorsService.getVisitors(dataPagination);
  }

  private createVisitor(data: TypeVisitor) {
    this.visitorsService
      .createVisitor(data)
      .pipe(tap(() => this.getVisitors(this.dataPagination)))
      .pipe(take(1))
      .subscribe();
  }
}
