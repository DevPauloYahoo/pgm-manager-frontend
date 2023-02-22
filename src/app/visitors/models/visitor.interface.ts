export interface Visitor {
  id: string;
  name: string | null | undefined;
  document: string | null | undefined;
  visit: object;
}
