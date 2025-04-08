import { IStepMobileProps } from './types';
import style from './style.module.scss';
import { Anchor } from '@/components/Core/Anchor/Anchor';
import clsx from 'clsx';

export function StepMobile({
	inProgress = false,
	isCurrent,
	isDisabled,
	isCompleted,
}: IStepMobileProps) {
	const stepClass = clsx(style.stepMobile, {
		[style.stepMobile__current]: isCurrent,
		[style.stepMobile__disabled]: isDisabled,
		[style.stepMobile__completed]: isCompleted,
		[style.stepMobile__inProgress]: inProgress,
	});

	const step = <div className={stepClass} />;

	return (
		<Anchor href="#" aria-disabled={isDisabled}>
			{inProgress ? <div className={style.stepBackground}>{step}</div> : step}
		</Anchor>
	);
}

export default StepMobile;
