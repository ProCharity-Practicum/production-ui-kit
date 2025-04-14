import styles from './Paginator.module.scss';
import { Icon } from '@/components/Core/Icon/Icon';
import { Anchor } from '@/components/Core/Anchor/Anchor';
import { useCallback, useMemo } from 'react';

export type PaginatorProps = {
	current: number;
	total: number;
	getLink: (page: number) => string;
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
	getLink,
	maxPages = 5,
}: PaginatorProps) {
	const visiblePages = useMemo(
		() => calculateVisiblePages(current, total, maxPages),
		[current, total, maxPages]
	);

	const memoizedGetLink = useCallback(getLink, [getLink]);

	return (
		<div className={styles.paginator} data-testid="Paginator">
			{current > 1 && (
				<Anchor
					href={memoizedGetLink(current - 1)}
					className={styles.arrow}
					data-testid="arrowLeftButton"
				>
					<Icon name="chevronLeft" size={24} />
				</Anchor>
			)}

			{visiblePages.map((page) => (
				<Anchor
					key={page}
					href={memoizedGetLink(page)}
					className={`${styles.page} ${page === current ? styles.current : ''}`}
					aria-current={page === current ? 'page' : undefined}
					data-testid={page === current ? 'currentPageButton' : 'pageButton'}
				>
					{page}
				</Anchor>
			))}

			{current < total && (
				<Anchor
					href={memoizedGetLink(current + 1)}
					className={styles.arrow}
					data-testid="arrowRightButton"
				>
					<Icon name="chevronRight" size={24} />
				</Anchor>
			)}
		</div>
	);
}
