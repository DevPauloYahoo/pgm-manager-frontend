import { Visitor } from '../models/visitor.interface';

export type TypeVisitor = Omit<Visitor, 'id' | 'visits'>;

export type TypeVisitorPaginator<T> = {
  content: Content<T>;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
};

export type Content<T> = Array<T>;

export type TypeDataPagination = {
  search?: string;
  page: number;
  limit: number;
};
