// // https://github.com/uiwjs/react-codemirror/blob/master/themes/theme/src/index.tsx

// import { EditorView } from '@codemirror/view';
// import { tags } from "@lezer/highlight";
// import { HighlightStyle } from "@codemirror/language"

// export interface Settings {
// 	/** Editor background. */
// 	background?: string;
// 	/** Default text color. */
// 	foreground?: string;
// 	/** Caret color. */
// 	caret?: string;
// 	/** Selection background. */
// 	selection?: string;
// 	/** Selection match background. */
// 	selectionMatch?: string;
// 	/** Background of highlighted lines. */
// 	lineHighlight?: string;
// 	/** Gutter background. */
// 	gutterBackground?: string;
// 	/** Text color inside gutter. */
// 	gutterForeground?: string;
// 	/** Text active color inside gutter. */
// 	gutterActiveForeground?: string;
// 	/** Gutter right border color. */
// 	gutterBorder?: string;
// 	/** set editor font */
// 	fontFamily?: string;
// }

// const defaultSettings = {
// 	background: "transparent",
// 	foreground: "#4D4D4C",
// 	caret: "#facc15",
// 	selection: "#1e293b80",
// 	selectionMatch: "transparent",
// 	gutterBackground: "transparent",
// 	gutterForeground: "#4D4D4C",
// 	gutterBorder: "transparent",
// 	lineHighlight: "transparent",
//   };

// export const lightStyle = HighlightStyle.define([
// 	{ tag: tags.keyword, color: "#1a6eff" },
// 	{ tag: tags.comment, color: "#475569" },
// 	{ tag: tags.bracket, color: "#FB923C" },
// 	{ tag: tags.angleBracket, color: "#334155" },
// 	{ tag: tags.variableName, color: "#334155" },
// 	{ tag: tags.string, color: "#379d6c" },
// 	{ tag: tags.number, color: "#ff4656" },
// 	{ tag: tags.punctuation, color: "#1a6eff" },
// 	{ tag: tags.squareBracket, color: "#ff9f46" },
// 	{ tag: tags.tagName, color: "#ff4656" },
// 	{ tag: tags.attributeName, color: "#a327e2" },
// 	{ tag: tags.propertyName, color: "#a327e2" },
// 	{ tag: tags.typeName, color: "#5cabff" },
// 	{ tag: tags.bool, color: "#ff4656" },
// ]);

// export const lightTheme = EditorView.theme({
// 	'&': {
// 		backgroundColor: 'transparent',
// 		color: '#1e293b'
// 	},
// 	'.cm-gutters': {},
// 	'&.cm-editor .cm-scroller': {
// 		fontFamily: settings.fontFamily
// 	}
// });

// export const lightTheme = EditorView.theme({
// settings: {
// 	...defaultSettings,
// 	foreground: "#1e293b",
// 	gutterForeground: "#1e293b",
// 	selection: "rgba(0,0,0,0.1)",
// },
// styles: [
// 	{ tag: tags.keyword, color: "#1a6eff" },
// 	{ tag: tags.comment, color: "#475569" },
// 	{ tag: tags.bracket, color: "#FB923C" },
// 	{ tag: tags.angleBracket, color: "#334155" },
// 	{ tag: tags.variableName, color: "#334155" },
// 	{ tag: tags.string, color: "#379d6c" },
// 	{ tag: tags.number, color: "#ff4656" },
// 	{ tag: tags.punctuation, color: "#1a6eff" },
// 	{ tag: tags.squareBracket, color: "#ff9f46" },
// 	{ tag: tags.tagName, color: "#ff4656" },
// 	{ tag: tags.attributeName, color: "#a327e2" },
// 	{ tag: tags.propertyName, color: "#a327e2" },
// 	{ tag: tags.typeName, color: "#5cabff" },
// 	{ tag: tags.bool, color: "#ff4656" },
// ],
// });

// export const darkTheme = createTheme({
// 	theme: "dark",
// 	settings: {
// 		...defaultSettings,
// 		foreground: "#fff",
// 		gutterForeground: "#fff",
// 		selection: "rgba(255,255,255,0.1)",
// 	},
// 	styles: [
// 		{ tag: tags.keyword, color: "#4ff0ff" },
// 		{ tag: tags.comment, color: "#94a3b8" },
// 		{ tag: tags.bracket, color: "#ffc248" },
// 		{ tag: tags.attributeName, color: "#d47dff" },
// 		{ tag: tags.angleBracket, color: "#ffffff" },
// 		{ tag: tags.variableName, color: "#ffffff" },
// 		{ tag: tags.string, color: "#c0ff5b" },
// 		{ tag: tags.number, color: "#ff808a" },
// 		{ tag: tags.bool, color: "#ff808a" },
// 		{ tag: tags.punctuation, color: "#4ff0ff" },
// 		{ tag: tags.tagName, color: "#ff808a" },
// 		{ tag: tags.squareBracket, color: "#ff808a" },
// 		{ tag: tags.propertyName, color: "#d47dff" },
// 		{ tag: tags.typeName, color: "#5cabff" },
// 	],
// });

// const themeExtension = EditorView.theme(themeOptions, {
// 	dark: true,
// });
