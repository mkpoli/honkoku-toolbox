import { GROUPED_VARIANTS } from "../src/lib/kanji";

const STANDARD_VARIANTS_URL =
	"https://www.unicode.org/Public/UNIDATA/StandardizedVariants.txt";

const STANDARD_VARIANTS: [string, string][] = await fetch(STANDARD_VARIANTS_URL)
	.then((r) => r.text())
	.then((text) => {
		const lines = text
			.split("\n")
			.filter((line) => line.startsWith("#") === false);
		const variants = lines
			.filter((line) => line.includes("CJK"))
			.map((line) => {
				const [character, description] = line.split("; ");
				const characterCodePoints = character.split(" ");
				const variantSelector = characterCodePoints
					.map((codePoint) =>
						String.fromCodePoint(Number.parseInt(codePoint, 16)),
					)
					.join("");
				const compatibilityCodePoint = description.split("-")[1];
				const compatibility = String.fromCodePoint(
					Number.parseInt(compatibilityCodePoint, 16),
				);
				return [compatibility, variantSelector] as [string, string];
			});
		return variants;
	});

const STANDARD_VARIANTS_MAP = new Map(STANDARD_VARIANTS);

// console.log(STANDARD_VARIANTS);

// const variants = Object.entries(GROUPED_VARIANTS).map(([k, v]) => {
// 	return {
// 		kanji: k,
// 		variants: v,
// 	};
// // });

for (const [key, group] of Object.entries(GROUPED_VARIANTS)) {
	for (const char of group) {
		const [display, variants] = char;
		const [compatibility, variantSelector] = variants;
		if (variantSelector) {
			continue;
		}
		if (!compatibility) {
			continue;
		}
		if (STANDARD_VARIANTS_MAP.has(compatibility)) {
			const standardVariant = STANDARD_VARIANTS_MAP.get(compatibility);

			variants[1] = standardVariant ?? null;

			// 			export const GROUPED_VARIANTS: Record<
			// 	string,
			// 	[string, [compatibility: string | null, variantSelector: string | null]][]
			// > = {
			GROUPED_VARIANTS[key].push;
		}
	}

	// console.log(key);
	// console.log(group);
}

console.log(GROUPED_VARIANTS);
