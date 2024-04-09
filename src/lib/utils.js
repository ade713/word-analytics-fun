export const charactersLeft = (max, text) => max - text.length;
export const numberOfWordsInString = text => text.split(' ').filter(word => word !== '').length;
