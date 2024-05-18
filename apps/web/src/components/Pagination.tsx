import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  total: number;
  take: number;
  onChangePage: ({ selected }: { selected: number }) => void;
}

const Pagination: FC<PaginationProps> = ({ onChangePage, total, take }) => {
  return (
    <ReactPaginate
      onPageChange={onChangePage}
      pageCount={Math.ceil(total / take)}
      nextLabel={'>'}
      previousLabel={'<'}
      pageRangeDisplayed={8}
      containerClassName="flex gap-8 w-fit m-4"
      pageLinkClassName="px-4 py-2 rounded-lg"
      activeLinkClassName="bg-slate-100/70 text-black rounded-md"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
