export type TPaginationProps = {
  className?: string;
  pageCount: number;
  handlePageClick: (selecteditem: { selected: number }) => void;
};
