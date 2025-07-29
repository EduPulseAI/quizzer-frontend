/**
 * [page-list]
 * Tue Jul 29 2025
 */
export interface PageList<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
}
