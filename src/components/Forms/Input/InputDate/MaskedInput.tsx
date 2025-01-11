import React, {
	forwardRef,
	useEffect,
	MutableRefObject,
	ChangeEvent,
} from 'react';
import { useIMask } from 'react-imask';
import { Input, InputProps } from '@/components/Forms/Input/Input.tsx';
import { useCombinedRefs } from '@/components/Forms/Input/InputDate/use-combined-refs.tsx';

interface MaskedInputProps<T = Element> extends InputProps {
	maskoptions?: object;
	/**
	 * Ссылка на дом-ноду нативного контрола.
	 */
	controlRef?: React.MutableRefObject<T> | React.LegacyRef<T> | undefined;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	function MaskedInput(
		{ value, onChange, controlRef, maskoptions, ...props },
		ref
	) {
		const {
			ref: maskRef,
			setValue,
			setTypedValue,
		} = useIMask(maskoptions ?? {}, {
			onAccept: (value) => {
				if (typeof onChange === 'function') {
					onChange({
						target: { value: value, name: props.name },
					} as ChangeEvent<HTMLInputElement>);
				}
			},
			// @ts-expect-error @todo fix typings
			defaultTypedValue: value,
		});

		const combinedRef = useCombinedRefs(
			ref,
			controlRef,
			maskRef as MutableRefObject<HTMLInputElement>
		) as React.LegacyRef<HTMLInputElement>;

		useEffect(() => {
			// @ts-expect-error @todo fix typings
			setTypedValue(value);
		}, [value, setValue, setTypedValue]);

		return <Input {...props} ref={combinedRef} />;
	}
);
