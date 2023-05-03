export function extractKeyWords(text: string) {
  const words = text.toLowerCase().match(/\b\S+\b/g);
  const keywords = words
    ? words.filter(word => {
        const excludedWords = [
          'me',
          'a',
          'o',
          'e',
          'com',
          'sem',
          'em',
          'para',
          'de',
          'do',
          'da',
          'dos',
          'das',
          'que',
          'qual',
          'quais',
          'onde',
          'quando',
          'como',
          'por',
          'porque',
          'porquê',
          'listar',
          'filmes',
          'listagem',
          'liste',
        ];
        return !excludedWords.includes(word);
      })
    : [];
  return keywords;
}
