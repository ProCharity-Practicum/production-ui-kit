import clsx from 'clsx';
import styles from './InputLinkOk.module.scss';
import { InputLink } from '@/components/Forms/Input/InputLink/InputLink.tsx';
import { InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputLinkOk(props: Omit<InputProps, 'type'>) {
	return (
		<div className={clsx(styles.container)} data-testid="InputLinkVk">
			<InputLink {...props} placeholder={'https://ok.ru/'} />
		</div>
	);
}
