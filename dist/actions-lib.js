import { ESLint as e } from "eslint";
//#region src/methods/check-eslint.ts
function t(t) {
	return new e({
		overrideConfigFile: !0,
		overrideConfig: t,
		fix: !0
	});
}
var n = async (e) => await t({ rules: { "no-console": "error" } }).lintFiles(e), r = (e) => {
	console.log("\x1B[1;31m%s\x1B[0m", "Fix the following errors:"), e.forEach((e, t) => {
		console.log(`${t + 1}. ${e}`);
	}), console.log("\x1B[0m");
};
//#endregion
export { n as checkEslint, r as printErrors };
