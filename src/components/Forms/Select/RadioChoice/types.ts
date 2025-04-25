export type OptionType = {
	value: string;
	title: string;
};

export type RadioChoiceProps = {
	name?: string;
	value?: OptionType['value'];
	title?: OptionType['title'];
	selected?: OptionType['value'];
	groupName?: string;
	onChange?: (value: string) => void;
	state?: string;
	array?: { title: string; value: string }[];
	setCurrentValue?: (value: string) => void;
	isButtonLike?: boolean;
	testId?: string;
};
