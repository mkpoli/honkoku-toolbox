export interface Editor {
  insertAtCursor: (textToInsert: string) => void;
  replaceSelection: (replacer: (text: string) => string) => void;
}

export class TextAreaEditor implements Editor {
  constructor(private textarea: HTMLTextAreaElement) {
    this.textarea = textarea;
  }

  insertAtCursor(textToInsert: string) {
    const startPos = this.textarea.selectionStart;
    const endPos = this.textarea.selectionEnd;

    this.textarea.value = this.textarea.value.substring(0, startPos) + textToInsert + this.textarea.value.substring(endPos);

    this.textarea.selectionStart = this.textarea.selectionEnd = startPos + textToInsert.length;

    this.textarea.dispatchEvent(new Event('input'));
  }

  replaceSelection(replacer: (text: string) => string) {
    const startPos = this.textarea.selectionStart;
    const endPos = this.textarea.selectionEnd;

    this.textarea.value = this.textarea.value.substring(0, startPos) + replacer(this.textarea.value.substring(startPos, endPos)) + this.textarea.value.substring(endPos);

    this.textarea.selectionStart = this.textarea.selectionEnd = startPos + replacer(this.textarea.value.substring(startPos, endPos)).length;

    this.textarea.dispatchEvent(new Event('input'));
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
}
