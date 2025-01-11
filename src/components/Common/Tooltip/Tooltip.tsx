import clsx from 'clsx';
import styles from './Tooltip.module.scss';
import { ReactNode } from 'react';
import { TooltipPosition } from '@/components/Common/Tooltip/types.tsx';

export type TooltipProps = {
	text: string;
	position?: TooltipPosition;
	isError?: boolean;
	isOpened?: boolean;
	children: ReactNode;
};

export function Tooltip({
	text,
	position = TooltipPosition.Bottom,
	isError,
	isOpened,
	children,
}: TooltipProps) {
	return (
		<div
			className={clsx(styles.tooltip, styles[position], {
				[styles.error]: isError,
				[styles.opened]: isOpened,
			})}
			data-text={text}
			data-testid="Tooltip"
		>
			{children}
		</div>
	);
}
