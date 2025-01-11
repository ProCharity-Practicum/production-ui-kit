import { AnchorHTMLAttributes } from 'react';
import { Icon } from '@/components/Core/Icon';

import styles from './GuestUser.module.scss';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export type LinkOrCallback = string | (() => void);

export type GuestUserProps = {
	signUpLink?: LinkOrCallback;
	signInLink?: LinkOrCallback;
};

export function GuestUser({ signUpLink, signInLink }: GuestUserProps) {
	if (!signUpLink && !signInLink) return null;

	const signUpProps: AnchorHTMLAttributes<HTMLAnchorElement> = {};
	const signInProps: AnchorHTMLAttributes<HTMLAnchorElement> = {};

	if (typeof signUpLink === 'string') {
		signUpProps['href'] = signUpLink;
	} else {
		signUpProps['href'] = '#';
		signUpProps['onClick'] = signUpLink;
	}

	if (typeof signInLink === 'string') {
		signInProps['href'] = signInLink;
	} else {
		signInProps['href'] = '#';
		signInProps['onClick'] = signInLink;
	}

	return (
		<div className={styles.guestUser}>
			<Anchor {...signUpProps} className={styles.signUp}>
				<Icon name="add" />
				<span>Присоединиться</span>
			</Anchor>
			<Anchor {...signInProps} className={styles.signIn}>
				<Icon name="user" />
			</Anchor>
		</div>
	);
}
