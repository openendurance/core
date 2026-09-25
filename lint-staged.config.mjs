// @ts-check

/** @type {import("lint-staged").Configuration} */
export default {
	"./**/*.{ts,cts,mts,js,cjs,mjs,json,sh,yaml,yml}": "pnpm exec biome lint",
	"./**/*": "pnpm exec biome format --write",
};
