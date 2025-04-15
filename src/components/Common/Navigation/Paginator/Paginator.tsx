import styles from './Paginator.module.scss';
import { Icon } from '@/components/Core/Icon/Icon';
import { useMemo } from 'react';

export type PaginatorProps = {
	current: number;
	total: number;
	onChangePage: (page: number) => void;
	maxPages?: number;
};

function calculateVisiblePages(
	current: number,
	total: number,
	maxPages: number
) {
	if (total <= maxPages) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}

	let startPage = Math.max(1, current - Math.floor(maxPages / 2));
	let endPage = Math.min(total, startPage + maxPages - 1);

	if (startPage === 1) {
		endPage = maxPages;
	}

	if (endPage === total) {
		startPage = total - maxPages + 1;
	}

	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i
	);
}

export function Paginator({
	current,
	total,
	onChangePage,
	maxPages = 5,
}: PaginatorProps) {
	const visiblePages = useMemo(
		() => calculateVisiblePages(current, total, maxPages),
		[current, total, maxPages]
	);

	return (
		<div className={styles.paginator} data-testid="Paginator">
			{current > 1 && (
				<button
					onClick={() => onChangePage(current - 1)}
					className={styles.arrow}
					data-testid="arrowLeftButton"
				>
					<Icon name="chevronLeft" size={24} />
				</button>
			)}

			{visiblePages.map((page) => (
				<button
					key={page}
					onClick={() => onChangePage(page)}
					className={`${styles.page} ${page === current ? styles.current : ''}`}
					aria-current={page === current ? 'page' : undefined}
					data-testid={page === current ? 'currentPageButton' : 'pageButton'}
				>
					{page}
				</button>
			))}

			{current < total && (
				<button
					onClick={() => onChangePage(current + 1)}
					className={styles.arrow}
					data-testid="arrowRightButton"
				>
					<Icon name="chevronRight" size={24} />
				</button>
			)}
		</div>
	);
}
