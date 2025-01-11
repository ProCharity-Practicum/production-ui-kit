import clsx from 'clsx';
import styles from './Section.module.scss';
import { HeaderTag, Title } from '@/components/Core/Typography';

export type SectionProps = {
	className?: string;
	containerClassName?: string;
	variant?: 'page' | 'content';
	title?: string;
	children?: React.ReactNode;
	image?: React.ReactNode;
	renderAction?: () => React.ReactNode;
	HeaderTag?: HeaderTag;
};

export function Section({
	className,
	containerClassName,
	variant = 'content',
	title,
	children,
	image,
	renderAction,
	HeaderTag,
}: SectionProps) {
	return (
		<section
			className={clsx(styles.section, styles[variant], className)}
			data-testid="Section"
		>
			<div className={clsx(styles.container, containerClassName)}>
				{image && <div className={styles.image}>{image}</div>}
				<div className={styles.content}>
					{title && (
						<Title className={styles.title} Tag={HeaderTag}>
							{title}
						</Title>
					)}
					{children}
					{renderAction && (
						<div className={styles.actionWrapper}>{renderAction()}</div>
					)}
				</div>
			</div>
		</section>
	);
}
