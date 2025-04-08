import clsx from 'clsx';
import style from './style.module.scss';
import { StepProps } from './types';
import { Anchor } from '@/components/Core/Anchor/Anchor';

export function Step({
	text,
	number,
	link,
	isCurrent = false,
	isDisabled = false,
	isComplited = false,
	isInteractive = true,
}: StepProps) {
	const anchorProps = isInteractive
		? {
				href: link,
				className: clsx(style.link, {
					[style.link_disabled]: isDisabled || isCurrent,
				}),
				'aria-disabled': isDisabled,
			}
		: {
				href: () => undefined, // Блокировка через функцию
				className: clsx(style.link, style.link_disabled),
				'aria-disabled': true,
				onClick: (e: React.MouseEvent) => e.preventDefault(),
			};

	const stepClass = clsx(
		style.step,
		isComplited && style.step_complited,
		isCurrent && style.step_active,
		isDisabled && style.step_disabled
	);

	const numberClass = clsx(
		style.number,
		isComplited && style.step_complited,
		isDisabled && style.number_disabled
	);

	const textClass = clsx(
		style.text,
		isCurrent && style.text_active,
		isDisabled && style.text_disabled
	);

	return (
		<Anchor {...anchorProps}>
			<div className={stepClass}>
				<span className={numberClass}>{number}</span>
			</div>
			<span className={textClass}>{text}</span>
		</Anchor>
	);
}
