import { Visitor } from '../models/visitor.interface';

export type TypeVisitor = Partial<Visitor>;

export type TypeVisitToVisitor = {
  visitorId?: string;
  badge: string;
  secretary: string;
};

export type TypeResponseVisitor<T> = {
  content: Content<T>;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};

export type Content<T> = Array<T>;

export type TypePageableVisitor = {
  search?: string;
  page: number;
  limit: number;
};

export type TypeIsExistsCPF =
  | {
      document: string;
    }
  | TypeErrorResponse
  | null;

type TypeErrorResponse = {
  message: string;
};
