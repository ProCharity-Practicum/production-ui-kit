import React, {
	ComponentPropsWithoutRef,
	useState,
	FocusEvent,
	MouseEvent,
	Ref,
	useCallback,
	useMemo,
} from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

interface RadioBaseProps {
	children?: React.ReactNode;
	labelledBy?: string;
	controlRef?: Ref<HTMLInputElement>;
	focused?: boolean;
	name?: string;
	value?: string | number;
}

export type RadioProps = RadioBaseProps &
	Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'children'>;

export function Radio({
	children,
	labelledBy,
	controlRef,
	disabled = false,
	focused: propsFocused,
	onBlur: propsOnBlur,
	onFocus: propsOnFocus,
	onMouseDown: propsOnMouseDown,
	onMouseUp: propsOnMouseUp,
	className,
	id,
	name,
	value,
	...props
}: RadioProps) {
	const [internalFocused, setInternalFocused] = useState(false);

	const hasFocus = propsFocused !== undefined ? propsFocused : internalFocused;
	const isDisabled = disabled;

	const handleFocusChange = useCallback(
		(event: FocusEvent<HTMLInputElement>, focused: boolean) => {
			if (!isDisabled) {
				setInternalFocused(focused);
				if (focused) {
					propsOnFocus?.(event);
				} else {
					propsOnBlur?.(event);
				}
			}
		},
		[isDisabled, propsOnBlur, propsOnFocus]
	);

	const handleMouseDown = useCallback(
		(event: MouseEvent<HTMLInputElement>) => {
			if (!isDisabled && event.button === 0) {
				setInternalFocused(true);
				propsOnMouseDown?.(event);
			}
		},
		[isDisabled, propsOnMouseDown]
	);

	const commonProps = useMemo(
		() => ({
			...props,
			type: 'radio',
			className: styles['radio__native-input'],
			'aria-labelledby': labelledBy,
			disabled: isDisabled,
			id,
			name,
			value,
		}),
		[props, labelledBy, isDisabled, id, name, value]
	);

	return (
		<label
			htmlFor={id}
			className={clsx(styles.radio, className, {
				[styles['radio--focused']]: hasFocus && !isDisabled,
				[styles['radio--disabled']]: isDisabled,
			})}
			data-testid="Radio"
		>
			<input
				{...commonProps}
				ref={controlRef}
				onBlur={(e) => handleFocusChange(e, false)}
				onFocus={(e) => handleFocusChange(e, true)}
				onMouseDown={handleMouseDown}
				onMouseUp={!isDisabled ? propsOnMouseUp : undefined}
			/>
			<span className={styles['radio__pseudo-input']}>{children}</span>
		</label>
	);
}
