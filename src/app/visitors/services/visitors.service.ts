import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Visitor } from '../models/visitor.interface';
import {
  TypeDataPagination,
  TypeVisitor,
  TypeVisitorPaginator,
} from '../types/visitor.type';

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVisitors({ search, page, limit }: TypeDataPagination) {
    const params = new HttpParams()
      .set('search', search || '')
      .set('page', page)
      .set('limit', limit);

    return this.http.get<TypeVisitorPaginator<Visitor>>(
      `${this.BASE_URL}/visitors`,
      { params }
    );
  }

  createVisitor(visitor: TypeVisitor) {
    return this.http.post(`${this.BASE_URL}/visitors`, visitor);
  }
}
