import { useState } from 'react';
import img from './icon-question-white.svg';
import style from './style.module.scss';
import { Title } from '@/components/Core/Typography';
import { Tooltip } from '../../Tooltip/Tooltip';
import { TooltipPosition } from '../../Tooltip/types';
import { ProfileStatusProps, StatusProfile } from './type';

export const ProfileStatus = ({
	status,
	children,
	tooltipText,
}: ProfileStatusProps) => {
	const [isTooltipOpen, setTooltipOpen] = useState(false);

	const getStyleStatus = () => {
		switch (status) {
			case StatusProfile.NEW:
				return style.statusNew;
			case StatusProfile.CONFIRMED:
				return style.statusConfirmed;
			case StatusProfile.PROCESSING:
				return style.statusProcessing;
			default:
				return style.statusNew;
		}
	};

	const handleTooltipOpen = () => {
		setTooltipOpen(!isTooltipOpen);
	};

	const styleStatus = getStyleStatus();

	return (
		<>
			<div className={style.buttonWrapper}>
				<Title Tag={'h5'} className={style.profileStatus}>
					Статус профиля
				</Title>
				<button className={`${style.button} ${styleStatus}`}>
					<p className={`${style.buttonText}`}>{children}</p>
					<Tooltip
						position={TooltipPosition.TopRight}
						isOpened={isTooltipOpen}
						text={tooltipText || ''}
					>
						<img
							className={`${style.buttonImg}`}
							src={img}
							alt="значок вопроса"
							onClick={handleTooltipOpen}
						/>
					</Tooltip>
				</button>
			</div>
		</>
	);
};
