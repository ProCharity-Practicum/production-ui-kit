import clsx from 'clsx';
import styles from './InputLinkIg.module.scss';
import { InputLink } from '@/components/Forms/Input/InputLink/InputLink.tsx';
import { InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputLinkIg(props: Omit<InputProps, 'type'>) {
	return (
		<div className={clsx(styles.container)} data-testid="InputLinkVk">
			<InputLink {...props} placeholder={'https://instagram.com/'} />
		</div>
	);
}
