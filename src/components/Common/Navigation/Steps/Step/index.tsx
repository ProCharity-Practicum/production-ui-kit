import clsx from 'clsx';
import style from './style.module.scss';
import { StepProps } from './types';
import { Anchor } from '@/components/Core/Anchor/Anchor';
import notificationIcon from '../notification.svg';

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
				className: clsx(style.link, style.link_disabled),
				'aria-disabled': true,
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
				{isComplited && !isCurrent && !isInteractive ? (
					<img
						src={notificationIcon}
						className={style.icon}
						alt="completed step"
					/>
				) : (
					<span className={numberClass}>{number}</span>
				)}
			</div>
			<span className={textClass}>{text}</span>
		</Anchor>
	);
}
