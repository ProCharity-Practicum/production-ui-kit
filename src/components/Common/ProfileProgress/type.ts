import { StatusProfile } from './ProfileStatus/type';

export interface ProfileProgressProps {
	status: StatusProfile;
	statusText: string;
	progressValue: number;
	tooltipText?: {
		statusText: string;
		progressText: string;
	};
}
