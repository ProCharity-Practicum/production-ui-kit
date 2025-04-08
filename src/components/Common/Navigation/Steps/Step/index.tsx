import clsx from 'clsx';
import style from './style.module.scss';
import { StepProps } from './types';
import { Anchor } from '@/components/Core/Anchor/Anchor';

export function Step({
	text,
	number,
	link,
	isCurrent,
	isDisabled,
	isComplited,
	isInteractive = true,
}: StepProps) {
	return (
		<Anchor
			href={isInteractive ? link : undefined} // Отключаем ссылку в неинтерактивном режиме
			className={clsx(
				style.link,
				(isDisabled || isCurrent || !isInteractive) && style.link_disable
			)}
			aria-disabled={isDisabled || !isInteractive}
			onClick={(e) => {
				if (!isInteractive) e.preventDefault(); // Блокируем переход
			}}
		>
			<div
				className={clsx(
					style.step,
					isComplited && style.step_complited,
					isCurrent && style.step_active,
					isDisabled && style.step_disabled
				)}
			>
				{isComplited ? (
					<span className={clsx(style.number, style.step_complited)}>
						{number}
					</span>
				) : (
					<span
						className={clsx(style.number, isDisabled && style.number_disabled)}
					>
						{number}
					</span>
				)}
			</div>
			<span
				className={clsx(
					style.text,
					isCurrent && style.text_active,
					isDisabled && style.text_disabled
				)}
			>
				{text}
			</span>
		</Anchor>
	);
}
