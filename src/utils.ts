export function pluralize(
	count: number,
	words: [string, string, string],
	withCount = false
) {
	const cases = [2, 0, 1, 1, 1, 2];
	const word =
		words[
			count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
		];
	return withCount ? `${count} ${word}` : word;
}

export const age = (value: number) =>
	pluralize(value, ['год', 'года', 'лет'], true);

export const convertURL = (url: string) => {
	const a = document.createElement('a');
	a.href = url;
	return new URL(a.href);
};
