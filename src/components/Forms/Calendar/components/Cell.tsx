import React from 'react';
import styles from '../Calendar.module.scss';
import { ICellProps } from '../types';

export const Cell: React.FC<ICellProps> = ({
	children,
	disabled,
	selected,
	ariaLabel,
	tabindex = -1,
}) => (
	<div
		role="gridcell"
		aria-disabled={disabled}
		aria-selected={selected}
		aria-label={ariaLabel}
		tabIndex={tabindex}
		className={styles.cell}
	>
		{children}
	</div>
);
