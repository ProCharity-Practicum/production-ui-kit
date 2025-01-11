import { AnchorProps } from '@/components/Core/Anchor/AnchorProvider.tsx';
import { useAnchor, useLinkProps } from '@/components/Core/Anchor/hooks.tsx';

export function Anchor({ href, children, ...props }: AnchorProps) {
	const LinkElement = useAnchor(href);
	const propsLink = useLinkProps(href);
	return (
		<LinkElement {...props} {...propsLink} data-testid="Anchor">
			{children}
		</LinkElement>
	);
}
