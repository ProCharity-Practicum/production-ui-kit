import { IStepMobileProps } from './types';
import style from './style.module.scss';
import { Anchor } from '@/components/Core/Anchor/Anchor';

export function StepMobile({
  inProgress = false,
  isCurrent,
  isDisabled,
  isCompleted,
}: IStepMobileProps) {
  const step = (
    <div
      className={`
        ${style.stepMobile} 
        ${isCurrent ? style.stepMobile__current : ''} 
        ${isDisabled ? style.stepMobile__disabled : ''} 
        ${isCompleted ? style.stepMobile__completed : ''} 
        ${inProgress ? style.stepMobile__inProgress : ''}
      `}
    />
  );

	return (
		<Anchor href="#" aria-disabled={isDisabled}>
			{inProgress ? <div className={style.stepBackground}>{step}</div> : step}
		</Anchor>
	);
};

export default StepMobile;
