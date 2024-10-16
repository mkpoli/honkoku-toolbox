export const preferences = (() => {
  let highlight = $state(localStorage.getItem('highlight-variant-kanji') === 'true');

	return {
		get highlight() {
			return highlight;
		},
		set highlight(value) {
      highlight = value;
			localStorage.setItem('highlight-variant-kanji', value.toString());
		},
	};
})();
