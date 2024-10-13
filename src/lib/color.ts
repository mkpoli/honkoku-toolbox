export const COLORS = [
	"black",
	"green",
	"blue",
	"red",
	"pink",
	"gray",
] as const;
export type Color = (typeof COLORS)[number];
