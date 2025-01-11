import clsx from "clsx";
import styles from './TemplateName.module.scss';

export type TemplateNameProps = {
	className?: string;
};

export function TemplateName({ className }: TemplateNameProps) {
	return <div className={clsx(styles.container, className)} data-testid="TemplateName">
		TemplateName
	</div>;
}
