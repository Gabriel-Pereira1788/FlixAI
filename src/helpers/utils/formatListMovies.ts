export function formatListMovies(response: string) {
  const newData = response.split('\n');
  const text = newData.shift();

  const result = newData.map(movie => {
    const data = movie.slice(2, movie.length);
    return data.trim();
  });

  return {
    result,
    text,
  };
}
