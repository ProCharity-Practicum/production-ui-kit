import { IStepsProps, CategorySteps } from './types.ts';
import { Step } from './Step';
import StepMobile from './StepMobile/index.tsx';
import style from './Steps.module.scss';

export function Steps({
	data,
	title,
	step,
	changeStep,
	category,
}: IStepsProps) {
	// обработчик изменения шага
	const onChangeStep = (count: number) => {
		if (category === CategorySteps.WITH_DISABLED_STEPS) return; // Блокируем изменение в этом режиме
		if (count - 1 === step || count + 1 === step) changeStep?.(count);
	};

	const mobileTitle: JSX.Element = (
		<div className={style.titleContainer}>
			<div className={style.wrapperTitle}>
				<p className={style.title}>{title}</p>
			</div>
			{category === CategorySteps.WITH_DISABLED_STEPS && (
				<div className={style.wrapperTitle}>
					<p className={style.title}>{`Шаг ${step} из ${data.length}`}</p>
				</div>
			)}
		</div>
	);

	const getStepDisabled = (
		step: number,
		counter: number,
		category: CategorySteps
	) => {
		return step < counter && category === CategorySteps.WITH_DISABLED_STEPS;
	};

	const getStepCompleted = (
		step: number,
		counter: number,
		category: CategorySteps
	) => {
		return step > counter && category !== CategorySteps.WITHOUT_DISABLED_STEPS;
	};

	const getInProgress = (
		step: number,
		counter: number,
		category: CategorySteps
	) => {
		return step === counter && category !== CategorySteps.WITH_DISABLED_STEPS;
	};

	return (
		<div className={style.steps}>
			<div className={style.wrapper}>
				{data.map(({ counter, text, link }) => {
					const disabled = getStepDisabled(step, counter, category);
					return (
						<button
							key={counter}
							className={style.button}
							onClick={() => onChangeStep(counter)}
							//	disabled={category === CategorySteps.WITH_DISABLED_STEPS || disabled} // Полное отключение в этом режиме
							aria-disabled={
								category === CategorySteps.WITH_DISABLED_STEPS || disabled
							}
						>
							{/* Мобильная версия теперь управляется через CSS */}
							<div className={style.desktopStep}>
								<Step
									text={text}
									number={counter}
									link={link}
									isCurrent={step === counter}
									isDisabled={disabled}
									isComplited={getStepCompleted(step, counter, category)}
									isInteractive={category !== CategorySteps.WITH_DISABLED_STEPS}
								/>
							</div>
							<div className={style.mobileStep}>
								<StepMobile
									inProgress={getInProgress(step, counter, category)}
									isCurrent={step === counter}
									isDisabled={disabled}
									isCompleted={getStepCompleted(step, counter, category)}
								/>
							</div>
						</button>
					);
				})}
			</div>
			{/* Мобильный заголовок теперь управляется через CSS */}
			<div className={style.mobileTitleContainer}>{mobileTitle}</div>
		</div>
	);
}
