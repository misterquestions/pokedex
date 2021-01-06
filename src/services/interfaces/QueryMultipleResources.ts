import QueryResource from './QueryResource';

export default interface QueryMultipleResources {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<QueryResource>;
}
