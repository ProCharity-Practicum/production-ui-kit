import { ProfileStatus } from './ProfileStatus/ProfileStatus';
import { ProgressBar } from './ProgressBar/ProgressBar';
import styles from './style.module.scss';
import { ProfileProgressProps } from './type';

export const ProfileProgress = ({
	status,
	statusText,
	progressValue,
	tooltipText,
}: ProfileProgressProps) => {
	return (
		<div className={styles.profileProgress}>
			<ProfileStatus status={status} tooltipText={tooltipText?.statusText}>
				{statusText}
			</ProfileStatus>
			<ProgressBar
				value={progressValue}
				tooltipText={tooltipText?.progressText}
			/>
		</div>
	);
};
