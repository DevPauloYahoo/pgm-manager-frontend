import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VisitModel } from '../model/visit.model';
import {
  TypePageableVisit,
  TypeResponseVisit,
  TypeVisitByBadgeResponse,
  TypeVisitByVisitorResponse,
} from '../types/visit.type';

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

  getBadgeSecretary(badge: string, secretary: string) {
    const params = new HttpParams()
      .set('badge', badge || '')
      .set('secretary', secretary || '');

    return this.http.get<TypeVisitByBadgeResponse>(
      `${this.BASE_URL}/visits/badge_exists`,
      {
        params,
      }
    );
  }

  getVisitByVisitorId(
    visitorId: string
  ): Observable<TypeVisitByVisitorResponse> {
    return this.http.get<TypeVisitByVisitorResponse>(
      `${this.BASE_URL}/visits/by_visitor/${visitorId}`
    );
  }

  updateStatusVisits(visitId: string) {
    return this.http.patch(`${this.BASE_URL}/visits/${visitId}`, {});
  }
}
