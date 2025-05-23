export type ProfileStatusProps = {
	status: 'new' | 'confirmed' | 'processing';
	children: string;
	tooltipText?: string;
};

export enum StatusProfile {
	NEW = 'new',
	CONFIRMED = 'confirmed',
	PROCESSING = 'processing',
}
