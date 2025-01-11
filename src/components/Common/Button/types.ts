import React, { FunctionComponent } from 'react';

export type ButtonTag =
	| keyof Pick<React.JSX.IntrinsicElements, 'a' | 'button'>
	| FunctionComponent;

export enum ButtonVariant {
	Primary = 'primary',
	Outline = 'outline',
	Secondary = 'secondary',
}

export enum ButtonType {
	Button = 'button',
	Submit = 'submit',
}

export enum ButtonLinkVariant {
	Button = 'button',
	Link = 'link',
}

export enum IconPosition {
	Left = 'left',
	Right = 'right',
}

export enum ButtonLinkColor {
	Blue = 'blue',
	Grey = 'grey',
	Primary = 'primary',
	Secondary = 'secondary',
}
