const segmenter = new Intl.Segmenter();

export function segment(text: string): string[] {
	return [...segmenter.segment(text)].map(({ segment }) => segment);
}
