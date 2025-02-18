import React from 'react';
import styles from '../Calendar.module.scss';

export const RowGroup: React.FC<React.PropsWithChildren> = ({ children }) => (
	<div className={styles['row-group']} role="rowgroup">
		{children}
	</div>
);
