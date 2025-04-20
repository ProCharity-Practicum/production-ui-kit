import { IStepsProps, CategorySteps } from './types.ts';
import { Step } from './Step';
import StepMobile from './StepMobile/index.tsx';
import style from './Steps.module.scss';

// Конфигурация компонента
const STEP_NAVIGATION = {
	MAX_DIFF: 1, // Разрешать только соседние шаги
} as const;

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
		if (Math.abs(count - step) === STEP_NAVIGATION.MAX_DIFF) {
			changeStep?.(count);
		}
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
		<div className={style.steps} data-testid="Steps">
			<div className={style.wrapper}>
				{data.map(({ counter, text, link }) => {
					const disabled = getStepDisabled(step, counter, category);
					return (
						<button
							key={counter}
							className={style.button}
							onClick={() => onChangeStep(counter)}
							aria-disabled={
								category === CategorySteps.WITH_DISABLED_STEPS || disabled
							}
						>
							{/* Мобильная версия управляется через CSS */}
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
			{/* Мобильный заголовок управляется через CSS */}
			<div className={style.mobileTitleContainer}>{mobileTitle}</div>
		</div>
	);
}
