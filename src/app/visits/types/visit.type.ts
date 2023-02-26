import { VisitModel } from '../model/visit.model';

export type TypeVisit = Partial<VisitModel>;

export type TypeResponseVisit<T> = {
  content: Content<T>;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};

export type Content<T> = Array<T>;

export type TypePageableVisit = {
  search?: string;
  status?: string | boolean;
  page: number;
  limit: number;
};

// types responses
export type TypeVisitByVisitorResponse = {
  status: boolean;
  visitorName?: string;
  secretaryName?: string;
  badgeNumber?: string;
};

export type TypeVisitByBadgeResponse = {
  statusVisit: boolean;
};
