import React, { FunctionComponent } from 'react';

export type ButtonTag =
	| keyof Pick<React.JSX.IntrinsicElements, 'a' | 'button'>
	| FunctionComponent;

export enum ButtonVariant {
	primary = 'primary',
	outline = 'outline',
	secondary = 'secondary',
}

export enum ButtonType {
	button = 'button',
	submit = 'submit',
	reset = 'reset',
}

export enum ButtonLinkVariant {
	button = 'button',
	link = 'link',
}

export enum IconPosition {
	left = 'left',
	right = 'right',
}

export enum ButtonLinkColor {
	blue = 'blue',
	grey = 'grey',
	primary = 'primary',
	secondary = 'secondary',
}
