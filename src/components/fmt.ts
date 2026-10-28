// Tiny inline formatter for component props: escapes HTML, then supports
// `code` and **bold** so quiz/card text can carry a little markup.
export function inline(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
