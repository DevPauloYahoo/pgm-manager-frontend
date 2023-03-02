import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Visitor } from '../models/visitor.interface';
import {
  TypeIsExistsCPF,
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
  usedBadge: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  setUsedBadges(badges: string[]) {
    this.usedBadge.next(badges);
  }

  getUsedBadges() {
    return this.usedBadge.asObservable();
  }

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
    return this.http.post(`${this.BASE_URL}/visits/${visitorId}`, {
      badge,
      secretary,
    });
  }

  getById(visitorId: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.BASE_URL}/visitors/${visitorId}`);
  }

  getByCPF(cpf: string) {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.get<TypeIsExistsCPF>(
      `${this.BASE_URL}/visitors/document`,
      { params }
    );
  }
}
