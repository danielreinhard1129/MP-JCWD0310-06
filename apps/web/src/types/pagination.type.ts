export interface IPaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationMeta {
  page: number;
  take: number;
  total: number;
}