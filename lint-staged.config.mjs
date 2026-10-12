// @ts-check

/** @type {import("lint-staged").Configuration} */
export default {
	"./**/*.{ts,cts,mts,js,cjs,mjs,json,jsonc}": [
		"pnpm exec biome lint",
		"pnpm exec biome format --write",
	],
	"./**/*.{md,yml,yaml}": "pnpm exec prettier --write",
};
