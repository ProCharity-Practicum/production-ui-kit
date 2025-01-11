import clsx from 'clsx';
import styles from './ConfirmSiteRules.module.scss';

export type ConfirmSiteRulesProps = {
	className?: string;
};

export function ConfirmSiteRules({ className }: ConfirmSiteRulesProps) {
	return (
		<div
			className={clsx(styles.container, className)}
			data-testid="ConfirmSiteRules"
		>
			ConfirmSiteRules
		</div>
	);
}
