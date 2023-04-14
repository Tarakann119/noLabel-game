export type tpagination = {
  className?: string;
  pageCount: number;
  handlePageClick: (selecteditem: { selected: number }) => void;
};
