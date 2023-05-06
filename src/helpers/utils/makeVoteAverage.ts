export function makeVoteAverage(vote_count: number, vote_average: number) {
  const min_vote = 100;
  const max_average = 10;

  return (
    (vote_count! / (vote_count! + min_vote)) * (vote_average! / max_average) * 5
  );
}
