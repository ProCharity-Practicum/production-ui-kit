import clsx from 'clsx';
import styles from './InputLinkFb.module.scss';
import { InputLink } from '@/components/Forms/Input/InputLink/InputLink.tsx';
import { InputProps } from '@/components/Forms/Input/Input.tsx';

export function InputLinkFb(props: Omit<InputProps, 'type'>) {
	return (
		<div className={clsx(styles.container)} data-testid="InputLinkVk">
			<InputLink {...props} placeholder={'https://fb.com/'} />
		</div>
	);
}
