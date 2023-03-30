import { TypeVisitor } from '../../visitors/types/visitor.type';

export interface VisitModel {
  id: string;
  badge: string;
  status: boolean;
  secretary: string;
  created_at: string;
  updated_at: string;
  duration: number;
  visitor: TypeVisitor;
}
