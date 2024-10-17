export const COLORS = [
	"black",
	"green",
	"blue",
	"red",
	"pink",
	"gray",
	"orange",
] as const;
export type Color = (typeof COLORS)[number];
