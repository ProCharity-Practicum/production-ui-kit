import styles from './Paginator.module.scss';
import { Icon } from '@/components/Core/Icon/Icon';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type PaginatorProps = {
	current: number;
	total: number;
	getLink: (page: number) => string;
	maxPages?: number;
};

export function Paginator({
	current,
	total,
	getLink,
	maxPages = 5,
}: PaginatorProps) {
	const getPages = (current: number, total: number, maxPages: number) => {
		const startPage = Math.max(1, Math.ceil(current - maxPages / 2));
		const endPage = Math.min(total, startPage + maxPages - 1);
		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i
		);
	};

	const pages = getPages(current, total, maxPages);

	return (
		<div className={styles.paginator} data-testid="Paginator">
			{current > 1 && (
				<Anchor href={getLink(current - 1)} className={styles.arrow}>
					<Icon name="chevronLeft" size={24} />
				</Anchor>
			)}

			{pages.map((page) => (
				<Anchor
					key={page}
					href={getLink(page)}
					className={`${styles.page} ${page === current ? styles.current : ''}`}
				>
					{page}
				</Anchor>
			))}
			{current < total && (
				<Anchor href={getLink(current + 1)} className={styles.arrow}>
					<Icon name="chevronRight" size={24} />
				</Anchor>
			)}
		</div>
	);
}
