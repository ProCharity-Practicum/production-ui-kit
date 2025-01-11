import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tag.module.scss';
import { Icon } from '@/components/Core/Icon';
import { TagColor } from '@/components/Common/Tag/types.ts';

type TagProps = {
	value: string | number;
	variant?: TagColor;
};

function withTag(defaultVariant: TagColor, icon?: ReactNode) {
	return function TagComponent({ value, variant }: TagProps) {
		return (
			<span
				className={clsx(styles.tag, styles[variant ?? defaultVariant])}
				data-testid="Tag"
			>
				{value}
				{icon}
			</span>
		);
	};
}

export const Tag = withTag(TagColor.Secondary);
export const PrimaryTag = withTag(TagColor.Primary);
export const OutlineTag = withTag(TagColor.Outline);
export const ViewsTag = withTag(TagColor.Blue, <Icon name="show" size={16} />);
export const DiamondTag = withTag(
	TagColor.Primary,
	<Icon name="bonuses" size={16} />
);
