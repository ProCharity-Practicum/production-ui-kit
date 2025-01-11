export enum TagColor {
	Primary = 'primary',
	Secondary = 'secondary',
	Outline = 'outline',
	Blue = 'blue',
}

export const isStringTag = (tag: unknown): tag is string => {
	return typeof tag === 'string';
};
export const isObjectTag = (
	tag: unknown
): tag is { value: string; color: TagColor } => {
	return (
		typeof tag === 'object' && tag !== null && 'value' in tag && 'color' in tag
	);
};
