import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Visitor } from '../models/visitor.interface';
import {
  TypePageableVisitor,
  TypeResponseVisitor,
  TypeVisitor,
  TypeVisitToVisitor,
} from '../types/visitor.type';

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVisitors({
    search,
    page,
    limit,
  }: TypePageableVisitor): Observable<TypeResponseVisitor<Visitor>> {
    const params = new HttpParams()
      .set('search', search || '')
      .set('page', page)
      .set('limit', limit);

    return this.http.get<TypeResponseVisitor<Visitor>>(
      `${this.BASE_URL}/visitors`,
      { params }
    );
  }

  createVisitor(data: TypeVisitor): Observable<Visitor> {
    return this.http.post<Visitor>(`${this.BASE_URL}/visitors`, data);
  }

  createVisitToVisitor({ visitorId, badge, secretary }: TypeVisitToVisitor) {
    console.log('Data', visitorId);
    return this.http.post(`${this.BASE_URL}/visits/${visitorId}`, {
      badge,
      secretary,
    });
  }

  getById(visitorId: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.BASE_URL}/visitors/${visitorId}`);
  }
}
