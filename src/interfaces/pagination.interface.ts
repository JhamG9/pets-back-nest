export interface Pagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPage: number;
    next?: string;
    previous?: string;
  }