import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
	currentPage: number;
	onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = React.memo(({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			containerClassName={styles.pagination}
			pageLinkClassName={styles.pageNum}
			previousLinkClassName={styles.pageNum}
			nextLinkClassName={styles.pageNum}
			activeLinkClassName={styles.active}
			breakLabel='...'
			nextLabel='>'
			onPageChange={event => {
				onChangePage(event.selected + 1)
			}}
			pageRangeDisplayed={3}
			pageCount={3}
			forcePage={currentPage - 1}
			previousLabel='<'
		/>
	)
})