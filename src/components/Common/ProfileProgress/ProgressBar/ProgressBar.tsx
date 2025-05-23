import { useState } from 'react';
import img from './icon-question-dark-grey.svg';
import { Tooltip } from '../../Tooltip/Tooltip.tsx';
import { TooltipPosition } from '../../Tooltip/types.tsx';
import styles from './style.module.scss';
import { ProgressBarProps } from './type.ts';

export const ProgressBar = ({ value, tooltipText }: ProgressBarProps) => {
	const optimizedValue = Math.min(Math.max(value, 0), 100);
	const [isTooltipOpen, setTooltipOpen] = useState(false);

	const handleTooltipOpen = () => {
		setTooltipOpen(!isTooltipOpen);
	};

	return (
		<div data-testid="progress-bar-container" className={styles.progressBar}>
			<progress data-testid="progress-bar" max={100} value={optimizedValue} />
			<div data-testid="progress-value" className={styles.progressValue}>
				Заполнен на {optimizedValue}%
				<Tooltip
					position={TooltipPosition.Bottom}
					isOpened={isTooltipOpen}
					text={tooltipText || ''}
				>
					<img
						data-testid="progress-img"
						src={img}
						className={styles.progressImg}
						alt="Значок вопроса"
						onClick={handleTooltipOpen}
					/>
				</Tooltip>
			</div>
			<div
				data-testid="progress-indicator"
				className={styles.progressIndicator}
				style={{ width: `${optimizedValue}%` }}
			/>
		</div>
	);
};
