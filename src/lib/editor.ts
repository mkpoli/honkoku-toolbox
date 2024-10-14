import { segment } from "$lib/string";

export interface Editor {
	insertAtCursor: (textToInsert: string) => void;
	replaceSelection: (replacer: (text: string) => string) => void;
	markText: (text: string) => void;
	text: string;
	segments: string[];
	onchange: (callback: () => void) => void;
	toggleClass: (className: string, enabled?: boolean) => void;
	selectedText: string;
}

interface TsrcEditorRaw {
	value: string;
	selection: {
		start: number;
		end: number;
	};
	markup: (pre: string, post: string) => void;
	insertOrReplace: (replacer: string) => void;
	watch: <T>(state: string, handler: (state: T) => void) => void;
}

export class KojiEditor implements Editor {
	private wrapper: HTMLDivElement & {
		__vue__: {
			editor: TsrcEditorRaw;
		};
	};

	private editor: TsrcEditorRaw;

	constructor(wrapper: HTMLDivElement) {
		this.wrapper = wrapper as HTMLDivElement & {
			__vue__: { editor: TsrcEditorRaw };
		};
		if (!this.wrapper.__vue__) {
			throw new Error("KojiEditor: wrapper is not a Vue component");
		}
		this.editor = this.wrapper.__vue__.editor;
	}

	insertAtCursor(textToInsert: string) {
		this.editor.insertOrReplace(textToInsert);
	}

	replaceSelection(replacer: (text: string) => string) {
		this.editor.insertOrReplace(replacer(this.selectedText));
	}

	markText(text: string) {
		const allChars = this.wrapper.querySelectorAll(".token .char");
		for (const char of allChars) {
			if (char.textContent === text) {
				char.classList.add("highlight-variant");
			}
		}
	}

	get text() {
		return this.editor.value;
	}

	get segments() {
		return segment(this.text);
	}

	onchange(callback: () => void) {
		// this.textarea.addEventListener("input", callback);
		this.editor.watch("requestedSrc", callback);
	}

	toggleClass(className: string, enabled?: boolean) {
		if (enabled === undefined) {
			this.wrapper.classList.toggle(className);
		} else if (enabled) {
			this.wrapper.classList.add(className);
		} else {
			this.wrapper.classList.remove(className);
		}
	}

	get selectedText() {
		const { start, end } = this.editor.selection;
		return this.text.substring(start, end);
	}
}

export class CodeMirrorEditor implements Editor {
	constructor(private codeMirror: CodeMirror.Editor) {
		this.codeMirror = codeMirror;
	}

	insertAtCursor(textToInsert: string) {
		if (this.codeMirror.somethingSelected()) {
			this.replaceSelection((_) => textToInsert);
		} else {
			const cursor = this.codeMirror.getCursor();
			this.codeMirror.replaceRange(textToInsert, cursor);
		}
	}

	replaceSelection(replacer: (text: string) => string) {
		const replacedText = replacer(this.selectedText);
		this.codeMirror.replaceSelection(replacedText);
	}

	markText(substr: string) {
		if (!substr || !this.text.includes(substr)) return;

		const textClusters = segment(this.text);
		const substrClusters = segment(substr);

		const clusterCodeUnitIndices = [0];
		for (let i = 0; i < textClusters.length; i++) {
			clusterCodeUnitIndices.push(
				clusterCodeUnitIndices[i] + textClusters[i].length,
			);
		}

		const occurrences = [];

		for (let i = 0; i <= textClusters.length - substrClusters.length; i++) {
			let match = true;
			for (let j = 0; j < substrClusters.length; j++) {
				if (textClusters[i + j] !== substrClusters[j]) {
					match = false;
					break;
				}
			}
			if (match) {
				const startIndex = clusterCodeUnitIndices[i];
				const endIndex = clusterCodeUnitIndices[i + substrClusters.length];
				occurrences.push({ startIndex, endIndex });
			}
		}

		for (const occurrence of occurrences) {
			const textPosStart = this.codeMirror.posFromIndex(occurrence.startIndex);
			const textPosEnd = this.codeMirror.posFromIndex(occurrence.endIndex);
			this.codeMirror.markText(textPosStart, textPosEnd, {
				className: "highlight-variant",
			});
		}
	}

	get text() {
		return this.codeMirror.getValue();
	}

	get segments() {
		return segment(this.text);
	}

	onchange(callback: () => void) {
		this.codeMirror.on("change", callback);
	}

	toggleClass(className: string, enabled?: boolean) {
		if (enabled === undefined) {
			this.codeMirror.getWrapperElement().classList.toggle(className);
		} else if (enabled) {
			this.codeMirror.getWrapperElement().classList.add(className);
		} else {
			this.codeMirror.getWrapperElement().classList.remove(className);
		}
	}

	get selectedText() {
		return this.codeMirror.getSelection();
	}
}
