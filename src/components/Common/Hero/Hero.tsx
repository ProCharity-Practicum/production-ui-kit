import clsx from 'clsx';
import React from 'react';
import styles from './Hero.module.scss';

export type HeroProps = {
	children?: React.ReactNode;
};

export function Hero({ children }: HeroProps) {
	return (
		<section className={clsx(styles.containerHero)} data-testid="Hero">
			<div className={clsx(styles.contentHero)}>{children}</div>
		</section>
	);
}
