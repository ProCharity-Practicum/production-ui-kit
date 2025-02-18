import React from 'react';
import styles from '../Calendar.module.scss';

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => (
	<div className={styles.row} role="row">
		{children}
	</div>
);
