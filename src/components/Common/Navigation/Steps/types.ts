export interface IDataSteps {
	counter: number;
	text: string;
	link: string;
}

export enum CategorySteps {
	WITH_DISABLED_STEPS = 'WITH_DISABLED_STEPS',
	WITHOUT_DISABLED_STEPS = 'WITHOUT_DISABLED_STEPS',
}

export interface IStepsProps {
	data: IDataSteps[];
	title: string;
	changeStep?: (count: number) => void;
	step: number;
	category: CategorySteps;
}
