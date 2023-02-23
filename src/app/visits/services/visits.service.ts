import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VisitModel } from '../model/visit.model';
import { TypePageableVisit, TypeResponseVisit } from '../types/visit.type';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVisits({ search, status, page, limit }: TypePageableVisit) {
    const params = new HttpParams()
      .set('search', search || '')
      .set('status', status || '')
      .set('page', page)
      .set('limit', limit);

    return this.http.get<TypeResponseVisit<VisitModel>>(
      `${this.BASE_URL}/visits`,
      { params }
    );
  }

  getBadgeSecretary(
    badge: string | null | undefined,
    secretary: string | null | undefined
  ) {
    const params = new HttpParams()
      .set('badge', badge || '')
      .set('secretary', secretary || '');

    return this.http.get(`${this.BASE_URL}/visits/badge_exists`, { params });
  }

  updateStatusVisits(visitId: string | null | undefined) {
    return this.http.patch(`${this.BASE_URL}/visits/${visitId}`, {});
  }
}