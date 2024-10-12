export function insertAtCursor(textarea: HTMLTextAreaElement, textToInsert: string) {
  // Get the current selection start and end
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;

  // Insert the text at the current selection point
  textarea.value = textarea.value.substring(0, startPos) + textToInsert + textarea.value.substring(endPos);

  console.log('before', textarea.value);

  // Update the cursor position to be at the end of the inserted text
  textarea.selectionStart = textarea.selectionEnd = startPos + textToInsert.length;

  console.log('after', textarea.value);

  textarea.dispatchEvent(new Event('input'));
}

export function repalceSelection(textarea: HTMLTextAreaElement, replacer: (text: string) => string) {
  // Get the current selection start and end
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;

  console.log('before', textarea.value);

  // Insert the text at the current selection point
  textarea.value =
    textarea.value.substring(0, startPos) +
    replacer(textarea.value.substring(startPos, endPos)) +
    textarea.value.substring(endPos);

  console.log('after', textarea.value);

  // Update the cursor position to be at the end of the inserted text
  textarea.selectionStart = textarea.selectionEnd =
    startPos + replacer(textarea.value.substring(startPos, endPos)).length;

  textarea.dispatchEvent(new Event('input'));
}
