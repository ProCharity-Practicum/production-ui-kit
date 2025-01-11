import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

type crumbType = {
	label: string;
	url: string;
};

export type BreadcrumbsProps = {
	crumbs: crumbType[];
};

export function BreadCrumbs({ crumbs }: BreadcrumbsProps) {
	const renderCrumb = (crumb: crumbType, index: number, length: number) => (
		<React.Fragment key={crumb.label}>
			<li className={crumb.url ? styles.crumbSection : styles.crumbCurrent}>
				{crumb.url ? (
					<Anchor href={crumb.url} className={styles.crumbLink}>
						{crumb.label}
					</Anchor>
				) : (
					crumb.label
				)}
			</li>
			{index < length - 1 && <span className={styles.crumbSeparator}></span>}
		</React.Fragment>
	);

	return (
		<ul className={styles.breadCrumbs} data-testid="Breadcrumbs">
			{crumbs.length > 0 &&
				crumbs.map((crumb, index) => renderCrumb(crumb, index, crumbs.length))}
		</ul>
	);
}
