export interface Editor {
	insertAtCursor: (textToInsert: string) => void;
	replaceSelection: (replacer: (text: string) => string) => void;
	markText: (text: string) => void;
	text: string;
	onchange: (callback: () => void) => void;
	toggleClass: (className: string) => void;
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

	onchange(callback: () => void) {
		// this.textarea.addEventListener("input", callback);
		this.editor.watch("requestedSrc", callback);
	}

	toggleClass(className: string) {
		this.wrapper.classList.toggle(className);
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

		const occurrences = [];
		let index = this.text.indexOf(substr);
		while (index !== -1) {
			occurrences.push(index);
			index = this.text.indexOf(substr, index + 1);
		}

		for (const index of occurrences) {
			const textPos = this.codeMirror.posFromIndex(index);

			this.codeMirror.markText(
				textPos,
				this.codeMirror.posFromIndex(index + substr.length),
				{
					className: "highlight-variant",
				},
			);
		}
	}

	get text() {
		return this.codeMirror.getValue();
	}

	onchange(callback: () => void) {
		this.codeMirror.on("change", callback);
	}

	toggleClass(className: string) {
		this.codeMirror.getWrapperElement().classList.toggle(className);
	}

	get selectedText() {
		return this.codeMirror.getSelection();
	}
}
