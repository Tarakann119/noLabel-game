import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';

import { TPagination } from './Pagination.typing';

import './index.scss';

export const Pagination: FC<TPagination> = ({ className, pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      breakLabel='...'
      previousLabel=''
      nextLabel=''
      renderOnZeroPageCount={null}
      className={classNames('pagination', className)}
      pageClassName='pagination__item'
      previousClassName='pagination__item'
      nextClassName='pagination__item'
      activeClassName='pagination__item_active'
      breakClassName='pagination__break-item'
      breakLinkClassName='pagination__break-link'
      disabledClassName='pagination__item_disabled'
      activeLinkClassName='pagination__link_active'
      disabledLinkClassName='pagination__link_disabled'
      pageLinkClassName='pagination__link button button_outline'
      previousLinkClassName='pagination_link pagination__link_prev button button_outline'
      nextLinkClassName='pagination_link pagination__link_next button button_outline'
    />
  );
};
