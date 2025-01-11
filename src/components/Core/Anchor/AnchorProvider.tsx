import React, {
	AnchorHTMLAttributes,
	FunctionComponent,
	MouseEvent,
} from 'react';
import { AnchorContext } from '@/components/Core/Anchor/AnchorContext.tsx';

export type LinkValue =
	| string
	| ((event: MouseEvent<HTMLAnchorElement>) => void);

export type AnchorProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'href'
> & {
	href?: LinkValue;
};

export type LinkTag =
	| keyof Pick<React.JSX.IntrinsicElements, 'a'>
	| FunctionComponent<AnchorProps>;

export type AnchorContextType = {
	LinkElement?: FunctionComponent<AnchorProps>;
	ignoreFn?: (href: string) => boolean;
};

export type AnchorProviderProps = AnchorContextType & {
	children: React.ReactNode;
};

export function AnchorProvider({
	children,
	LinkElement,
	ignoreFn,
}: AnchorProviderProps) {
	return (
		<AnchorContext.Provider value={{ LinkElement, ignoreFn }}>
			{children}
		</AnchorContext.Provider>
	);
}
