import { segment } from "$lib/string";

export abstract class Editor {
	abstract get text(): string;

	get segments() {
		return segment(this.text);
	}

	#selectedText: string = $state("");
	/**
	 * The text that is currently selected in the editor.
	 *
	 * This value is a reactive `$state()` and read-only.
	 *
	 * If there is no selection, this will be an empty string (`""`).
	 *
	 * For CodeMirror, if there are multiple selections, it will be
	 * separated by `editor.codeMirror.doc.lineSeparator()`
	 * (by default `editor.codeMirror.doc.lineSep || "\n"`).
	 */
	get selectedText(): string {
		return this.#selectedText;
	}
	/**
	 * @internal must be set by the editor implementation during selection change
	 */
	protected set selectedText(selectedText: string) {
		this.#selectedText = selectedText;
	}

	abstract insertAtCursor(textToInsert: string): void;
	abstract replaceSelection(replacer: (text: string) => string): void;
	abstract markText(text: string): void;
	abstract onchange(callback: () => void): void;
	abstract toggleClass(className: string, enabled?: boolean): void;
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
	selectedText: string;
}

export class KojiEditor extends Editor {
	private wrapper: HTMLDivElement & {
		__vue__: {
			editor: TsrcEditorRaw;
		};
	};

	private editor: TsrcEditorRaw;

	constructor(wrapper: HTMLDivElement) {
		super();
		this.wrapper = wrapper as HTMLDivElement & {
			__vue__: { editor: TsrcEditorRaw };
		};
		if (!this.wrapper.__vue__) {
			throw new Error("KojiEditor: wrapper is not a Vue component");
		}
		this.editor = this.wrapper.__vue__.editor;

		this.editor.watch("selection", () => {
			this.selectedText = this.editor.selectedText;
		});
	}

	override insertAtCursor(textToInsert: string) {
		this.editor.insertOrReplace(textToInsert);
	}

	override replaceSelection(replacer: (text: string) => string) {
		this.editor.insertOrReplace(replacer(this.selectedText ?? ""));
	}

	override markText(text: string) {
		const allChars = this.wrapper.querySelectorAll(".token .char");
		for (const char of allChars) {
			if (char.textContent === text) {
				char.classList.add("highlight-variant");
			}
		}
	}

	override get text() {
		return this.editor.value;
	}

	override onchange(callback: () => void) {
		// this.textarea.addEventListener("input", callback);
		this.editor.watch("requestedSrc", callback);
	}

	override toggleClass(className: string, enabled?: boolean) {
		if (enabled === undefined) {
			this.wrapper.classList.toggle(className);
		} else if (enabled) {
			this.wrapper.classList.add(className);
		} else {
			this.wrapper.classList.remove(className);
		}
	}
}

export class CodeMirrorEditor extends Editor {
	constructor(private codeMirror: CodeMirror.Editor) {
		super();
		this.codeMirror = codeMirror;

		this.codeMirror.on("cursorActivity", () => {
			this.selectedText = this.codeMirror.getSelection();
		});
	}

	override insertAtCursor(textToInsert: string) {
		if (this.codeMirror.somethingSelected()) {
			this.replaceSelection((_) => textToInsert);
		} else {
			const cursor = this.codeMirror.getCursor();
			this.codeMirror.replaceRange(textToInsert, cursor);
		}
	}

	override replaceSelection(replacer: (text: string) => string) {
		const replacedText = replacer(this.selectedText ?? "");
		this.codeMirror.replaceSelection(replacedText);
	}

	override markText(substr: string) {
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

	override get text() {
		return this.codeMirror.getValue();
	}

	override onchange(callback: () => void) {
		this.codeMirror.on("change", callback);
	}

	override toggleClass(className: string, enabled?: boolean) {
		if (enabled === undefined) {
			this.codeMirror.getWrapperElement().classList.toggle(className);
		} else if (enabled) {
			this.codeMirror.getWrapperElement().classList.add(className);
		} else {
			this.codeMirror.getWrapperElement().classList.remove(className);
		}
	}
}
