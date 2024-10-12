export interface Editor {
	insertAtCursor: (textToInsert: string) => void;
	replaceSelection: (replacer: (text: string) => string) => void;
	markText: (text: string) => void;
	text: string;
	onchange: (callback: () => void) => void;
	toggleClass: (className: string) => void;
}

export class TextAreaEditor implements Editor {
	constructor(private textarea: HTMLTextAreaElement) {
		this.textarea = textarea;
	}

	insertAtCursor(textToInsert: string) {
		const startPos = this.textarea.selectionStart;
		const endPos = this.textarea.selectionEnd;

		this.textarea.value =
			this.textarea.value.substring(0, startPos) +
			textToInsert +
			this.textarea.value.substring(endPos);

		this.textarea.selectionStart = this.textarea.selectionEnd =
			startPos + textToInsert.length;

		this.textarea.dispatchEvent(new Event("input"));
	}

	replaceSelection(replacer: (text: string) => string) {
		const startPos = this.textarea.selectionStart;
		const endPos = this.textarea.selectionEnd;

		this.textarea.value =
			this.textarea.value.substring(0, startPos) +
			replacer(this.textarea.value.substring(startPos, endPos)) +
			this.textarea.value.substring(endPos);

		this.textarea.selectionStart = this.textarea.selectionEnd =
			startPos +
			replacer(this.textarea.value.substring(startPos, endPos)).length;

		this.textarea.dispatchEvent(new Event("input"));
	}

	markText(text: string) {
		(window as unknown as { find: (text: string) => void }).find(text);
	}

	get text() {
		return this.textarea.value;
	}

	onchange(callback: () => void) {
		this.textarea.addEventListener("input", callback);
	}

	toggleClass(className: string) {
		this.textarea.classList.toggle(className);
	}
}

export class CodeMirrorEditor implements Editor {
	constructor(private codeMirror: CodeMirror.Editor) {
		this.codeMirror = codeMirror;
	}

	insertAtCursor(textToInsert: string) {
		const cursor = this.codeMirror.getCursor();
		this.codeMirror.replaceRange(textToInsert, cursor);
	}

	replaceSelection(replacer: (text: string) => string) {
		const selection = this.codeMirror.getSelection();
		const replacedText = replacer(selection);
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
}
