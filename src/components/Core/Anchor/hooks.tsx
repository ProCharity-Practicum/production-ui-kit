import { AnchorHTMLAttributes, useContext } from 'react';
import {
	LinkTag,
	LinkValue,
} from '@/components/Core/Anchor/AnchorProvider.tsx';
import { AnchorContext } from '@/components/Core/Anchor/AnchorContext.tsx';
import { convertURL } from '@/utils.ts';

export function useAnchor(href?: LinkValue): LinkTag {
	const { LinkElement, ignoreFn } = useContext(AnchorContext);
	if (href && LinkElement && typeof href === 'string') {
		if (!ignoreFn || ignoreFn(href)) return LinkElement;
	}
	return 'a';
}

export function useLinkProps(
	href?: LinkValue
): AnchorHTMLAttributes<HTMLAnchorElement> {
	const props: AnchorHTMLAttributes<HTMLAnchorElement> = {};

	if (typeof href === 'string') {
		const url = convertURL(href);
		props.href = href;
		if (url.origin !== location.origin) {
			props.rel = 'noopener noreferrer';
			props.target = '_blank';
		}
	}

	if (typeof href === 'function') {
		props.onClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			href(e);
		};
	}

	return props;
}
