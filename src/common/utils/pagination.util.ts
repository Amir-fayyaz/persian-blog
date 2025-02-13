import { Pagination } from '../types/pagination.type';

export const PaginationTool = (pagination: Pagination) => {
  const { page, take } = pagination;

  const skip = (page - 1) * take;

  return {
    skip,
    take,
  };
};
